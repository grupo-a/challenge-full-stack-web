-- CreateTable
CREATE TABLE "students" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "RA" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("RA")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_RA_key" ON "students"("RA");
