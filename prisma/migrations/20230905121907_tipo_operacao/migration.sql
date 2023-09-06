/*
  Warnings:

  - You are about to drop the column `banco_emissor` on the `tipooperacao` table. All the data in the column will be lost.
  - You are about to drop the column `emitente_operacao_id` on the `tipooperacao` table. All the data in the column will be lost.
  - You are about to drop the column `favorecido_operacao_id` on the `tipooperacao` table. All the data in the column will be lost.
  - You are about to drop the column `nome_operacao` on the `tipooperacao` table. All the data in the column will be lost.
  - You are about to drop the column `numero_operacao` on the `tipooperacao` table. All the data in the column will be lost.
  - You are about to drop the column `operacao_alinea_devolucao` on the `tipooperacao` table. All the data in the column will be lost.
  - You are about to drop the column `operacao_arquivo` on the `tipooperacao` table. All the data in the column will be lost.
  - You are about to drop the column `praca_pagamento` on the `tipooperacao` table. All the data in the column will be lost.
  - You are about to drop the column `valor_nominal` on the `tipooperacao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tipooperacao` DROP FOREIGN KEY `TipoOperacao_emitente_operacao_id_fkey`;

-- DropForeignKey
ALTER TABLE `tipooperacao` DROP FOREIGN KEY `TipoOperacao_favorecido_operacao_id_fkey`;

-- AlterTable
ALTER TABLE `tipooperacao` DROP COLUMN `banco_emissor`,
    DROP COLUMN `emitente_operacao_id`,
    DROP COLUMN `favorecido_operacao_id`,
    DROP COLUMN `nome_operacao`,
    DROP COLUMN `numero_operacao`,
    DROP COLUMN `operacao_alinea_devolucao`,
    DROP COLUMN `operacao_arquivo`,
    DROP COLUMN `praca_pagamento`,
    DROP COLUMN `valor_nominal`;

-- CreateTable
CREATE TABLE `Hipoteca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mutuario_id` INTEGER NOT NULL,
    `credor_hipotecario_id` INTEGER NOT NULL,
    `descricao_bem_imovel` VARCHAR(191) NOT NULL,
    `valor_emprestimo` DOUBLE NOT NULL,
    `valor_avaliado_imovel` DOUBLE NOT NULL,
    `data_vencimento` DATETIME(3) NOT NULL,
    `termos_condicoes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlienacaoFiduciaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao_bem_movel` VARCHAR(191) NOT NULL,
    `valor_financiado` DOUBLE NOT NULL,
    `detalhes_bem_movel` VARCHAR(191) NOT NULL,
    `mutuario_id` INTEGER NOT NULL,
    `credor_fiduciario_id` INTEGER NOT NULL,
    `data_vencimento` DATETIME(3) NOT NULL,
    `termos_condicoes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penhor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao_bem_movel` VARCHAR(191) NOT NULL,
    `valor_emprestimo` DOUBLE NOT NULL,
    `detalhes_bem_movel` VARCHAR(191) NOT NULL,
    `mutuario_id` INTEGER NOT NULL,
    `credor_penhorista_id` INTEGER NOT NULL,
    `data_vencimento` DATETIME(3) NOT NULL,
    `termos_condicoes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aval` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `avalista_id` INTEGER NOT NULL,
    `devedor_id` INTEGER NOT NULL,
    `valor_divida_avalizada` DOUBLE NOT NULL,
    `relacao_avalista_devedor` VARCHAR(191) NOT NULL,
    `termos_condicoes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fianca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fiador_id` INTEGER NOT NULL,
    `devedor_id` INTEGER NOT NULL,
    `valor_divida_fiancada` DOUBLE NOT NULL,
    `relacao_fiador_devedor` VARCHAR(191) NOT NULL,
    `termos_condicoes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeguroGarantia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seguradora_id` INTEGER NOT NULL,
    `tomador_seguro_id` INTEGER NOT NULL,
    `valor_garantia_segurada` DOUBLE NOT NULL,
    `termos_condicoes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartaDeCredito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emitente_id` INTEGER NOT NULL,
    `beneficiario_id` INTEGER NOT NULL,
    `valor_carta_credito` DOUBLE NOT NULL,
    `condicoes_liberacao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cheque` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emitente_cheque_id` INTEGER NOT NULL,
    `beneficiario_id` INTEGER NOT NULL,
    `valor_cheque` DOUBLE NOT NULL,
    `data_emissao` DATETIME(3) NOT NULL,
    `data_vencimento` DATETIME(3) NOT NULL,
    `informacoes_conta` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Duplicata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emitente_duplicata_id` INTEGER NOT NULL,
    `sacado_id` INTEGER NOT NULL,
    `valor_duplicata` DOUBLE NOT NULL,
    `data_emissao` DATETIME(3) NOT NULL,
    `data_vencimento` DATETIME(3) NOT NULL,
    `detalhes_itens_servicos` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_HipotecaToTipoOperacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_HipotecaToTipoOperacao_AB_unique`(`A`, `B`),
    INDEX `_HipotecaToTipoOperacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AlienacaoFiduciariaToTipoOperacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AlienacaoFiduciariaToTipoOperacao_AB_unique`(`A`, `B`),
    INDEX `_AlienacaoFiduciariaToTipoOperacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PenhorToTipoOperacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PenhorToTipoOperacao_AB_unique`(`A`, `B`),
    INDEX `_PenhorToTipoOperacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AvalToTipoOperacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AvalToTipoOperacao_AB_unique`(`A`, `B`),
    INDEX `_AvalToTipoOperacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FiancaToTipoOperacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FiancaToTipoOperacao_AB_unique`(`A`, `B`),
    INDEX `_FiancaToTipoOperacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SeguroGarantiaToTipoOperacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SeguroGarantiaToTipoOperacao_AB_unique`(`A`, `B`),
    INDEX `_SeguroGarantiaToTipoOperacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CartaDeCreditoToTipoOperacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CartaDeCreditoToTipoOperacao_AB_unique`(`A`, `B`),
    INDEX `_CartaDeCreditoToTipoOperacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChequeToTipoOperacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ChequeToTipoOperacao_AB_unique`(`A`, `B`),
    INDEX `_ChequeToTipoOperacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DuplicataToTipoOperacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DuplicataToTipoOperacao_AB_unique`(`A`, `B`),
    INDEX `_DuplicataToTipoOperacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Hipoteca` ADD CONSTRAINT `Hipoteca_mutuario_id_fkey` FOREIGN KEY (`mutuario_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hipoteca` ADD CONSTRAINT `Hipoteca_credor_hipotecario_id_fkey` FOREIGN KEY (`credor_hipotecario_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlienacaoFiduciaria` ADD CONSTRAINT `AlienacaoFiduciaria_mutuario_id_fkey` FOREIGN KEY (`mutuario_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlienacaoFiduciaria` ADD CONSTRAINT `AlienacaoFiduciaria_credor_fiduciario_id_fkey` FOREIGN KEY (`credor_fiduciario_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penhor` ADD CONSTRAINT `Penhor_mutuario_id_fkey` FOREIGN KEY (`mutuario_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penhor` ADD CONSTRAINT `Penhor_credor_penhorista_id_fkey` FOREIGN KEY (`credor_penhorista_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aval` ADD CONSTRAINT `Aval_avalista_id_fkey` FOREIGN KEY (`avalista_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aval` ADD CONSTRAINT `Aval_devedor_id_fkey` FOREIGN KEY (`devedor_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fianca` ADD CONSTRAINT `Fianca_fiador_id_fkey` FOREIGN KEY (`fiador_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fianca` ADD CONSTRAINT `Fianca_devedor_id_fkey` FOREIGN KEY (`devedor_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeguroGarantia` ADD CONSTRAINT `SeguroGarantia_seguradora_id_fkey` FOREIGN KEY (`seguradora_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeguroGarantia` ADD CONSTRAINT `SeguroGarantia_tomador_seguro_id_fkey` FOREIGN KEY (`tomador_seguro_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartaDeCredito` ADD CONSTRAINT `CartaDeCredito_emitente_id_fkey` FOREIGN KEY (`emitente_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartaDeCredito` ADD CONSTRAINT `CartaDeCredito_beneficiario_id_fkey` FOREIGN KEY (`beneficiario_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cheque` ADD CONSTRAINT `Cheque_emitente_cheque_id_fkey` FOREIGN KEY (`emitente_cheque_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cheque` ADD CONSTRAINT `Cheque_beneficiario_id_fkey` FOREIGN KEY (`beneficiario_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Duplicata` ADD CONSTRAINT `Duplicata_emitente_duplicata_id_fkey` FOREIGN KEY (`emitente_duplicata_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Duplicata` ADD CONSTRAINT `Duplicata_sacado_id_fkey` FOREIGN KEY (`sacado_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HipotecaToTipoOperacao` ADD CONSTRAINT `_HipotecaToTipoOperacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `Hipoteca`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HipotecaToTipoOperacao` ADD CONSTRAINT `_HipotecaToTipoOperacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `TipoOperacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AlienacaoFiduciariaToTipoOperacao` ADD CONSTRAINT `_AlienacaoFiduciariaToTipoOperacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `AlienacaoFiduciaria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AlienacaoFiduciariaToTipoOperacao` ADD CONSTRAINT `_AlienacaoFiduciariaToTipoOperacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `TipoOperacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PenhorToTipoOperacao` ADD CONSTRAINT `_PenhorToTipoOperacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `Penhor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PenhorToTipoOperacao` ADD CONSTRAINT `_PenhorToTipoOperacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `TipoOperacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AvalToTipoOperacao` ADD CONSTRAINT `_AvalToTipoOperacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `Aval`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AvalToTipoOperacao` ADD CONSTRAINT `_AvalToTipoOperacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `TipoOperacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FiancaToTipoOperacao` ADD CONSTRAINT `_FiancaToTipoOperacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `Fianca`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FiancaToTipoOperacao` ADD CONSTRAINT `_FiancaToTipoOperacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `TipoOperacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SeguroGarantiaToTipoOperacao` ADD CONSTRAINT `_SeguroGarantiaToTipoOperacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `SeguroGarantia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SeguroGarantiaToTipoOperacao` ADD CONSTRAINT `_SeguroGarantiaToTipoOperacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `TipoOperacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartaDeCreditoToTipoOperacao` ADD CONSTRAINT `_CartaDeCreditoToTipoOperacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `CartaDeCredito`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartaDeCreditoToTipoOperacao` ADD CONSTRAINT `_CartaDeCreditoToTipoOperacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `TipoOperacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChequeToTipoOperacao` ADD CONSTRAINT `_ChequeToTipoOperacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cheque`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChequeToTipoOperacao` ADD CONSTRAINT `_ChequeToTipoOperacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `TipoOperacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DuplicataToTipoOperacao` ADD CONSTRAINT `_DuplicataToTipoOperacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `Duplicata`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DuplicataToTipoOperacao` ADD CONSTRAINT `_DuplicataToTipoOperacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `TipoOperacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
