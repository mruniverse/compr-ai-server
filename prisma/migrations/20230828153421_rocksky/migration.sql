/*
  Warnings:

  - Made the column `cep` on table `enderecos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `enderecos` MODIFY `cep` VARCHAR(191) NOT NULL;
