import PGConnection from "../model/PGConnection";

describe("PGConnection", () => {
  describe("query", () => {
    it("queries the database database", async () => {
      PGConnection.open();
      await PGConnection.query(
        "CREATE TABLE test_table(id serial PRIMARY KEY, username VARCHAR (50));"
      );
      await PGConnection.query(
        "INSERT INTO test_table (username) VALUES ('name');"
      );
      const result = await PGConnection.query("SELECT * FROM test_table;");
      await PGConnection.query("DROP TABLE test_table;");
      await PGConnection.close();

      expect(result.rowCount).toEqual(1);
    });
  });
});
