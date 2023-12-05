-- AlterTable
ALTER TABLE `tiposcontrato` ADD COLUMN `licenca_id` INTEGER NOT NULL DEFAULT 1,
    MODIFY `desconto_max` DOUBLE NULL;

-- AddForeignKey
ALTER TABLE `TiposContrato` ADD CONSTRAINT `TiposContrato_licenca_id_fkey` FOREIGN KEY (`licenca_id`) REFERENCES `Licenses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
