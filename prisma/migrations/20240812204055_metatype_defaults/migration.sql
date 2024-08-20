-- CreateTable
CREATE TABLE "DefaultAttribute" (
    "id" SERIAL NOT NULL,
    "metatypeId" INTEGER NOT NULL,
    "attributeId" INTEGER NOT NULL,

    CONSTRAINT "DefaultAttribute_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DefaultAttribute" ADD CONSTRAINT "DefaultAttribute_metatypeId_fkey" FOREIGN KEY ("metatypeId") REFERENCES "Metatype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultAttribute" ADD CONSTRAINT "DefaultAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
