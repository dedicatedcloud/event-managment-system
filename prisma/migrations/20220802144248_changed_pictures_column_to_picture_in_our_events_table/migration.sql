/*
  Warnings:

  - You are about to drop the column `pictures` on the `our_events` table. All the data in the column will be lost.
  - Added the required column `picture` to the `Our_Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `our_events` DROP COLUMN `pictures`,
    ADD COLUMN `picture` JSON NOT NULL;
