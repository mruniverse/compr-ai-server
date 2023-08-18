-- CreateIndex
CREATE FULLTEXT INDEX `Persons_name_idx` ON `Persons`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `Persons_cpf_cnpj_idx` ON `Persons`(`cpf_cnpj`);
