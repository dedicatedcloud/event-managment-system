/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Equipment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Venues` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `picture` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Venues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `equipment` ADD COLUMN `picture` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `food` ADD COLUMN `picture` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `venues` ADD COLUMN `picture` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Equipment_name_key` ON `Equipment`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Food_name_key` ON `Food`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Venues_name_key` ON `Venues`(`name`);
