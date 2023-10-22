-- CreateTable
CREATE TABLE `Licenses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `max_users` INTEGER NOT NULL,
    `responsible_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `Licenses_responsible_id_key`(`responsible_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Persons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ramo_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cpf_cnpj` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `score` INTEGER NULL,
    `ie` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `sexo` VARCHAR(191) NULL,
    `profissao` VARCHAR(191) NULL,
    `estado_civil` VARCHAR(191) NULL,
    `regime_de_bens` VARCHAR(191) NULL,
    `razao_social` VARCHAR(191) NULL,
    `observacoes` VARCHAR(191) NULL,
    `renda_mensal` DOUBLE NULL,
    `comprometimento_renda_mensal` DOUBLE NULL,
    `valor_patrimonio` DOUBLE NULL,
    `nascimento` DATETIME(3) NULL,
    `casamento` DATETIME(3) NULL,
    `constituicao` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `Persons_cpf_cnpj_key`(`cpf_cnpj`),
    UNIQUE INDEX `Persons_email_key`(`email`),
    FULLTEXT INDEX `Persons_name_cpf_cnpj_email_idx`(`name`, `cpf_cnpj`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enderecos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` INTEGER NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ramos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `Ramos_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `license_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL DEFAULT 2,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `route` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `Permissions_route_key`(`route`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `Roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dividas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `credor_id` INTEGER NOT NULL,
    `devedor_id` INTEGER NOT NULL,
    `tipo_garantia_id` INTEGER NULL,
    `modo_constituicao_mora` INTEGER NULL,
    `status` INTEGER NULL,
    `multa` DOUBLE NULL,
    `mora` DOUBLE NULL,
    `valor_total_inicial` DOUBLE NULL,
    `observacoes` VARCHAR(191) NULL,
    `data_vencimento` DATETIME(3) NULL,
    `data_contratacao` DATETIME(3) NULL,
    `data_pagamento` DATETIME(3) NULL,
    `data_prescricao` DATETIME(3) NULL,
    `data_constituicao_mora` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Indices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoGarantia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TipoGarantia_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `StatusParcelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TiposOperacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `divida_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `parcela_id` INTEGER NOT NULL,
    `emitente_cheque_id` INTEGER NOT NULL,
    `beneficiario_id` INTEGER NOT NULL,
    `operacao_alinea_devolucao` INTEGER NOT NULL,
    `numero_cheque` INTEGER NOT NULL,
    `banco` INTEGER NOT NULL,
    `agencia` INTEGER NOT NULL,
    `conta` INTEGER NOT NULL,
    `valor_cheque` DOUBLE NOT NULL,
    `data_emissao` DATETIME(3) NOT NULL,
    `data_vencimento` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cheque_parcela_id_key`(`parcela_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Duplicata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parcela_id` INTEGER NOT NULL,
    `emitente_duplicata_id` INTEGER NOT NULL,
    `sacado_id` INTEGER NOT NULL,
    `valor_duplicata` DOUBLE NOT NULL,
    `data_emissao` DATETIME(3) NOT NULL,
    `data_vencimento` DATETIME(3) NOT NULL,
    `detalhes_itens_servicos` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Duplicata_parcela_id_key`(`parcela_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
CREATE TABLE `FasesRegua` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `regua_id` INTEGER NOT NULL,
    `fase` VARCHAR(191) NOT NULL,
    `cron` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NULL,
    `duracao` INTEGER NOT NULL,
    `inicio` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusFaseDividas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `divida_id` INTEGER NOT NULL,
    `fase_id` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `isCronActive` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PermissionsToRoles` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PermissionsToRoles_AB_unique`(`A`, `B`),
    INDEX `_PermissionsToRoles_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DividasToIndices` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DividasToIndices_AB_unique`(`A`, `B`),
    INDEX `_DividasToIndices_B_index`(`B`)
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
ALTER TABLE `Licenses` ADD CONSTRAINT `Licenses_responsible_id_fkey` FOREIGN KEY (`responsible_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Persons` ADD CONSTRAINT `Persons_ramo_id_fkey` FOREIGN KEY (`ramo_id`) REFERENCES `Ramos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enderecos` ADD CONSTRAINT `Enderecos_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_license_id_fkey` FOREIGN KEY (`license_id`) REFERENCES `Licenses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dividas` ADD CONSTRAINT `Dividas_credor_id_fkey` FOREIGN KEY (`credor_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dividas` ADD CONSTRAINT `Dividas_devedor_id_fkey` FOREIGN KEY (`devedor_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dividas` ADD CONSTRAINT `Dividas_tipo_garantia_id_fkey` FOREIGN KEY (`tipo_garantia_id`) REFERENCES `TipoGarantia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParcelasOperacao` ADD CONSTRAINT `ParcelasOperacao_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `StatusParcelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TiposOperacoes` ADD CONSTRAINT `TiposOperacoes_divida_id_fkey` FOREIGN KEY (`divida_id`) REFERENCES `Dividas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `Cheque` ADD CONSTRAINT `Cheque_parcela_id_fkey` FOREIGN KEY (`parcela_id`) REFERENCES `ParcelasOperacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cheque` ADD CONSTRAINT `Cheque_emitente_cheque_id_fkey` FOREIGN KEY (`emitente_cheque_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cheque` ADD CONSTRAINT `Cheque_beneficiario_id_fkey` FOREIGN KEY (`beneficiario_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Duplicata` ADD CONSTRAINT `Duplicata_parcela_id_fkey` FOREIGN KEY (`parcela_id`) REFERENCES `ParcelasOperacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Duplicata` ADD CONSTRAINT `Duplicata_emitente_duplicata_id_fkey` FOREIGN KEY (`emitente_duplicata_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Duplicata` ADD CONSTRAINT `Duplicata_sacado_id_fkey` FOREIGN KEY (`sacado_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reguas` ADD CONSTRAINT `Reguas_license_id_fkey` FOREIGN KEY (`license_id`) REFERENCES `Licenses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FasesRegua` ADD CONSTRAINT `FasesRegua_regua_id_fkey` FOREIGN KEY (`regua_id`) REFERENCES `Reguas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StatusFaseDividas` ADD CONSTRAINT `StatusFaseDividas_divida_id_fkey` FOREIGN KEY (`divida_id`) REFERENCES `Dividas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StatusFaseDividas` ADD CONSTRAINT `StatusFaseDividas_fase_id_fkey` FOREIGN KEY (`fase_id`) REFERENCES `FasesRegua`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionsToRoles` ADD CONSTRAINT `_PermissionsToRoles_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionsToRoles` ADD CONSTRAINT `_PermissionsToRoles_B_fkey` FOREIGN KEY (`B`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DividasToIndices` ADD CONSTRAINT `_DividasToIndices_A_fkey` FOREIGN KEY (`A`) REFERENCES `Dividas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DividasToIndices` ADD CONSTRAINT `_DividasToIndices_B_fkey` FOREIGN KEY (`B`) REFERENCES `Indices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
