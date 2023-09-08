/*
  Warnings:

  - You are about to drop the `parceladivida` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `parceladivida` DROP FOREIGN KEY `ParcelaDivida_divida_id_fkey`;

-- DropForeignKey
ALTER TABLE `parceladivida` DROP FOREIGN KEY `ParcelaDivida_status_fkey`;

-- AlterTable
ALTER TABLE `cheque` MODIFY `data_emissao` DATETIME(3) NOT NULL,
    MODIFY `data_vencimento` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `duplicata` MODIFY `data_emissao` DATETIME(3) NOT NULL,
    MODIFY `data_vencimento` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `parceladivida`;

-- CreateTable
CREATE TABLE `ParcelasDividas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `divida_id` INTEGER NOT NULL,
    `numero_parcela` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,
    `valor_parcela` DOUBLE NOT NULL,
    `taxa_juros` DOUBLE NOT NULL,
    `tipo_juros` DOUBLE NOT NULL,
    `data_vencimento` DATETIME(3) NOT NULL,
    `ultima_atualizacao` DATETIME(3) NOT NULL,
    `data_pagamento` DATETIME(3) NULL,
    `observacoes` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ParcelasDividas` ADD CONSTRAINT `ParcelasDividas_divida_id_fkey` FOREIGN KEY (`divida_id`) REFERENCES `Dividas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParcelasDividas` ADD CONSTRAINT `ParcelasDividas_status_fkey` FOREIGN KEY (`status`) REFERENCES `StatusParcela`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
