/*
  Warnings:

  - The primary key for the `FavoriteAlbum` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FavoriteAlbum` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FavoriteAlbum" DROP CONSTRAINT "FavoriteAlbum_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FavoriteAlbum_pkey" PRIMARY KEY ("albumId");
