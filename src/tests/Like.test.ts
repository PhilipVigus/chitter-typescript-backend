import Peep from "../model/Peep";
import User from "../model/User";
import Like from "../model/Like";
import PGConnection from "../model/PGConnection";

describe("Like", () => {
  beforeEach(async () => {
    await PGConnection.open();
  });

  afterEach(async () => {
    await PGConnection.query(
      "DELETE FROM likes; DELETE FROM comments; DELETE FROM peeps; DELETE FROM users;"
    );
    await PGConnection.close();
  });

  describe("create", () => {
    it("returns the created like", async () => {
      const user = await User.create("bob", "12345678");
      const peep = await Peep.create(user?.id as number, "Peep text");
      const like = await Like.create(user?.id as number, peep?.id as number);

      expect(like?.userId).toEqual(user?.id);
      expect(like?.peepId).toEqual(peep?.id);
      expect(like?.username).toEqual("bob");
    });

    it("returns null if the peep already has a like from the user", async () => {
      const user = await User.create("bob", "12345678");
      const peep = await Peep.create(user?.id as number, "Peep text");
      await Like.create(user?.id as number, peep?.id as number);
      const like = await Like.create(user?.id as number, peep?.id as number);

      expect(like).toBeNull();
    });
  });

  describe("allFromPeep", () => {
    it("returns all likes from the specified peep id", async () => {
      const bob = await User.create("bob", "12345678");
      const steve = await User.create("steve", "12345678");
      const peep = await Peep.create(bob?.id as number, "Peep text");
      await Like.create(bob?.id as number, peep?.id as number);
      await Like.create(steve?.id as number, peep?.id as number);

      const likes = await Like.allFromPeep(peep.id);

      expect(likes.length).toBe(2);
      expect(likes[0].username).toBe("bob");
      expect(likes[1].username).toBe("steve");
    });
  });
});
