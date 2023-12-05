/*
  Warnings:

  - A unique constraint covering the columns `[divida_id]` on the table `TiposOperacoes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Cheque_beneficiario_id_fkey` ON `cheque`;

-- DropIndex
DROP INDEX `Cheque_emitente_cheque_id_fkey` ON `cheque`;

-- CreateIndex
CREATE UNIQUE INDEX `TiposOperacoes_divida_id_key` ON `TiposOperacoes`(`divida_id`);
