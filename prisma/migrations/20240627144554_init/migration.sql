-- CreateTable
CREATE TABLE "Attribute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "attributeId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "valueMax" INTEGER NOT NULL,
    CONSTRAINT "Attribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "GameAttribute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Attribute_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameAttribute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "shortname" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "skillId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "valueMax" INTEGER NOT NULL,
    CONSTRAINT "Skill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "GameSkill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Skill_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameSkill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_attributeId_key" ON "Attribute"("attributeId");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_characterId_key" ON "Attribute"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "GameAttribute_name_key" ON "GameAttribute"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GameAttribute_shortname_key" ON "GameAttribute"("shortname");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_skillId_key" ON "Skill"("skillId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_characterId_key" ON "Skill"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "GameSkill_name_key" ON "GameSkill"("name");
