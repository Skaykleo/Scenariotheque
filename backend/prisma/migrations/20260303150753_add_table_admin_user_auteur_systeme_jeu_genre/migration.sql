/*
  Warnings:

  - You are about to drop the column `datePublication` on the `Scenario` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Scenario` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Scenario` table. All the data in the column will be lost.
  - Added the required column `auteurId` to the `Scenario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Scenario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genreId` to the `Scenario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titre` to the `Scenario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scenario" DROP COLUMN "datePublication",
DROP COLUMN "desc",
DROP COLUMN "title",
ADD COLUMN     "anneePublication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "auteurId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "genreId" INTEGER NOT NULL,
ADD COLUMN     "titre" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemeJeu" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "auteurId" INTEGER NOT NULL,

    CONSTRAINT "SystemeJeu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auteur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,

    CONSTRAINT "Auteur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "Auteur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemeJeu" ADD CONSTRAINT "SystemeJeu_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "Auteur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
