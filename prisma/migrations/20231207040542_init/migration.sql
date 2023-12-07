-- CreateTable
CREATE TABLE `Products` (
    `id_product` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_product` VARCHAR(191) NOT NULL,
    `harga` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
