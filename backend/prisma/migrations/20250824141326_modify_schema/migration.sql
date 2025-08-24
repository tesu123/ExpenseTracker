/*
  Warnings:

  - You are about to drop the column `date` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Income` table. All the data in the column will be lost.
  - Added the required column `description` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "date",
DROP COLUMN "note",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Income" DROP COLUMN "date",
DROP COLUMN "note",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
