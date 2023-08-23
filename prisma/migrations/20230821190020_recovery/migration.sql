/*
  Warnings:

  - Added the required column `name` to the `Permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permissions` ADD COLUMN `name` VARCHAR(191) NOT NULL;
