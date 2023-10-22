-- DropForeignKey
ALTER TABLE `fasesregua` DROP FOREIGN KEY `FasesRegua_regua_id_fkey`;

-- DropForeignKey
ALTER TABLE `reguas` DROP FOREIGN KEY `Reguas_license_id_fkey`;

-- DropForeignKey
ALTER TABLE `statusfasedividas` DROP FOREIGN KEY `StatusFaseDividas_divida_id_fkey`;

-- DropForeignKey
ALTER TABLE `statusfasedividas` DROP FOREIGN KEY `StatusFaseDividas_fase_id_fkey`;

-- AlterTable
ALTER TABLE `statusfasedividas` ADD COLUMN `isCronActive` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Reguas` ADD CONSTRAINT `Reguas_license_id_fkey` FOREIGN KEY (`license_id`) REFERENCES `Licenses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FasesRegua` ADD CONSTRAINT `FasesRegua_regua_id_fkey` FOREIGN KEY (`regua_id`) REFERENCES `Reguas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StatusFaseDividas` ADD CONSTRAINT `StatusFaseDividas_divida_id_fkey` FOREIGN KEY (`divida_id`) REFERENCES `Dividas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StatusFaseDividas` ADD CONSTRAINT `StatusFaseDividas_fase_id_fkey` FOREIGN KEY (`fase_id`) REFERENCES `FasesRegua`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
