/*
  Warnings:

  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CPF` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `RA` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ra]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ra` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "students_RA_key";

-- AlterTable
ALTER TABLE "students" DROP CONSTRAINT "students_pkey",
DROP COLUMN "CPF",
DROP COLUMN "RA",
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "ra" TEXT NOT NULL,
ADD CONSTRAINT "students_pkey" PRIMARY KEY ("ra");

-- CreateIndex
CREATE UNIQUE INDEX "students_ra_key" ON "students"("ra");
