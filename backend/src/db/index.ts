import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'postgresql://admin:password123@postgres:5432/saas_planner';

const pool = new Pool({
  connectionString,
  ssl: false,
});

export const db = drizzle(pool, { schema });

export * from './schema';