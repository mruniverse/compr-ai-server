/*
  Warnings:

  - You are about to drop the `divida` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `divida` DROP FOREIGN KEY `Divida_credor_id_fkey`;

-- DropForeignKey
ALTER TABLE `divida` DROP FOREIGN KEY `Divida_devedor_id_fkey`;

-- DropTable
DROP TABLE `divida`;

-- CreateTable
CREATE TABLE `Dividas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `credor_id` INTEGER NOT NULL,
    `devedor_id` INTEGER NOT NULL,
    `tipo_garantia` INTEGER NULL,
    `modo_constituicao_mora` INTEGER NULL,
    `status` INTEGER NULL,
    `multa` DOUBLE NULL,
    `mora` DOUBLE NULL,
    `valor_total_inicial` DOUBLE NULL,
    `observacoes` VARCHAR(191) NULL,
    `data_contratacao` DATETIME(3) NULL,
    `data_pagamento` DATETIME(3) NULL,
    `data_prescricao` DATETIME(3) NULL,
    `data_constituicao_mora` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dividas` ADD CONSTRAINT `Dividas_credor_id_fkey` FOREIGN KEY (`credor_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dividas` ADD CONSTRAINT `Dividas_devedor_id_fkey` FOREIGN KEY (`devedor_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
