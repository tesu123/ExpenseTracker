/*
  Warnings:

  - Made the column `otp` on table `TempUser` required. This step will fail if there are existing NULL values in that column.
  - Made the column `otpExpiry` on table `TempUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."TempUser" ALTER COLUMN "otp" SET NOT NULL,
ALTER COLUMN "otpExpiry" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "otp" DROP NOT NULL,
ALTER COLUMN "otpExpiry" DROP NOT NULL;
