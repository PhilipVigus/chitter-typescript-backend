import Database from "../src/database";

describe("database", () => {
  beforeEach(async () => {
    Database.init();
  });

  it("queries the database", async () => {
    await Database.connect();
    await Database.query(
      "CREATE TABLE test_table(id serial PRIMARY KEY, username VARCHAR (50));"
    );

    expect(await Database.query("SELECT * FROM test_table;")).not.toThrow;
    await Database.query("DROP TABLE test_table;");
    await Database.disconnect();
  });

  it("errors if the query is malformed the database", async () => {
    await Database.connect();
    await expect(await Database.query("SELECT * FROM bad_table")).toThrow;
    await Database.disconnect();
  });
});
