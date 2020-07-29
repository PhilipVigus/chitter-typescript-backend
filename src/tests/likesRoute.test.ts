import request from "supertest";
import PGConnection from "../model/PGConnection";
import Peep from "../model/Peep";
import User from "../model/User";
import App from "../App";
import Like from "../model/Like";

describe("/peeps/:id/likes endpoint", () => {
  let app: App;

  beforeEach(() => {
    app = new App();
    app.start();
  });

  afterEach(async () => {
    await PGConnection.query(
      "DELETE FROM likes; DELETE FROM comments; DELETE FROM peeps; DELETE FROM users;"
    );
    await app.stop();
  });

  describe("POST /peeps/:id/likes", () => {
    it("returns status 200", async () => {
      const user = await User.create("bob", "12345678");
      const peep = await Peep.create(user?.id as number, "a peep");
      const res = await request(app.server)
        .post(`/peeps/${peep?.id}/likes`)
        .send({
          userId: user?.id as number
        });
      expect(res.status).toBe(200);
    });

    it("stores the like in the database", async () => {
      const user = await User.create("bob", "12345678");
      const peep = await Peep.create(user?.id as number, "a peep");
      const res = await request(app.server)
        .post(`/peeps/${peep?.id}/likes`)
        .send({
          userId: user?.id as number
        });

      const result = await PGConnection.query("SELECT * FROM likes;");
      expect(result.rowCount).toEqual(1);
      expect(result.rows[0].user_id).toEqual(user?.id);
    });
  });

  describe("DELETE /peeps/:peepId/likes/:userId", () => {
    it("returns status 200", async () => {
      const user = await User.create("bob", "12345678");
      const peep = await Peep.create(user?.id, "a peep");
      await Like.create(user?.id, peep?.id);

      const res = await request(app.server)
        .delete(`/peeps/${peep?.id}/likes/${user?.id}`)
        .send();

      //expect(res.status).toBe(200);
    });
  });
});
