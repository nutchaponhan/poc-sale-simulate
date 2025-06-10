import * as Database from 'better-sqlite3';

interface ISQLiteAdapter {
  initializeTables(): Promise<void>;
  get(...params: any[]): Promise<any>;
  close(): Promise<void>;
}

export class BetterSQLiteAdapter implements ISQLiteAdapter {
  private db: Database.Database;

  constructor(sqlitePath: string) {
    this.db = new Database(sqlitePath);
    this.initializeTables();
  }

  async initializeTables(): Promise<void> {
    await this.db.exec(
      `CREATE TABLE IF NOT EXISTS plan_product (
        code TEXT NOT NULL,
        category TEXT NOT NULL,
        value TEXT,
        PRIMARY KEY (code, category)
      );`,
    );
    await this.db.exec(
      `CREATE TABLE IF NOT EXISTS rider_product (
        code TEXT NOT NULL,
        category TEXT NOT NULL,
        value TEXT,
        PRIMARY KEY (code, category)
      );`,
    );
  }

  async get(sql: string, params: any[]): Promise<any> {
    const stmt = await this.db.prepare(sql);
    const row = stmt.get(...params);
    try {
      return row;
    } catch (err) {
      console.error('JSON parse error:', err);
      return null;
    }
  }

  async close(): Promise<void> {
    await this.db.close();
  }
}

export class DB {
  private static instance: DB | null = null;
  private dbAdapter: ISQLiteAdapter;

  private constructor(dbAdapter: ISQLiteAdapter) {
    this.dbAdapter = dbAdapter;
  }

  static getInstance(adapter?: ISQLiteAdapter): DB {
    if (!DB.instance) {
      if (adapter) {
        DB.instance = new DB(adapter);
      } else {
        throw new Error('Adapter is required');
      }
    }
    return DB.instance;
  }

  async initializeTables(): Promise<void> {
    await this.dbAdapter.initializeTables();
  }

  async get<T>(...params: any[]): Promise<T> {
    return this.dbAdapter.get(...params);
  }

  async close(): Promise<void> {
    return this.dbAdapter.close();
  }
}
