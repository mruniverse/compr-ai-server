/*
  Warnings:

  - You are about to drop the column `tipo_garantia` on the `dividas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `dividas` DROP COLUMN `tipo_garantia`,
    ADD COLUMN `tipo_garantia_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `TipoGarantia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TipoGarantia_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dividas` ADD CONSTRAINT `Dividas_tipo_garantia_id_fkey` FOREIGN KEY (`tipo_garantia_id`) REFERENCES `TipoGarantia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
