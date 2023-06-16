/*
  Warnings:

  - The primary key for the `FavoriteAlbum` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[albumId]` on the table `FavoriteAlbum` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `FavoriteAlbum` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "FavoriteAlbum" DROP CONSTRAINT "FavoriteAlbum_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "FavoriteAlbum_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteAlbum_albumId_key" ON "FavoriteAlbum"("albumId");
