
import { sql } from "drizzle-orm";
import { pgTable, text, uuid,timestamp } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id ),
  name: text("name").notNull(),
  description: text("description").notNull(),
  keywords: text("keywords").array().notNull(),
  priority: text("priority").notNull(),
  usecases: text("usecases").array().notNull(),
  role: text("role").notNull(),
  datasources: text("datasources").array().notNull(),
  socials: text("socials").array().notNull(),
  dashboardMetrics: text("dashboardMetrics").array().notNull(),
});


export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

