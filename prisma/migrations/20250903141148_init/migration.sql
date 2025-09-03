-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL,
    "currency" TEXT DEFAULT 'USD',
    "source" TEXT,
    "platform" TEXT,
    "adUrl" TEXT,
    "supplierUrl" TEXT,
    "metricsJson" JSONB,
    "images" JSONB,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "stageOfAwareness" TEXT,
    "sophistication" INTEGER,
    "massDesire" TEXT,
    "usp" TEXT,
    "angles" JSONB,
    "objections" JSONB,
    "riskReversals" JSONB,
    "score" INTEGER,
    "rationale" TEXT,
    "raw" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Analysis_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_productId_key" ON "Analysis"("productId");
