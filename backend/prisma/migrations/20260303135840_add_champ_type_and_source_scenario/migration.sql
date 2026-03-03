/*
  Warnings:

  - Added the required column `source` to the `Scenario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Scenario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypePublication" AS ENUM ('LIVRE', 'MAGAZINE');

-- AlterTable
ALTER TABLE "Scenario" ADD COLUMN     "source" TEXT NOT NULL,
ADD COLUMN     "type" "TypePublication" NOT NULL;
