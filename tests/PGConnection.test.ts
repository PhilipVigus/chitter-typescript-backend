import PGConnection from "../src/PGConnection";

describe("PGConnection", () => {
  describe("query", () => {
    it("queries the database database", async () => {
      PGConnection.open();
      await PGConnection.query(
        "CREATE TABLE test_table(id serial PRIMARY KEY, username VARCHAR (50));"
      );

      await expect(await PGConnection.query("SELECT * FROM test_table;")).not
        .toThrow;

      await PGConnection.query("DROP TABLE test_table;");
      await PGConnection.close();
    });
  });
});
