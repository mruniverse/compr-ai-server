-- AlterTable
ALTER TABLE `dividas` ADD COLUMN `data_vencimento` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `TipoOperacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `divida_id` INTEGER NOT NULL,
    `emitente_operacao_id` INTEGER NOT NULL,
    `favorecido_operacao_id` INTEGER NOT NULL,
    `operacao_alinea_devolucao` INTEGER NOT NULL,
    `valor_nominal` DOUBLE NOT NULL,
    `nome_operacao` VARCHAR(191) NOT NULL,
    `numero_operacao` VARCHAR(191) NOT NULL,
    `banco_emissor` VARCHAR(191) NOT NULL,
    `praca_pagamento` VARCHAR(191) NOT NULL,
    `operacao_arquivo` LONGBLOB NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ParcelaDivida` (
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

-- CreateTable
CREATE TABLE `StatusParcela` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TipoOperacao` ADD CONSTRAINT `TipoOperacao_divida_id_fkey` FOREIGN KEY (`divida_id`) REFERENCES `Dividas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipoOperacao` ADD CONSTRAINT `TipoOperacao_emitente_operacao_id_fkey` FOREIGN KEY (`emitente_operacao_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipoOperacao` ADD CONSTRAINT `TipoOperacao_favorecido_operacao_id_fkey` FOREIGN KEY (`favorecido_operacao_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParcelaDivida` ADD CONSTRAINT `ParcelaDivida_divida_id_fkey` FOREIGN KEY (`divida_id`) REFERENCES `Dividas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParcelaDivida` ADD CONSTRAINT `ParcelaDivida_status_fkey` FOREIGN KEY (`status`) REFERENCES `StatusParcela`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
