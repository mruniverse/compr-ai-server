/*
  Warnings:

  - You are about to drop the column `cron` on the `regua` table. All the data in the column will be lost.
  - You are about to drop the column `duracao` on the `regua` table. All the data in the column will be lost.
  - You are about to drop the column `fase` on the `regua` table. All the data in the column will be lost.
  - You are about to drop the column `inicio` on the `regua` table. All the data in the column will be lost.
  - You are about to drop the column `licenca_id` on the `regua` table. All the data in the column will be lost.
  - You are about to drop the column `mensagem` on the `regua` table. All the data in the column will be lost.
  - Added the required column `license_id` to the `Regua` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `regua` DROP FOREIGN KEY `Regua_licenca_id_fkey`;

-- AlterTable
ALTER TABLE `regua` DROP COLUMN `cron`,
    DROP COLUMN `duracao`,
    DROP COLUMN `fase`,
    DROP COLUMN `inicio`,
    DROP COLUMN `licenca_id`,
    DROP COLUMN `mensagem`,
    ADD COLUMN `license_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `FasesRegua` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `regua_id` INTEGER NULL,
    `fase` VARCHAR(191) NOT NULL,
    `cron` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NULL,
    `duracao` INTEGER NOT NULL,
    `inicio` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Regua` ADD CONSTRAINT `Regua_license_id_fkey` FOREIGN KEY (`license_id`) REFERENCES `Licenses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FasesRegua` ADD CONSTRAINT `FasesRegua_regua_id_fkey` FOREIGN KEY (`regua_id`) REFERENCES `Regua`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
