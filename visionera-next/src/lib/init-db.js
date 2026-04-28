import client from './db.js';

export async function initDb() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS quotations (
        id TEXT PRIMARY KEY,
        client TEXT NOT NULL,
        project TEXT NOT NULL,
        amount REAL NOT NULL,
        status TEXT NOT NULL,
        date TEXT NOT NULL
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS deals (
        id TEXT PRIMARY KEY,
        client TEXT NOT NULL,
        total REAL NOT NULL,
        advance REAL NOT NULL,
        balance REAL NOT NULL,
        progress INTEGER NOT NULL,
        status TEXT NOT NULL
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        client TEXT NOT NULL,
        progress INTEGER NOT NULL,
        deadline TEXT NOT NULL,
        status TEXT NOT NULL,
        team TEXT NOT NULL -- Store as JSON string
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        client TEXT NOT NULL,
        account TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        mode TEXT NOT NULL
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS expenses (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        mode TEXT NOT NULL
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
