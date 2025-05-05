'use server';
import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { Pool } from '@neondatabase/serverless';

let sql: NeonQueryFunction<false, false> | null = null;

export async function getDbConnection() {
    if (sql) return sql;
    
    if(!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined in the environment variables.');
    }

    try {
        sql = neon(process.env.DATABASE_URL);
        return sql;
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Failed to connect to database');
    }
}