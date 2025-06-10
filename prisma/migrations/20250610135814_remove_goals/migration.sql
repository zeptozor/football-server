/*
  Warnings:

  - You are about to drop the column `awayGoals` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `homeGoals` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "awayGoals",
DROP COLUMN "homeGoals";
