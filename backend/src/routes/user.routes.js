import { Router } from "express";

import {
  registerUser,
  verifyOTPAndCreateUser,
  resendOTP,
  loginUser,
  forgotPassword,
  verifyForgotPasswordOTP,
  resendForgotPasswordOTP,
  resetPassword,
  logoutUser,
  getCurrentUser,
  updateUserDetails,
  updatePassword,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/verify-otp").post(verifyOTPAndCreateUser);
router.route("/resend-otp").post(resendOTP);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-forgot-password-otp").post(verifyForgotPasswordOTP);
router.route("/resend-forgot-password-otp").post(resendForgotPasswordOTP);
router.route("/reset-password").post(resetPassword);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-details").post(updateUserDetails);
router.route("/update-password").post(updatePassword);

export default router;
