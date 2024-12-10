CREATE TABLE IF NOT EXISTS "records" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "records_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" text NOT NULL,
	"topic" text NOT NULL,
	"employment_id" integer,
	"situation" text NOT NULL,
	"task" text NOT NULL,
	"action" text NOT NULL,
	"result" text NOT NULL,
	"created_at" date DEFAULT now(),
	"updated_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employment" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "employment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" text NOT NULL,
	"companyName" text NOT NULL,
	"position" text NOT NULL,
	"started" date DEFAULT now(),
	"ended" date DEFAULT now(),
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "records" ADD CONSTRAINT "records_employment_id_employment_id_fk" FOREIGN KEY ("employment_id") REFERENCES "public"."employment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "records_user_id_index" ON "records" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employment_user_id_index" ON "employment" USING btree ("user_id");