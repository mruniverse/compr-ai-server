/*
  Warnings:

  - You are about to drop the column `indice_id` on the `dividas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `dividas` DROP FOREIGN KEY `Dividas_indice_id_fkey`;

-- AlterTable
ALTER TABLE `dividas` DROP COLUMN `indice_id`;

-- CreateTable
CREATE TABLE `_DividasToIndices` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DividasToIndices_AB_unique`(`A`, `B`),
    INDEX `_DividasToIndices_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_DividasToIndices` ADD CONSTRAINT `_DividasToIndices_A_fkey` FOREIGN KEY (`A`) REFERENCES `Dividas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DividasToIndices` ADD CONSTRAINT `_DividasToIndices_B_fkey` FOREIGN KEY (`B`) REFERENCES `Indices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
