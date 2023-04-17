/*
  Warnings:

  - A unique constraint covering the columns `[bannerUrl]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Game_bannerUrl_key" ON "Game"("bannerUrl");
