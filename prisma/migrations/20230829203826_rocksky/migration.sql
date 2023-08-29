-- AlterTable
ALTER TABLE `divida` MODIFY `tipo_garantia` INTEGER NULL,
    MODIFY `modo_constituicao_mora` INTEGER NULL,
    MODIFY `status` INTEGER NULL,
    MODIFY `multa` DOUBLE NULL,
    MODIFY `mora` DOUBLE NULL,
    MODIFY `valor_total_inicial` DOUBLE NULL,
    MODIFY `observacoes` VARCHAR(191) NULL,
    MODIFY `data_contratacao` DATETIME(3) NULL,
    MODIFY `data_pagamento` DATETIME(3) NULL,
    MODIFY `data_prescricao` DATETIME(3) NULL,
    MODIFY `data_constituicao_mora` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `persons` ADD COLUMN `score` INTEGER NULL;
