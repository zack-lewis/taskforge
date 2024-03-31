-- CreateTable
CREATE TABLE "authorization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamId" TEXT,
    "userId" TEXT,
    "projectId" TEXT,
    "roleId" TEXT,
    CONSTRAINT "authorization_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "authorization_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "authorization_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "authorization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "data" TEXT,
    CONSTRAINT "note_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "primary_teamId" TEXT,
    CONSTRAINT "project_primary_teamId_fkey" FOREIGN KEY ("primary_teamId") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "view" BOOLEAN NOT NULL DEFAULT false,
    "edit" BOOLEAN NOT NULL DEFAULT false,
    "assign_team" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT,
    "userId" TEXT,
    "teamId" TEXT,
    "nameId" TEXT,
    "description" TEXT,
    "due_date" DATETIME,
    "started_date" DATETIME,
    "completed_date" DATETIME,
    CONSTRAINT "task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "task_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "leadId" TEXT
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT,
    "teamId" TEXT,
    "github_login" TEXT,
    "google_login" TEXT,
    "team_lead" BOOLEAN NOT NULL,
    CONSTRAINT "user_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
