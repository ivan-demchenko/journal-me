import type { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as p from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const employmentTable = p.pgTable(
  "employment",
  {
    id: p.integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: p.text("user_id").notNull(),
    companyName: p.text("companyName").notNull(),
    position: p.text("position").notNull(),
    started: p.date("started").notNull(),
    ended: p.date("ended"),
    created_at: p.date("created_at").defaultNow(),
    updated_at: p.date("updated_at").defaultNow(),
  },
  (table) => {
    return {
      userIdIndex: p.index().on(table.userId),
    };
  },
);

export const recordsTable = p.pgTable(
  "records",
  {
    id: p.integer().primaryKey().generatedAlwaysAsIdentity(),
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
    employmentId: p
      .integer("employment_id")
      .references(() => employmentTable.id),
    situation: p.text("situation").notNull(),
    task: p.text("task").notNull(),
    action: p.text("action").notNull(),
    result: p.text("result").notNull(),
    created_at: p.date().defaultNow(),
    updated_at: p.date().defaultNow(),
  },
  (table) => {
    return {
      userIdIndex: p.index().on(table.userId),
    };
  },
);

export const recordsEmploymentRel = relations(employmentTable, ({ many }) => ({
  records: many(recordsTable),
}));

// Schema for validating API requests
export const insertRecordSchema = createInsertSchema(recordsTable);
export type InsertRecordType = z.infer<typeof insertRecordSchema>;

// Schema for validating API responses
export const selectRecordSchema = createSelectSchema(recordsTable);
export type SelectRecordType = z.infer<typeof selectRecordSchema>;

// ---
export const newRecordSchema = insertRecordSchema.omit({
  id: true,
  userId: true,
  created_at: true,
  updated_at: true,
});
export type NewRecordType = z.infer<typeof newRecordSchema>;

// API -> DB level
export const insertEmploymentSchema = createInsertSchema(employmentTable);
export const selectEmploymentSchema = createSelectSchema(employmentTable);

export type InsertEmploymentType = z.infer<typeof insertEmploymentSchema>;
export type SelectEmploymentType = z.infer<typeof selectEmploymentSchema>;

// Client -> API level
export const newEmploymentSchema = insertEmploymentSchema.omit({
  id: true,
  userId: true,
  created_at: true,
  updated_at: true,
});
export type NewEmploymentType = z.infer<typeof newEmploymentSchema>;
