-- CreateTable
CREATE TABLE "poetry_maker" (
    "id" SERIAL NOT NULL,
    "poems" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "poetry_maker_pkey" PRIMARY KEY ("id")
);
