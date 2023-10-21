/*
  Warnings:

  - You are about to drop the `regua` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `regua_id` on table `fasesregua` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `fasesregua` DROP FOREIGN KEY `FasesRegua_regua_id_fkey`;

-- DropForeignKey
ALTER TABLE `regua` DROP FOREIGN KEY `Regua_license_id_fkey`;

-- AlterTable
ALTER TABLE `fasesregua` ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `regua_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `regua`;

-- CreateTable
CREATE TABLE `Reguas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `license_id` INTEGER NOT NULL,
    `tipo_regua` VARCHAR(191) NOT NULL DEFAULT 'cobranca',
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusFaseDividas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `divida_id` INTEGER NOT NULL,
    `regua_id` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reguas` ADD CONSTRAINT `Reguas_license_id_fkey` FOREIGN KEY (`license_id`) REFERENCES `Licenses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FasesRegua` ADD CONSTRAINT `FasesRegua_regua_id_fkey` FOREIGN KEY (`regua_id`) REFERENCES `Reguas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StatusFaseDividas` ADD CONSTRAINT `StatusFaseDividas_divida_id_fkey` FOREIGN KEY (`divida_id`) REFERENCES `Dividas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StatusFaseDividas` ADD CONSTRAINT `StatusFaseDividas_regua_id_fkey` FOREIGN KEY (`regua_id`) REFERENCES `Reguas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
