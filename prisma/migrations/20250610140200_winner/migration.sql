/*
  Warnings:

  - You are about to drop the `_MatchToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `wonMatchId` to the `Participation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MatchToUser" DROP CONSTRAINT "_MatchToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatchToUser" DROP CONSTRAINT "_MatchToUser_B_fkey";

-- AlterTable
ALTER TABLE "Participation" ADD COLUMN     "wonMatchId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_MatchToUser";

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_wonMatchId_fkey" FOREIGN KEY ("wonMatchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
