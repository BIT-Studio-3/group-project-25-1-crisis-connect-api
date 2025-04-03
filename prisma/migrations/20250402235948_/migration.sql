/*
  Warnings:

  - You are about to drop the column `City` on the `Damage` table. All the data in the column will be lost.
  - You are about to drop the column `Region` on the `Damage` table. All the data in the column will be lost.
  - Added the required column `city` to the `Damage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Damage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Damage" DROP COLUMN "City",
DROP COLUMN "Region",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;
