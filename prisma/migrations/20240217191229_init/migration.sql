-- CreateEnum
CREATE TYPE "QueueStatus" AS ENUM ('NEW', 'PROCESSING', 'DONE', 'FAILED');

-- CreateTable
CREATE TABLE "Queue" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "QueueStatus" NOT NULL,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);
