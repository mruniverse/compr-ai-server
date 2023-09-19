/*
  Warnings:

  - Added the required column `indice_id` to the `Dividas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dividas` ADD COLUMN `indice_id` INTEGER NOT NULL;

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

-- AddForeignKey
ALTER TABLE `Dividas` ADD CONSTRAINT `Dividas_indice_id_fkey` FOREIGN KEY (`indice_id`) REFERENCES `Indices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
