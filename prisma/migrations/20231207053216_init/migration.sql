/*
  Warnings:

  - A unique constraint covering the columns `[nama]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Product_nama_key` ON `Product`(`nama`);
