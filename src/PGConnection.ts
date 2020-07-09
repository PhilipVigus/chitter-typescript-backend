import { Pool, PoolClient, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

class PGConnection {
  private static pool: Pool;

  public static open(): void {
    let dbName: string;
    if (process.env.NODE_ENV === "test") {
      dbName = "chitter_test";
    } else {
      dbName = "chitter_dev";
    }

    PGConnection.pool = new Pool({
      host: "localhost",
      port: 5432,
      user: "phil",
      password: process.env.DB_PASSWORD,
      database: dbName
    });
  }

  public static async query(queryString: string): Promise<QueryResult<never>> {
    return PGConnection.pool.query(queryString);
  }

  public static async close(): Promise<void> {
    await PGConnection.pool.end();
  }
}

export default PGConnection;
