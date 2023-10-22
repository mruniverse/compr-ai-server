/*
  Warnings:

  - You are about to drop the column `regua_id` on the `statusfasedividas` table. All the data in the column will be lost.
  - Added the required column `fase_id` to the `StatusFaseDividas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `statusfasedividas` DROP FOREIGN KEY `StatusFaseDividas_regua_id_fkey`;

-- AlterTable
ALTER TABLE `statusfasedividas` DROP COLUMN `regua_id`,
    ADD COLUMN `fase_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `StatusFaseDividas` ADD CONSTRAINT `StatusFaseDividas_fase_id_fkey` FOREIGN KEY (`fase_id`) REFERENCES `FasesRegua`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
