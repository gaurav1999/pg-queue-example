/*
  Warnings:

  - Added the required column `processingAt` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Queue" ADD COLUMN     "isDead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "processingAt" TIMESTAMP(3) NOT NULL;
