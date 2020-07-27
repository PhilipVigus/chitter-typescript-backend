import User from "../model/User";
import PGConnection from "../model/PGConnection";

describe("User", () => {
  beforeEach(async () => {
    await PGConnection.open();
  });

  afterEach(async () => {
    await PGConnection.query("TRUNCATE users, peeps;");
    await PGConnection.close();
  });

  describe("create", () => {
    it("returns the created user", async () => {
      const user = await User.create("Bob", "12345678");
      const result = await PGConnection.query("SELECT * FROM users;");

      expect(result.rowCount).toEqual(1);
      expect(user?.id).toEqual(result.rows[0].id);
      expect(user?.username).toEqual(result.rows[0].username);
    });

    it("returns null if the username is taken", async () => {
      await User.create("Bob", "12345678");
      const user = await User.create("Bob", "09876543");
      const result = await PGConnection.query("SELECT * FROM users;");

      expect(result.rowCount).toEqual(1);
      expect(user).toBeNull();
    });
  });

  describe("findById", () => {
    it("returns the user with the specified id", async () => {
      const user = await User.create("Bob", "12345678");

      expect((await User.findById(user?.id as number))?.username).toEqual(
        "Bob"
      );
    });

    it("returns null if the user is not found", async () => {
      expect(await User.findById(1)).toEqual(null);
    });
  });
});
