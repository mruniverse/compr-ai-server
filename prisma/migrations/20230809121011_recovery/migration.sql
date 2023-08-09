/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Persons` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Persons_name_key` ON `persons`;

-- CreateIndex
CREATE UNIQUE INDEX `Persons_email_key` ON `Persons`(`email`);
