/*
  Warnings:

  - You are about to drop the column `nameId` on the `task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT,
    "userId" TEXT,
    "teamId" TEXT,
    "name" TEXT,
    "description" TEXT,
    "due_date" DATETIME,
    "started_date" DATETIME,
    "completed_date" DATETIME,
    CONSTRAINT "task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "task_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_task" ("completed_date", "description", "due_date", "id", "projectId", "started_date", "teamId", "userId") SELECT "completed_date", "description", "due_date", "id", "projectId", "started_date", "teamId", "userId" FROM "task";
DROP TABLE "task";
ALTER TABLE "new_task" RENAME TO "task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
