import Database from 'better-sqlite3';
import { DBUser } from '../types/Database';

const db = new Database('auth.db');

// Create users table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Create user_preferences table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS user_preferences (
        username TEXT,
        setting_key TEXT,
        setting_value TEXT,
        PRIMARY KEY (username, setting_key),
        FOREIGN KEY (username) REFERENCES users(username)
    )
`);

export const authDb = {
    getUserByUsername: (username: string) => 
        db.prepare('SELECT * FROM users WHERE username = ?').get(username) as DBUser | undefined,
    
    createUser: (username: string, passwordHash: string) => 
        db.prepare('INSERT OR REPLACE INTO users (username, password_hash) VALUES (?, ?)')
            .run(username, passwordHash),
    
    // Add other user-related queries here
}; 