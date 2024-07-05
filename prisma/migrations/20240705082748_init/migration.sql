/*
  Warnings:

  - You are about to drop the column `poems` on the `poetry_maker` table. All the data in the column will be lost.
  - Added the required column `poem` to the `poetry_maker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "poetry_maker" DROP COLUMN "poems",
ADD COLUMN     "poem" TEXT NOT NULL;
