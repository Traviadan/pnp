/*
  Warnings:

  - Added the required column `metatypeId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "metatypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Metatype" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Metatype_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_metatypeId_fkey" FOREIGN KEY ("metatypeId") REFERENCES "Metatype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
