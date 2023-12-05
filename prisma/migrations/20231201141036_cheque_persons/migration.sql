-- DropForeignKey
ALTER TABLE `cheque` DROP FOREIGN KEY `Cheque_beneficiario_id_fkey`;

-- DropForeignKey
ALTER TABLE `cheque` DROP FOREIGN KEY `Cheque_emitente_cheque_id_fkey`;

-- AlterTable
ALTER TABLE `cheque` MODIFY `emitente_cheque_id` VARCHAR(191) NOT NULL,
    MODIFY `beneficiario_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `licenses` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `parcelasoperacao` MODIFY `ultima_atualizacao` DATETIME(3) NULL,
    MODIFY `data_vencimento` DATETIME(3) NULL;
