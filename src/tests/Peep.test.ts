import Peep from "../model/Peep";
import User from "../model/User";
import Comment from "../model/Comment";
import Like from "../model/Like";
import PGConnection from "../model/PGConnection";

describe("Peep", () => {
  beforeEach(async () => {
    await PGConnection.open();
  });

  afterEach(async () => {
    await PGConnection.query(
      "DELETE FROM likes; DELETE FROM comments; DELETE FROM peeps; DELETE FROM users;"
    );
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
      await Comment.create(
        user?.id as number,
        peep?.id as number,
        "Comment text"
      );
      await Like.create(user?.id as number, peep?.id as number);

      const completedPeep = await Peep.findById(peep?.id);
      expect(completedPeep?.userId).toEqual(user?.id);
      expect(completedPeep?.text).toEqual("Peep text");
      expect(completedPeep?.username).toEqual("bob");
      expect(completedPeep?.comments.length).toEqual(1);
      expect(completedPeep?.comments[0].text).toEqual("Comment text");
      expect(completedPeep?.likes.length).toEqual(1);
      expect(completedPeep?.likes[0].username).toEqual("bob");
    });

    it("stores the peep in the database", async () => {
      const user = await User.create("bob", "12345678");
      await Peep.create(user?.id as number, "Peep text");
      const result = await PGConnection.query("SELECT * FROM peeps;");

      expect(result.rowCount).toEqual(1);
    });
  });

  describe("findById", () => {
    it("returns the peep with the given id", async () => {
      const user = await User.create("bob", "12345678");
      const peep = await Peep.create(user?.id as number, "Peep text");
      const foundPeep = await Peep.findById(peep.id);

      expect(foundPeep?.username).toEqual("bob");
      expect(foundPeep?.text).toEqual("Peep text");
    });

    it("returns null if the id doesnt exist", async () => {
      const user = await User.create("bob", "12345678");
      const peep = await Peep.create(user?.id as number, "Peep text");
      const foundPeep = await Peep.findById(peep.id + 1);

      expect(foundPeep).toBeNull();
    });
  });
});
