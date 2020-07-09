import Peep from "../src/model/Peep";
import PGConnection from "../src/model/PGConnection";

describe("Peep", () => {
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

      PGConnection.open();
      await PGConnection.query("TRUNCATE Peeps;");
      PGConnection.close();
    });

    it("stores the peep in the database", async () => {
      const peep = await Peep.create("Peep text");

      PGConnection.open();
      const result = await PGConnection.query("SELECT * FROM Peeps;");
      await PGConnection.query("TRUNCATE Peeps;");
      PGConnection.close();

      expect(result.rowCount).toEqual(1);
    });
  });
});
