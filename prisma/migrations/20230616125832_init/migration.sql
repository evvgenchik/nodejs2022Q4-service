/*
  Warnings:

  - You are about to drop the column `artistsId` on the `FavoriteArtist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[artistId]` on the table `FavoriteArtist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artistId` to the `FavoriteArtist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FavoriteArtist" DROP CONSTRAINT "FavoriteArtist_artistsId_fkey";

-- DropIndex
DROP INDEX "FavoriteArtist_artistsId_key";

-- AlterTable
ALTER TABLE "FavoriteArtist" DROP COLUMN "artistsId",
ADD COLUMN     "artistId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteArtist_artistId_key" ON "FavoriteArtist"("artistId");

-- AddForeignKey
ALTER TABLE "FavoriteArtist" ADD CONSTRAINT "FavoriteArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
