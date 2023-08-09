/*
  Warnings:

  - A unique constraint covering the columns `[responsible_id]` on the table `Licenses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Licenses_responsible_id_key` ON `Licenses`(`responsible_id`);
