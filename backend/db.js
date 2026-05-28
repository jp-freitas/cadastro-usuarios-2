import Database from 'better-sqlite3';

export const db = new Database ("banco.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users(
  id_users INTERGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  passaword_hash TEXT NOTT NULL 
  )
  `);