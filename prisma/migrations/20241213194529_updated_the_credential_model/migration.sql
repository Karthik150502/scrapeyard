/*
  Warnings:

  - You are about to drop the `Credentials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Credentials";

-- CreateTable
CREATE TABLE "Credential" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credential_userId_name_key" ON "Credential"("userId", "name");
