import Peep from "../model/Peep";
import User from "../model/User";
import Comment from "../model/Comment";
import PGConnection from "../model/PGConnection";

describe("Comment", () => {
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
    it("returns the created comment", async () => {
      const user = await User.create("bob", "12345678");
      const peep = await Peep.create(user?.id as number, "Peep text");
      const comment = await Comment.create(
        user?.id as number,
        peep?.id as number,
        "Comment text"
      );

      expect(comment?.userId).toEqual(user?.id);
      expect(comment?.peepId).toEqual(peep?.id);
      expect(comment?.text).toEqual("Comment text");
      expect(comment?.username).toEqual("bob");
    });
  });

  describe("allFromPeep", () => {
    it("returns all comments with the specified peep id", async () => {
      const user = await User.create("bob", "12345678");
      const firstPeep = await Peep.create(user?.id as number, "Peep text");
      const secondPeep = await Peep.create(user?.id as number, "Peep text");

      await Comment.create(
        user?.id as number,
        firstPeep?.id as number,
        "First comment"
      );

      await Comment.create(
        user?.id as number,
        firstPeep?.id as number,
        "Second comment"
      );

      await Comment.create(
        user?.id as number,
        secondPeep?.id as number,
        "Third comment"
      );

      const comments = await Comment.allFromPeep(firstPeep?.id);

      expect(comments.length).toEqual(2);
      expect(comments[0].text).toEqual("First comment");
      expect(comments[1].text).toEqual("Second comment");
    });
  });
});
