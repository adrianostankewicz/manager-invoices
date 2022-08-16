/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "mi_users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mi_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mi_companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpnj" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "mi_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyPreferences" (
    "id" TEXT NOT NULL,
    "billing_threshold" DECIMAL(65,30) NOT NULL,
    "notifications_email" BOOLEAN NOT NULL,
    "notifications_sms" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "CompanyPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mi_invoices" (
    "id" TEXT NOT NULL,
    "invoice_number" BIGINT NOT NULL,
    "invoice_value" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "competition_month" INTEGER NOT NULL,
    "receipt_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "mi_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mi_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "mi_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mi_expenses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expense_value" DECIMAL(65,30) NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "competition_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "mi_expenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mi_companies_name_key" ON "mi_companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "mi_companies_cpnj_key" ON "mi_companies"("cpnj");

-- CreateIndex
CREATE UNIQUE INDEX "mi_companies_user_id_key" ON "mi_companies"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPreferences_company_id_key" ON "CompanyPreferences"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "mi_invoices_invoice_number_key" ON "mi_invoices"("invoice_number");

-- CreateIndex
CREATE UNIQUE INDEX "mi_invoices_company_id_key" ON "mi_invoices"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "mi_categories_company_id_key" ON "mi_categories"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "mi_expenses_category_id_key" ON "mi_expenses"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "mi_expenses_company_id_key" ON "mi_expenses"("company_id");

-- AddForeignKey
ALTER TABLE "mi_companies" ADD CONSTRAINT "mi_companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "mi_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPreferences" ADD CONSTRAINT "CompanyPreferences_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "mi_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mi_invoices" ADD CONSTRAINT "mi_invoices_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "mi_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mi_categories" ADD CONSTRAINT "mi_categories_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "mi_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mi_expenses" ADD CONSTRAINT "mi_expenses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "mi_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mi_expenses" ADD CONSTRAINT "mi_expenses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "mi_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
