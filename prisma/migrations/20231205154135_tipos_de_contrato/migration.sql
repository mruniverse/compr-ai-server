-- AlterTable
ALTER TABLE `dividas` ADD COLUMN `tipo_contrato_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `TiposContrato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `desconto_max` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `TiposContrato_tipo_key`(`tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dividas` ADD CONSTRAINT `Dividas_tipo_contrato_id_fkey` FOREIGN KEY (`tipo_contrato_id`) REFERENCES `TiposContrato`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
