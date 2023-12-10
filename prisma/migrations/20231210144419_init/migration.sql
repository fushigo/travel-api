-- DropForeignKey
ALTER TABLE `History` DROP FOREIGN KEY `History_cartIdHistory_fkey`;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_cartIdHistory_fkey` FOREIGN KEY (`cartIdHistory`) REFERENCES `Cart`(`cartId`) ON DELETE CASCADE ON UPDATE CASCADE;
