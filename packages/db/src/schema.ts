import * as p from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * Employments DB schema
 */
export const employments = p.pgTable(
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

/**
 * Records DB schema
 */
export const records = p.pgTable(
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
    employmentId: p.integer("employment_id").references(() => employments.id),
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

export const recordsRelations = relations(records, ({ one }) => ({
  employment: one(employments, {
    fields: [records.employmentId],
    references: [employments.id],
  }),
}));

export const employmentRelations = relations(employments, ({ many }) => ({
  records: many(records),
}));
