import type { Config } from "drizzle-kit";


export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!  || "postgresql://neondb_owner:npg_FSR2sza4MtXg@ep-muddy-frog-ah3idn5a-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
} satisfies Config;
