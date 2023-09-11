/*
  Warnings:

  - You are about to drop the column `informacoes_conta` on the `cheque` table. All the data in the column will be lost.
  - You are about to drop the `parcelasdividas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `agencia` to the `Cheque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banco` to the `Cheque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conta` to the `Cheque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_cheque` to the `Cheque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operacao_alinea_devolucao` to the `Cheque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parcela_id` to the `Cheque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parcela_id` to the `Duplicata` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `parcelasdividas` DROP FOREIGN KEY `ParcelasDividas_divida_id_fkey`;

-- DropForeignKey
ALTER TABLE `parcelasdividas` DROP FOREIGN KEY `ParcelasDividas_status_id_fkey`;

-- AlterTable
ALTER TABLE `cheque` DROP COLUMN `informacoes_conta`,
    ADD COLUMN `agencia` INTEGER NOT NULL,
    ADD COLUMN `banco` INTEGER NOT NULL,
    ADD COLUMN `conta` INTEGER NOT NULL,
    ADD COLUMN `numero_cheque` INTEGER NOT NULL,
    ADD COLUMN `operacao_alinea_devolucao` INTEGER NOT NULL,
    ADD COLUMN `parcela_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `duplicata` ADD COLUMN `parcela_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `parcelasdividas`;

-- CreateTable
CREATE TABLE `ParcelasOperacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status_id` INTEGER NOT NULL,
    `numero_parcela` INTEGER NOT NULL,
    `ultima_atualizacao` DATETIME(3) NOT NULL,
    `data_vencimento` DATETIME(3) NOT NULL,
    `data_pagamento` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ParcelasOperacao` ADD CONSTRAINT `ParcelasOperacao_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `StatusParcelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cheque` ADD CONSTRAINT `Cheque_parcela_id_fkey` FOREIGN KEY (`parcela_id`) REFERENCES `ParcelasOperacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Duplicata` ADD CONSTRAINT `Duplicata_parcela_id_fkey` FOREIGN KEY (`parcela_id`) REFERENCES `ParcelasOperacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
