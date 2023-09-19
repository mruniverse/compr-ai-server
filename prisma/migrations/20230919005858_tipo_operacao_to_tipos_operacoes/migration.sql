/*
  Warnings:

  - You are about to drop the `_alienacaofiduciariatotipooperacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_avaltotipooperacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_cartadecreditototipooperacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_chequetotipooperacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_duplicatatotipooperacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_fiancatotipooperacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_hipotecatotipooperacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_penhortotipooperacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_segurogarantiatotipooperacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipooperacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_alienacaofiduciariatotipooperacao` DROP FOREIGN KEY `_AlienacaoFiduciariaToTipoOperacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_alienacaofiduciariatotipooperacao` DROP FOREIGN KEY `_AlienacaoFiduciariaToTipoOperacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `_avaltotipooperacao` DROP FOREIGN KEY `_AvalToTipoOperacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_avaltotipooperacao` DROP FOREIGN KEY `_AvalToTipoOperacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `_cartadecreditototipooperacao` DROP FOREIGN KEY `_CartaDeCreditoToTipoOperacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_cartadecreditototipooperacao` DROP FOREIGN KEY `_CartaDeCreditoToTipoOperacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `_chequetotipooperacao` DROP FOREIGN KEY `_ChequeToTipoOperacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_chequetotipooperacao` DROP FOREIGN KEY `_ChequeToTipoOperacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `_duplicatatotipooperacao` DROP FOREIGN KEY `_DuplicataToTipoOperacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_duplicatatotipooperacao` DROP FOREIGN KEY `_DuplicataToTipoOperacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `_fiancatotipooperacao` DROP FOREIGN KEY `_FiancaToTipoOperacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_fiancatotipooperacao` DROP FOREIGN KEY `_FiancaToTipoOperacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `_hipotecatotipooperacao` DROP FOREIGN KEY `_HipotecaToTipoOperacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_hipotecatotipooperacao` DROP FOREIGN KEY `_HipotecaToTipoOperacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `_penhortotipooperacao` DROP FOREIGN KEY `_PenhorToTipoOperacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_penhortotipooperacao` DROP FOREIGN KEY `_PenhorToTipoOperacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `_segurogarantiatotipooperacao` DROP FOREIGN KEY `_SeguroGarantiaToTipoOperacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_segurogarantiatotipooperacao` DROP FOREIGN KEY `_SeguroGarantiaToTipoOperacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `tipooperacao` DROP FOREIGN KEY `TipoOperacao_divida_id_fkey`;

-- DropTable
DROP TABLE `_alienacaofiduciariatotipooperacao`;

-- DropTable
DROP TABLE `_avaltotipooperacao`;

-- DropTable
DROP TABLE `_cartadecreditototipooperacao`;

-- DropTable
DROP TABLE `_chequetotipooperacao`;

-- DropTable
DROP TABLE `_duplicatatotipooperacao`;

-- DropTable
DROP TABLE `_fiancatotipooperacao`;

-- DropTable
DROP TABLE `_hipotecatotipooperacao`;

-- DropTable
DROP TABLE `_penhortotipooperacao`;

-- DropTable
DROP TABLE `_segurogarantiatotipooperacao`;

-- DropTable
DROP TABLE `tipooperacao`;

-- CreateTable
CREATE TABLE `TiposOperacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `divida_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_HipotecaToTiposOperacoes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_HipotecaToTiposOperacoes_AB_unique`(`A`, `B`),
    INDEX `_HipotecaToTiposOperacoes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AlienacaoFiduciariaToTiposOperacoes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AlienacaoFiduciariaToTiposOperacoes_AB_unique`(`A`, `B`),
    INDEX `_AlienacaoFiduciariaToTiposOperacoes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PenhorToTiposOperacoes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PenhorToTiposOperacoes_AB_unique`(`A`, `B`),
    INDEX `_PenhorToTiposOperacoes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AvalToTiposOperacoes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AvalToTiposOperacoes_AB_unique`(`A`, `B`),
    INDEX `_AvalToTiposOperacoes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FiancaToTiposOperacoes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FiancaToTiposOperacoes_AB_unique`(`A`, `B`),
    INDEX `_FiancaToTiposOperacoes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SeguroGarantiaToTiposOperacoes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SeguroGarantiaToTiposOperacoes_AB_unique`(`A`, `B`),
    INDEX `_SeguroGarantiaToTiposOperacoes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CartaDeCreditoToTiposOperacoes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CartaDeCreditoToTiposOperacoes_AB_unique`(`A`, `B`),
    INDEX `_CartaDeCreditoToTiposOperacoes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChequeToTiposOperacoes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ChequeToTiposOperacoes_AB_unique`(`A`, `B`),
    INDEX `_ChequeToTiposOperacoes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DuplicataToTiposOperacoes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DuplicataToTiposOperacoes_AB_unique`(`A`, `B`),
    INDEX `_DuplicataToTiposOperacoes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TiposOperacoes` ADD CONSTRAINT `TiposOperacoes_divida_id_fkey` FOREIGN KEY (`divida_id`) REFERENCES `Dividas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HipotecaToTiposOperacoes` ADD CONSTRAINT `_HipotecaToTiposOperacoes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Hipoteca`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HipotecaToTiposOperacoes` ADD CONSTRAINT `_HipotecaToTiposOperacoes_B_fkey` FOREIGN KEY (`B`) REFERENCES `TiposOperacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AlienacaoFiduciariaToTiposOperacoes` ADD CONSTRAINT `_AlienacaoFiduciariaToTiposOperacoes_A_fkey` FOREIGN KEY (`A`) REFERENCES `AlienacaoFiduciaria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AlienacaoFiduciariaToTiposOperacoes` ADD CONSTRAINT `_AlienacaoFiduciariaToTiposOperacoes_B_fkey` FOREIGN KEY (`B`) REFERENCES `TiposOperacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PenhorToTiposOperacoes` ADD CONSTRAINT `_PenhorToTiposOperacoes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Penhor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PenhorToTiposOperacoes` ADD CONSTRAINT `_PenhorToTiposOperacoes_B_fkey` FOREIGN KEY (`B`) REFERENCES `TiposOperacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AvalToTiposOperacoes` ADD CONSTRAINT `_AvalToTiposOperacoes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Aval`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AvalToTiposOperacoes` ADD CONSTRAINT `_AvalToTiposOperacoes_B_fkey` FOREIGN KEY (`B`) REFERENCES `TiposOperacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FiancaToTiposOperacoes` ADD CONSTRAINT `_FiancaToTiposOperacoes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Fianca`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FiancaToTiposOperacoes` ADD CONSTRAINT `_FiancaToTiposOperacoes_B_fkey` FOREIGN KEY (`B`) REFERENCES `TiposOperacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SeguroGarantiaToTiposOperacoes` ADD CONSTRAINT `_SeguroGarantiaToTiposOperacoes_A_fkey` FOREIGN KEY (`A`) REFERENCES `SeguroGarantia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SeguroGarantiaToTiposOperacoes` ADD CONSTRAINT `_SeguroGarantiaToTiposOperacoes_B_fkey` FOREIGN KEY (`B`) REFERENCES `TiposOperacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartaDeCreditoToTiposOperacoes` ADD CONSTRAINT `_CartaDeCreditoToTiposOperacoes_A_fkey` FOREIGN KEY (`A`) REFERENCES `CartaDeCredito`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartaDeCreditoToTiposOperacoes` ADD CONSTRAINT `_CartaDeCreditoToTiposOperacoes_B_fkey` FOREIGN KEY (`B`) REFERENCES `TiposOperacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChequeToTiposOperacoes` ADD CONSTRAINT `_ChequeToTiposOperacoes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cheque`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChequeToTiposOperacoes` ADD CONSTRAINT `_ChequeToTiposOperacoes_B_fkey` FOREIGN KEY (`B`) REFERENCES `TiposOperacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DuplicataToTiposOperacoes` ADD CONSTRAINT `_DuplicataToTiposOperacoes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Duplicata`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DuplicataToTiposOperacoes` ADD CONSTRAINT `_DuplicataToTiposOperacoes_B_fkey` FOREIGN KEY (`B`) REFERENCES `TiposOperacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
