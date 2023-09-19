/*
  Warnings:

  - A unique constraint covering the columns `[parcela_id]` on the table `Cheque` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[parcela_id]` on the table `Duplicata` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Cheque_parcela_id_key` ON `Cheque`(`parcela_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Duplicata_parcela_id_key` ON `Duplicata`(`parcela_id`);
