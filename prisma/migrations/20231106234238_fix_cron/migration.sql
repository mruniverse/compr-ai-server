-- AlterTable
ALTER TABLE `dividas` ADD COLUMN `license_id` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Dividas` ADD CONSTRAINT `Dividas_license_id_fkey` FOREIGN KEY (`license_id`) REFERENCES `Licenses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
