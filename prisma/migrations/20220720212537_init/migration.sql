-- CreateTable
CREATE TABLE "Booking" (
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
    "isDone" BOOLEAN DEFAULT false
);
