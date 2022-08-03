/*
  Warnings:

  - You are about to drop the `our_events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `our_events`;

-- CreateTable
CREATE TABLE `Company_Events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
