import User from "../model/User";
import PGConnection from "../model/PGConnection";

describe("Peep", () => {
  beforeAll(async () => {
    await PGConnection.open();
  });

  afterEach(async () => {
    await PGConnection.query("TRUNCATE Users;");
  });

  afterAll(async () => {
    await PGConnection.close();
  });

  describe("create", () => {
    it("returns the created user", async () => {
      const user = await User.create("Bob", "12345678");
      const result = await PGConnection.query("SELECT * FROM Users;");

      expect(result.rowCount).toEqual(1);
      expect(user.id).toEqual(result.rows[0].id);
      expect(user.username).toEqual(result.rows[0].username);
    });
  });
});
