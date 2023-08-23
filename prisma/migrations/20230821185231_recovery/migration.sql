/*
  Warnings:

  - You are about to drop the `_permissionstousers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_permissionstousers` DROP FOREIGN KEY `_PermissionsToUsers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_permissionstousers` DROP FOREIGN KEY `_PermissionsToUsers_B_fkey`;

-- AlterTable
ALTER TABLE `permissions` ADD COLUMN `roles_id` INTEGER NULL;

-- DropTable
DROP TABLE `_permissionstousers`;

-- AddForeignKey
ALTER TABLE `Permissions` ADD CONSTRAINT `Permissions_roles_id_fkey` FOREIGN KEY (`roles_id`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
