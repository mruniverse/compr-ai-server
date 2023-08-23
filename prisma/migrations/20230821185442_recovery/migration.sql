/*
  Warnings:

  - You are about to drop the column `roles_id` on the `permissions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `permissions` DROP FOREIGN KEY `Permissions_roles_id_fkey`;

-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `roles_id`;

-- CreateTable
CREATE TABLE `_PermissionsToRoles` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PermissionsToRoles_AB_unique`(`A`, `B`),
    INDEX `_PermissionsToRoles_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PermissionsToRoles` ADD CONSTRAINT `_PermissionsToRoles_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionsToRoles` ADD CONSTRAINT `_PermissionsToRoles_B_fkey` FOREIGN KEY (`B`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
