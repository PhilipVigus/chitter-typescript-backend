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
    await PGConnection.query("TRUNCATE peeps, users;");
    await app.stop();
  });

  describe("GET /peeps/:id/comments", () => {
    it("returns status 200", async () => {
      const res = await request(app.server).get("/peeps/1/comments");
      expect(res.status).toBe(200);
    });
  });
});
