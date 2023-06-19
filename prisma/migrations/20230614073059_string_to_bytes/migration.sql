/*
  Warnings:

  - Changed the type of `contractAddress` on the `Organization` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "contractAddress",
ADD COLUMN     "contractAddress" BYTEA NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_contractAddress_key" ON "Organization"("contractAddress");
