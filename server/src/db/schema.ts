import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as p from "drizzle-orm/pg-core";

export const recordsTable = p.pgTable(
  "records",
  {
    id: p.serial("id").primaryKey(),
    userId: p.text("user_id").notNull(),
    topic: p
      .text("topic", {
        enum: [
          "collaboration-and-teamwork",
          "feedback-and-recognition",
          "goals-and-progress",
          "innovation-and-creativity",
          "key-achievements",
          "leadership-and-mentorship",
          "learning-and-skill-development",
          "mistakes-and-recovery",
          "overcoming-challenges",
          "productivity-and-efficiency",
        ],
      })
      .notNull(),
    situation: p.text("situation").notNull(),
    task: p.text("task").notNull(),
    action: p.text("action").notNull(),
    result: p.text("result").notNull(),
    created_at: p.date().defaultNow(),
  },
  (table) => {
    return {
      userIdIndex: p.index("records-user-id").on(table.userId),
    };
  },
);

// Schema for validating API requests
export const insertRecordSchema = createInsertSchema(recordsTable);

// Schema for validating API responses
export const selectRecordSchema = createSelectSchema(recordsTable);

// ---
export const newRecordSchema = insertRecordSchema.omit({
  userId: true,
  created_at: true,
  id: true,
});
