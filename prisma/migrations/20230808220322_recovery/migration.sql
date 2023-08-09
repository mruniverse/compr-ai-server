/*
  Warnings:

  - You are about to drop the `_rolestousers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role_id` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_rolestousers` DROP FOREIGN KEY `_RolesToUsers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_rolestousers` DROP FOREIGN KEY `_RolesToUsers_B_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role_id` INTEGER NOT NULL,
    MODIFY `active` BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE `_rolestousers`;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
