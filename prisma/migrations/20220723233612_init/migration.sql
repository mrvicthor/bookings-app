-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "fault" TEXT NOT NULL,
    "engineerReport" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "itemModel" TEXT NOT NULL,
    "hardwareInstallation" INTEGER NOT NULL,
    "softwareInstallation" INTEGER NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Booking" ("brand", "city", "email", "engineerReport", "fault", "firstName", "hardwareInstallation", "id", "isDone", "item", "itemModel", "lastName", "phone", "postalCode", "softwareInstallation", "street") SELECT "brand", "city", "email", "engineerReport", "fault", "firstName", "hardwareInstallation", "id", coalesce("isDone", false) AS "isDone", "item", "itemModel", "lastName", "phone", "postalCode", "softwareInstallation", "street" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
