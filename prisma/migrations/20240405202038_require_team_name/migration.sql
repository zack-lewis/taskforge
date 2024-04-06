/*
  Warnings:

  - Made the column `name` on table `team` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "leadId" TEXT,
    CONSTRAINT "team_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_team" ("id", "leadId", "name") SELECT "id", "leadId", "name" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
