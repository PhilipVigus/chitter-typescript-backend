import Peep from "../src/model/Peep";

describe("Peep", () => {
  describe("all", () => {
    it("gets all peeps from the database", () => {
      expect(Peep.all()).toEqual([
        { text: "First peep", timeCreated: 1594030856065 },
        { text: "Second peep", timeCreated: 1494030856065 }
      ]);
    });
  });
});
