/*
  Warnings:

  - You are about to drop the `OutGoing` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Food', 'Health', 'Habitation', 'Transport', 'Education', 'Leisure', 'Unexpected', 'Other');

-- AlterTable
ALTER TABLE "Income" ALTER COLUMN "date" DROP DEFAULT;

-- DropTable
DROP TABLE "OutGoing";

-- CreateTable
CREATE TABLE "Outgoing" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'Other',

    CONSTRAINT "Outgoing_pkey" PRIMARY KEY ("id")
);
