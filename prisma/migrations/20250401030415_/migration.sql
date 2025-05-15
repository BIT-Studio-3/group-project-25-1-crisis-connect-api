/*
  Warnings:

  - You are about to drop the column `City` on the `hazard` table. All the data in the column will be lost.
  - You are about to drop the column `Region` on the `hazard` table. All the data in the column will be lost.
  - Added the required column `city` to the `hazard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `hazard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hazard" DROP COLUMN "City",
DROP COLUMN "Region",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;
