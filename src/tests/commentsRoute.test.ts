import request from "supertest";
import PGConnection from "../model/PGConnection";
import Peep from "../model/Peep";
import User from "../model/User";
import App from "../App";

describe("/peeps/:id/comments endpoint", () => {
  let app: App;

  beforeEach(() => {
    app = new App();
    app.start();
  });

  afterEach(async () => {
    await PGConnection.query("TRUNCATE peeps, users, comments;");
    await app.stop();
  });

  describe("POST /peeps/:id/comments", () => {
    it("returns status 200", async () => {
      const user = await User.create("bob", "12345678");
      const peep = await Peep.create(user?.id as number, "a peep");
      const res = await request(app.server)
        .post("/peeps/1/comments")
        .send({
          userId: user?.id as number,
          peepId: peep?.id as number,
          text: "new comment"
        });
      expect(res.status).toBe(200);
    });

    it("stores the comment in the database", async () => {
      const user = await User.create("bob", "12345678");
      const peep = await Peep.create(user?.id as number, "a peep");
      const res = await request(app.server)
        .post("/peeps/1/comments")
        .send({
          userId: user?.id as number,
          peepId: peep?.id as number,
          text: "new comment"
        });

      const result = await PGConnection.query("SELECT * FROM comments;");
      expect(result.rowCount).toEqual(1);
      expect(result.rows[0].text).toEqual("new comment");
    });
  });
});
