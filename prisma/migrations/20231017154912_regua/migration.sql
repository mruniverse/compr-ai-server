-- CreateTable
CREATE TABLE `Regua` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `licenca_id` INTEGER NOT NULL,
    `tipo_regua` VARCHAR(191) NOT NULL DEFAULT 'cobranca',
    `name` VARCHAR(191) NOT NULL,
    `fase` VARCHAR(191) NOT NULL,
    `cron` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `duracao` INTEGER NOT NULL,
    `inicio` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Regua` ADD CONSTRAINT `Regua_licenca_id_fkey` FOREIGN KEY (`licenca_id`) REFERENCES `Licenses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
