/*
  Warnings:

  - You are about to drop the `statusparcela` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `parcelasdividas` DROP FOREIGN KEY `ParcelasDividas_status_fkey`;

-- DropTable
DROP TABLE `statusparcela`;

-- CreateTable
CREATE TABLE `StatusParcelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ParcelasDividas` ADD CONSTRAINT `ParcelasDividas_status_fkey` FOREIGN KEY (`status`) REFERENCES `StatusParcelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
