/*
  Warnings:

  - Added the required column `publicId` to the `ImagePets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImagePets" ADD COLUMN     "publicId" TEXT NOT NULL;
