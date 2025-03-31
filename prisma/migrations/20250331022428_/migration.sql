/*
  Warnings:

  - You are about to drop the `Institution` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Institution";

-- CreateTable
CREATE TABLE "Damage" (
    "id" TEXT NOT NULL,
    "streetNumber" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Region" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Damage_pkey" PRIMARY KEY ("id")
);
