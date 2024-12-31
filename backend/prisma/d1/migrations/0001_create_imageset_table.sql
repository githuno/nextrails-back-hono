-- Migration number: 0001 	 2024-12-30T09:50:53.192Z
-- CreateTable
CREATE TABLE "am_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "dm_image_sets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "ownerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "dm_image_sets_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "am_users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "dm_files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "dm_file_attachments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recordType" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "dm_file_attachments_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "dm_files" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "am_users_email_key" ON "am_users"("email");

-- CreateIndex
CREATE INDEX "dm_image_sets_ownerId_idx" ON "dm_image_sets"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "dm_files_key_key" ON "dm_files"("key");

-- CreateIndex
CREATE INDEX "dm_files_key_idx" ON "dm_files"("key");

-- CreateIndex
CREATE INDEX "dm_file_attachments_fileId_idx" ON "dm_file_attachments"("fileId");

-- CreateIndex
CREATE INDEX "dm_file_attachments_recordType_recordId_idx" ON "dm_file_attachments"("recordType", "recordId");

