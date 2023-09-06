-- AlterTable
ALTER TABLE `cheque` MODIFY `data_emissao` DATE NOT NULL,
    MODIFY `data_vencimento` DATE NOT NULL;

-- AlterTable
ALTER TABLE `duplicata` MODIFY `data_emissao` DATE NOT NULL,
    MODIFY `data_vencimento` DATE NOT NULL;
