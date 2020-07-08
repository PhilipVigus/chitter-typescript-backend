import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Client } from "ts-postgres";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: 5 });
});

app.get("/peeps", (req, res) => {
  res.json({
    peeps: [
      { text: "First peep", timeCreated: 1594030856065 },
      { text: "Second peep", timeCreated: 1494030856065 }
    ]
  });
});

const dbTest = async () => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "phil",
    password: process.env.DB_PASSWORD,
    database: "chitter_test"
  });

  try {
    await client.connect();
  } catch (e) {
    console.log(e.message);
  }

  try {
    await client.query(
      "CREATE TABLE test_table (id serial PRIMARY KEY, username VARCHAR (50) UNIQUE NOT NULL);"
    );
  } catch (e) {
    console.log(e.message);
  } finally {
    await client.end();
  }
};

dbTest();

export default app;
