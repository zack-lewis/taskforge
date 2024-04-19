/*
  Warnings:

  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `note` table without a default value. This is not possible if the table is not empty.
  - Made the column `data` on table `note` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "session";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "data" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    CONSTRAINT "note_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_note" ("data", "id", "taskId", "timestamp", "userId") SELECT "data", "id", "taskId", "timestamp", "userId" FROM "note";
DROP TABLE "note";
ALTER TABLE "new_note" RENAME TO "note";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
