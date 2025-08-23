import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendOtpEmail } from "../utils/sendOTPEmail.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import prisma from "../config/db.js";
import bcrypt from "bcrypt";

export const getCurrentUser = async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    // Check if already a verified user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP(6);
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Remove existing TempUser if any
    await prisma.tempUser.deleteMany({
      where: { email },
    });

    // Create new TempUser entry
    await prisma.tempUser.create({
      data: {
        name,
        email,
        password: hashedPassword,
        otp: hashedOtp,
        otpExpiry: expiry,
      },
    });

    // Send OTP
    await sendOtpEmail(email, otp);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyOTPAndCreateUser = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Fetch TempUser from Prisma
    const tempUser = await prisma.tempUser.findUnique({
      where: { email },
    });

    if (!tempUser) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Compare OTP
    const isValid = await bcrypt.compare(otp, tempUser.otp);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check expiry
    const isExpired = tempUser.otpExpiry < new Date();
    if (isExpired) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Create permanent user in Prisma
    const createdUser = await prisma.user.create({
      data: {
        name: tempUser.name,
        email: tempUser.email,
        password: tempUser.password,
      },
    });

    if (!createdUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong while registering user" });
    }

    // Delete TempUser
    await prisma.tempUser.delete({
      where: { email },
    });

    // Generate JWT access token (assuming you have a util for this)
    const accessToken = generateAccessToken(email); // <-- update this with your token function

    // Fetch user without password
    const loggedInUser = await prisma.user.findUnique({
      where: { id: createdUser.id },
      select: {
        id: true,
        name: true,
        email: true,
        // password is excluded automatically by not selecting it
      },
    });

    // Cookie options
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser },
          "User verified and created successfully"
        )
      );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if TempUser exists
    const tempUser = await prisma.tempUser.findUnique({
      where: { email },
    });

    if (!tempUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new OTP
    const otp = generateOTP(6);
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    // Update TempUser with new OTP + expiry
    await prisma.tempUser.update({
      where: { email },
      data: {
        otp: hashedOtp,
        otpExpiry: expiry,
      },
    });

    // Send new OTP email
    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "New OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Find user in Prisma
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // Compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // Generate JWT access token
  const accessToken = generateAccessToken(email); // pass user or user.id depending on your jwt util

  // Get logged-in user without password
  const loggedInUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      // Exclude password
    },
  });

  // Cookie options
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser },
        "User logged in successfully"
      )
    );
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new OTP
    const otp = generateOTP(6);
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    // Update user with OTP + expiry
    await prisma.user.update({
      where: { email },
      data: {
        otp: hashedOtp,
        otpExpiry: expiry,
      },
    });

    // Send OTP email
    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyForgotPasswordOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Compare OTP
    const isValid = await bcrypt.compare(otp, user.otp || "");
    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check expiry
    const isExpired = user.otpExpiry < new Date();
    if (isExpired) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Clear OTP fields
    await prisma.user.update({
      where: { email },
      data: {
        otp: null,
        otpExpiry: null,
      },
    });

    return res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resendForgotPasswordOTP = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new OTP
    const otp = generateOTP(6);
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    // Update user with new OTP
    await prisma.user.update({
      where: { email },
      data: {
        otp: hashedOtp,
        otpExpiry: expiry,
      },
    });

    // Send OTP via email
    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "New OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, newpassword } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newpassword, 10);

    // Update user password
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        // clear OTP fields if you want after reset
        otp: null,
        otpExpiry: null,
      },
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserDetails = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (!name) {
      throw new ApiError(400, "Name is required");
    }

    const updateData = {};
    if (name) updateData.name = name;

    const updatedUser = await prisma.user.update({
      where: { email },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedUser,
          "Account details updated successfully"
        )
      );
  } catch (error) {
    console.error("Update user error:", error);
    throw new ApiError(500, error.message || "Failed to update user details");
  }
};

export const updatePassword = async (req, res) => {
  const { password, newpassword, email } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (!newpassword || !password) {
      return res
        .status(400)
        .json({ message: "Current and new password are required" });
    }

    // ✅ Compare current password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // ✅ Prevent setting the same password again
    const isSamePassword = await bcrypt.compare(newpassword, user.password);
    if (isSamePassword) {
      return res
        .status(400)
        .json({ message: "New password cannot be the same as old password" });
    }

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(newpassword, 10);

    // ✅ Update user password
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        otp: null,
        otpExpiry: null,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "Password updated successfully"));
  } catch (error) {
    console.error("Update password error:", error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to update user password" });
  }
};
