/*
  Warnings:

  - Added the required column `price` to the `Venues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `venues` ADD COLUMN `price` INTEGER NOT NULL;
