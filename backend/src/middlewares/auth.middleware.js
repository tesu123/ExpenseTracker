import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

export const verifyJWT = async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Decode and verify JWT
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Fetch user by ID using Prisma
    const user = await prisma.user.findUnique({
      where: { email: decodedToken?.email }, // we signed token with { id, email }
      select: {
        id: true,
        name: true,
        email: true, 
        // password excluded by not selecting it
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
};
