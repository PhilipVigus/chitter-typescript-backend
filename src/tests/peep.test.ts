import Peep from "../model/Peep";
import PGConnection from "../model/PGConnection";

describe("Peep", () => {
  beforeEach(async () => {
    await PGConnection.open();
  });

  afterEach(async () => {
    await PGConnection.query("TRUNCATE Peeps;");
    await PGConnection.close();
  });

  describe("all", () => {
    it("gets all peeps from the database", async () => {
      await Peep.create("First peep");
      await Peep.create("Second peep");
      const AllPeeps = await Peep.all();

      expect(AllPeeps.peeps.length).toEqual(2);
      expect(AllPeeps.peeps[0].text).toEqual("First peep");
      expect(AllPeeps.peeps[1].text).toEqual("Second peep");
    });
  });

  describe("create", () => {
    it("returns the created peep", async () => {
      const peep = await Peep.create("Peep text");

      expect(peep.text).toEqual("Peep text");
    });

    it("stores the peep in the database", async () => {
      await Peep.create("Peep text");
      const result = await PGConnection.query("SELECT * FROM Peeps;");

      expect(result.rowCount).toEqual(1);
    });
  });
});
