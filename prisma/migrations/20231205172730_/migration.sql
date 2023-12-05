/*
  Warnings:

  - You are about to drop the column `licenca_id` on the `tiposcontrato` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tiposcontrato` DROP FOREIGN KEY `TiposContrato_licenca_id_fkey`;

-- AlterTable
ALTER TABLE `tiposcontrato` DROP COLUMN `licenca_id`,
    ADD COLUMN `license_id` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `TiposContrato` ADD CONSTRAINT `TiposContrato_license_id_fkey` FOREIGN KEY (`license_id`) REFERENCES `Licenses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
