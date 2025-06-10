-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_wonMatchId_fkey";

-- AlterTable
ALTER TABLE "Participation" ALTER COLUMN "wonMatchId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_wonMatchId_fkey" FOREIGN KEY ("wonMatchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;
