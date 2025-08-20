import jwt from "jsonwebtoken"

export const generateAccessToken=(email)=>{
    return jwt.sign(
    {
      email: email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
}