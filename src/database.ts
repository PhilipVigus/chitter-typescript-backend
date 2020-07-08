import { Client, ResultIterator } from "ts-postgres";
import dotenv from "dotenv";

dotenv.config();

class Database {
  private static client: Client;

  public static init(): void {
    let dbName: string;
    if (process.env.NODE_ENV === "test") {
      dbName = "chitter_test";
    } else {
      dbName = "chitter_dev";
    }
    Database.client = new Client({
      host: "localhost",
      port: 5432,
      user: "phil",
      password: process.env.DB_PASSWORD,
      database: dbName
    });
  }

  public static async connect(): Promise<void> {
    try {
      await Database.client.connect();
    } catch (e) {
      console.log(e.message);
    }

    console.log("connected");
  }

  public static async disconnect(): Promise<void> {
    try {
      await Database.client.end();
      console.log("disconnected");
    } catch (e) {
      console.log(e.message);
    }
  }

  public static async query(
    queryString: string
  ): Promise<ResultIterator | undefined> {
    let result;
    console.log("running query");
    try {
      result = await Database.client.query(queryString);
      console.log("ran query");
    } catch (e) {
      console.log(e.message);
    }

    return result;
  }
}

export default Database;
