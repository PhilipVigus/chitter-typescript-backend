import Peep from "../model/Peep";
import User from "../model/User";
import Comment from "../model/Comment";
import PGConnection from "../model/PGConnection";

describe("Comment", () => {
  beforeEach(async () => {
    await PGConnection.open();
  });

  afterEach(async () => {
    await PGConnection.query("TRUNCATE peeps, users, comments;");
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
});
