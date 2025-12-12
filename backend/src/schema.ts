
import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),

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
