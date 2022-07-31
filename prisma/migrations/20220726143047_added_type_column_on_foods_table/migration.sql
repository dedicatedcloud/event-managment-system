/*
  Warnings:

  - Added the required column `type` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `food` ADD COLUMN `type` VARCHAR(191) NOT NULL;
