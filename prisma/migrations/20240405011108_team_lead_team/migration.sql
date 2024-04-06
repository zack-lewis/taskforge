/*
  Warnings:

  - You are about to drop the column `team_lead` on the `user` table. All the data in the column will be lost.
  - Made the column `full_name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "leadId" TEXT,
    CONSTRAINT "team_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_team" ("id", "leadId", "name") SELECT "id", "leadId", "name" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "teamId" TEXT,
    "github_login" TEXT,
    "google_login" TEXT,
    CONSTRAINT "user_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("email", "full_name", "github_login", "google_login", "id", "teamId", "username") SELECT "email", "full_name", "github_login", "google_login", "id", "teamId", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
