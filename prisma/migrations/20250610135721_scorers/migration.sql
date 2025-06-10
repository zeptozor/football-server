-- CreateTable
CREATE TABLE "_MatchHomeScorer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MatchHomeScorer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MatchAwayScorer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MatchAwayScorer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MatchHomeScorer_B_index" ON "_MatchHomeScorer"("B");

-- CreateIndex
CREATE INDEX "_MatchAwayScorer_B_index" ON "_MatchAwayScorer"("B");

-- AddForeignKey
ALTER TABLE "_MatchHomeScorer" ADD CONSTRAINT "_MatchHomeScorer_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchHomeScorer" ADD CONSTRAINT "_MatchHomeScorer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchAwayScorer" ADD CONSTRAINT "_MatchAwayScorer_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchAwayScorer" ADD CONSTRAINT "_MatchAwayScorer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
