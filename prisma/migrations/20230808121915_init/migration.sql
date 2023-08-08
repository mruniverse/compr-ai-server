-- CreateTable
CREATE TABLE `Licencas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pessoasId` INTEGER NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pessoas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_razao` VARCHAR(191) NOT NULL,
    `cpf_cnpj` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `ie` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `zipcode` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `Pessoas_nome_razao_key`(`nome_razao`),
    UNIQUE INDEX `Pessoas_cpf_cnpj_key`(`cpf_cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL,
    `licencasId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Scopes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scope` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `Scopes_scope_key`(`scope`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ScopesToUsers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ScopesToUsers_AB_unique`(`A`, `B`),
    INDEX `_ScopesToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Licencas` ADD CONSTRAINT `Licencas_pessoasId_fkey` FOREIGN KEY (`pessoasId`) REFERENCES `Pessoas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_licencasId_fkey` FOREIGN KEY (`licencasId`) REFERENCES `Licencas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScopesToUsers` ADD CONSTRAINT `_ScopesToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Scopes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScopesToUsers` ADD CONSTRAINT `_ScopesToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
