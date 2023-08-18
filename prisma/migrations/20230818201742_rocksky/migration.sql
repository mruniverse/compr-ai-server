-- DropIndex
DROP INDEX `Persons_cpf_cnpj_idx` ON `persons`;

-- DropIndex
DROP INDEX `Persons_name_idx` ON `persons`;

-- CreateIndex
CREATE FULLTEXT INDEX `Persons_name_cpf_cnpj_email_idx` ON `Persons`(`name`, `cpf_cnpj`, `email`);
