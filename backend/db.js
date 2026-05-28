import Database from "better-sqlite3";

export const db = new Database("banco.db");

db.exec(`
    create table If Not EXISTS users (
    id_users INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
    )
    `);