import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL  || "postgresql://neondb_owner:npg_FSR2sza4MtXg@ep-muddy-frog-ah3idn5a-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"  ,
});

export const db = drizzle(pool);
