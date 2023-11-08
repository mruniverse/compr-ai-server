-- DropForeignKey
ALTER TABLE `enderecos` DROP FOREIGN KEY `Enderecos_person_id_fkey`;

-- AddForeignKey
ALTER TABLE `Enderecos` ADD CONSTRAINT `Enderecos_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `Persons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
