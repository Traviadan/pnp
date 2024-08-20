/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `finished` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_characterId_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "finished" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Note";

-- CreateTable
CREATE TABLE "CharacterNote" (
    "id" SERIAL NOT NULL,
    "noteText" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "CharacterNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GearNote" (
    "id" SERIAL NOT NULL,
    "noteText" TEXT NOT NULL,
    "gearId" INTEGER NOT NULL,

    CONSTRAINT "GearNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gear" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gameGearId" INTEGER NOT NULL,

    CONSTRAINT "Gear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameGear" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER,
    "capacitiy" INTEGER,
    "legal" BOOLEAN NOT NULL,
    "restricted" BOOLEAN NOT NULL,
    "availability" INTEGER,

    CONSTRAINT "GameGear_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gear_name_key" ON "Gear"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GameGear_name_key" ON "GameGear"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GameGear_description_key" ON "GameGear"("description");

-- AddForeignKey
ALTER TABLE "CharacterNote" ADD CONSTRAINT "CharacterNote_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GearNote" ADD CONSTRAINT "GearNote_gearId_fkey" FOREIGN KEY ("gearId") REFERENCES "Gear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gear" ADD CONSTRAINT "Gear_gameGearId_fkey" FOREIGN KEY ("gameGearId") REFERENCES "GameGear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
