import Peep from "../model/Peep";
import User from "../model/User";
import PGConnection from "../model/PGConnection";

describe("Peep", () => {
  beforeEach(async () => {
    await PGConnection.open();
  });

  afterEach(async () => {
    await PGConnection.query("TRUNCATE peeps, users;");
    await PGConnection.close();
  });

  describe("all", () => {
    it("gets all peeps from the database", async () => {
      const user = await User.create("bob", "12345678");
      await Peep.create(user?.id as number, "First peep");
      await Peep.create(user?.id as number, "Second peep");
      const allPeeps = await Peep.all();

      expect(allPeeps.peeps.length).toEqual(2);
      expect(allPeeps.peeps[0].userId).toEqual(user?.id);
      expect(allPeeps.peeps[0].text).toEqual("First peep");
      expect(allPeeps.peeps[0].username).toEqual("bob");
      expect(allPeeps.peeps[1].userId).toEqual(user?.id);
      expect(allPeeps.peeps[1].text).toEqual("Second peep");
      expect(allPeeps.peeps[1].username).toEqual("bob");
    });
  });

  describe("create", () => {
    it("returns the created peep", async () => {
      const user = await User.create("bob", "12345678");
      const peep = await Peep.create(user?.id as number, "Peep text");

      expect(peep.userId).toEqual(user?.id);
      expect(peep.text).toEqual("Peep text");
      expect(peep.username).toEqual("bob");
    });

    it("stores the peep in the database", async () => {
      const user = await User.create("bob", "12345678");
      await Peep.create(user?.id as number, "Peep text");
      const result = await PGConnection.query("SELECT * FROM peeps;");

      expect(result.rowCount).toEqual(1);
    });
  });
});
