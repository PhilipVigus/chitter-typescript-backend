import Peep from "../src/model/Peep";
import PGConnection from "../src/model/PGConnection";

describe("Peep", () => {
  beforeAll(async () => {
    await PGConnection.open();
  });

  afterEach(async () => {
    await PGConnection.query("TRUNCATE Peeps;");
  });

  afterAll(async () => {
    await PGConnection.close();
  });

  describe("all", () => {
    it("gets all peeps from the database", () => {
      expect(Peep.all()).toEqual([
        { text: "First peep", timeCreated: 1594030856065 },
        { text: "Second peep", timeCreated: 1494030856065 }
      ]);
    });
  });

  describe("create", () => {
    it("returns the created peep", async () => {
      const peep = await Peep.create("Peep text");

      expect(peep.text).toEqual("Peep text");
    });

    it("stores the peep in the database", async () => {
      const peep = await Peep.create("Peep text");
      const result = await PGConnection.query("SELECT * FROM Peeps;");

      expect(result.rowCount).toEqual(1);
    });
  });
});
