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
    `cpf_cnpj` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ie` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `sexo` VARCHAR(191) NULL,
    `profissao` VARCHAR(191) NULL,
    `nascimento` DATETIME(3) NOT NULL,
    `estado_civil` VARCHAR(191) NULL,
    `regime_de_bens` VARCHAR(191) NULL,
    `casamento` DATETIME(3) NULL,
    `razao_social` VARCHAR(191) NULL,
    `constituicao` DATETIME(3) NULL,
    `renda_mensal` DOUBLE NULL,
    `comprometimento_renda_mensal` DOUBLE NULL,
    `valor_patrimonio` DOUBLE NULL,
    `observacoes` VARCHAR(191) NULL,
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
    `cep` VARCHAR(191) NULL,
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
CREATE TABLE `Divida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `credor_id` INTEGER NOT NULL,
    `devedor_id` INTEGER NOT NULL,
    `tipo_garantia` INTEGER NOT NULL,
    `modo_constituicao_mora` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,
    `multa` DOUBLE NOT NULL,
    `mora` DOUBLE NOT NULL,
    `valor_total_inicial` DOUBLE NOT NULL,
    `observacoes` VARCHAR(191) NOT NULL,
    `data_contratacao` DATETIME(3) NOT NULL,
    `data_pagamento` DATETIME(3) NOT NULL,
    `data_prescricao` DATETIME(3) NOT NULL,
    `data_constituicao_mora` DATETIME(3) NOT NULL,
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
ALTER TABLE `Divida` ADD CONSTRAINT `Divida_credor_id_fkey` FOREIGN KEY (`credor_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Divida` ADD CONSTRAINT `Divida_devedor_id_fkey` FOREIGN KEY (`devedor_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionsToRoles` ADD CONSTRAINT `_PermissionsToRoles_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionsToRoles` ADD CONSTRAINT `_PermissionsToRoles_B_fkey` FOREIGN KEY (`B`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
