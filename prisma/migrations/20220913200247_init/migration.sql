/*
  Warnings:

  - Added the required column `serialNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `authorId` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
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
    "serialNumber" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Booking_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("authorId", "brand", "city", "createdAt", "email", "engineerReport", "fault", "firstName", "hardwareInstallation", "id", "isDone", "item", "itemModel", "lastName", "phone", "postalCode", "softwareInstallation", "street") SELECT "authorId", "brand", "city", "createdAt", "email", "engineerReport", "fault", "firstName", "hardwareInstallation", "id", "isDone", "item", "itemModel", "lastName", "phone", "postalCode", "softwareInstallation", "street" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
