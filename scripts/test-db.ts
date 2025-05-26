import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { users } from '../src/db/schema';
import { eq } from 'drizzle-orm';

// Initialize the database for testing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlite = new Database(path.join(__dirname, '../../local.db'));
const db = drizzle(sqlite, { schema: { users } });

// Create tables if they don't exist
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
  );
`);

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Insert a test user
    console.log('Inserting test user...');
    const [newUser] = await db
      .insert(users)
      .values({
        name: 'Test User',
        email: 'test@example.com',
      })
      .returning();
    
    console.log('Inserted user:', newUser);
    
    // Query all users
    console.log('Fetching all users...');
    const allUsers = await db.select().from(users).all();
    console.log('All users:', allUsers);
    
    // Query the specific user we just inserted
    if (newUser && newUser.id) {
      console.log('Fetching the newly created user...');
      const [user] = await db.select().from(users).where(eq(users.id, newUser.id)).all();
      console.log('Found user:', user);
    }
    
    console.log('Database test completed successfully!');
  } catch (error) {
    console.error('Database test failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

testDatabase();
