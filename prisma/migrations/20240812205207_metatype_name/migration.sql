/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Metatype` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Metatype_name_key" ON "Metatype"("name");
