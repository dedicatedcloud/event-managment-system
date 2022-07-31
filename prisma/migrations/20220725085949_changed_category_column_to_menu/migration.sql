/*
  Warnings:

  - You are about to drop the column `category` on the `food` table. All the data in the column will be lost.
  - Added the required column `menu` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `food` DROP COLUMN `category`,
    ADD COLUMN `menu` VARCHAR(191) NOT NULL;
