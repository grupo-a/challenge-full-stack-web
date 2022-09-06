/*
  Warnings:

  - You are about to alter the column `ra` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "ra" SET DATA TYPE INTEGER;
