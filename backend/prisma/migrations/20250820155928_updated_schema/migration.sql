-- AlterTable
ALTER TABLE "public"."TempUser" ALTER COLUMN "otp" DROP NOT NULL,
ALTER COLUMN "otpExpiry" DROP NOT NULL;
