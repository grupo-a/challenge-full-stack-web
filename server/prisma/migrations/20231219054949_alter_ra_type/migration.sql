/*
  Warnings:

  - Changed the type of `ra` on the `students` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "ra",
ADD COLUMN     "ra" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_ra_key" ON "students"("ra");
