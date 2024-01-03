-- CreateTable
CREATE TABLE "Stages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "paperTargets" INTEGER NOT NULL,
    "noShoots" INTEGER NOT NULL,
    "popperTargets" INTEGER NOT NULL
);
