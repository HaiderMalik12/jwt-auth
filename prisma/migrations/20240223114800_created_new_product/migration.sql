-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT
);
