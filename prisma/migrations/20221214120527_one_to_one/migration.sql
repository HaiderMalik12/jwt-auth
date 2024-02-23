/*
  Warnings:

  - You are about to drop the column `url` on the `Video` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "VideoDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT,
    "metaData" TEXT,
    "url" TEXT NOT NULL,
    "hostingProvider" TEXT NOT NULL,
    "videoId" INTEGER,
    CONSTRAINT "VideoDetails_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "courseId" INTEGER,
    CONSTRAINT "Video_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("courseId", "desc", "id", "title") SELECT "courseId", "desc", "id", "title" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "VideoDetails_videoId_key" ON "VideoDetails"("videoId");
