/*
  Warnings:

  - You are about to drop the `poetry_maker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "poetry_maker";

-- CreateTable
CREATE TABLE "poetryMaker" (
    "id" SERIAL NOT NULL,
    "poem" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "poetryMaker_pkey" PRIMARY KEY ("id")
);
