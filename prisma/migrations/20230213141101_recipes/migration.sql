/*
  Warnings:

  - You are about to drop the `knex_migrations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "knex_migrations";

-- CreateTable
CREATE TABLE "Recipes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipes_title_key" ON "Recipes"("title");
