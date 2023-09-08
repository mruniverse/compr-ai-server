/*
  Warnings:

  - You are about to drop the column `status` on the `parcelasdividas` table. All the data in the column will be lost.
  - Added the required column `status_id` to the `ParcelasDividas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `parcelasdividas` DROP FOREIGN KEY `ParcelasDividas_status_fkey`;

-- AlterTable
ALTER TABLE `parcelasdividas` DROP COLUMN `status`,
    ADD COLUMN `status_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ParcelasDividas` ADD CONSTRAINT `ParcelasDividas_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `StatusParcelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
