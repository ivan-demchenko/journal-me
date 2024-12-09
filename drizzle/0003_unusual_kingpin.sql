ALTER TABLE "records" DROP CONSTRAINT "records_employment_id_employment_id_fk";
--> statement-breakpoint
ALTER TABLE "records" DROP COLUMN IF EXISTS "employment_id";