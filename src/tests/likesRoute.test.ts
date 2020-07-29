import request from "supertest";
import PGConnection from "../model/PGConnection";
import Peep from "../model/Peep";
import User from "../model/User";
import App from "../App";

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
  });
});
