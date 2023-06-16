/*
  Warnings:

  - The primary key for the `FavoriteAlbum` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FavoriteAlbum` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FavoriteAlbum" DROP CONSTRAINT "FavoriteAlbum_pkey",
DROP COLUMN "id";

-- CreateTable
CREATE TABLE "FavoriteTrack" (
    "trackId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavoriteArtist" (
    "artistsId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteTrack_trackId_key" ON "FavoriteTrack"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteArtist_artistsId_key" ON "FavoriteArtist"("artistsId");

-- AddForeignKey
ALTER TABLE "FavoriteTrack" ADD CONSTRAINT "FavoriteTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteArtist" ADD CONSTRAINT "FavoriteArtist_artistsId_fkey" FOREIGN KEY ("artistsId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
