import * as Database from 'better-sqlite3';
import { ISQLiteAdapter } from '../lib/utility/db';

export class BetterSQLiteAdapter implements ISQLiteAdapter {
  private db: Database.Database;

  constructor(sqlitePath: string) {
    this.db = new Database(sqlitePath);
    this.initializeTables();
  }

  initializeTables(): void {
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS config (code TEXT NOT NULL, type TEXT NOT NULL, value TEXT, PRIMARY KEY (code, type))',
    );
  }

  get(...params: any[]): any {
    const [code, type] = params;
    const stmt = this.db.prepare(
      'SELECT value FROM config WHERE code = ? AND type = ?',
    );

    const row = stmt.get(code, type);
    const result = row?.value ?? null;

    try {
      return result ? JSON.parse(result) : null;
    } catch (err) {
      console.error('JSON parse error:', err);
      return null;
    }
  }

  close(): void {
    this.db.close();
  }
}
