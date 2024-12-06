CREATE TABLE IF NOT EXISTS "records" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"topic" text NOT NULL,
	"situation" text NOT NULL,
	"task" text NOT NULL,
	"action" text NOT NULL,
	"result" text NOT NULL,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "records-user-id" ON "records" USING btree ("user_id");