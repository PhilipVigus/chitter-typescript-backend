import request from "supertest";
import App from "../App";
import User from "../model/User";
import PGConnection from "../model/PGConnection";

describe("/sessions endpoint", () => {
  let app: App;

  beforeEach(() => {
    app = new App();
    app.start();
  });

  afterEach(async () => {
    await PGConnection.query("TRUNCATE Users;");
    await app.stop();
  });

  describe("POST", () => {
    it("returns status 200", async () => {
      await User.create("bob", "12345678");
      const res = await request(app.server)
        .post("/sessions")
        .send({ username: "bob", password: "12345678" });

      expect(res.status).toBe(200);
    });

    it("returns the username and id", async () => {
      await User.create("bob", "12345678");
      const res = await request(app.server)
        .post("/sessions")
        .send({ username: "bob", password: "12345678" });

      expect(res.body).toEqual({ id: 1, username: "bob" });
    });

    it("returns an error if the login fails", async () => {
      const res = await request(app.server)
        .post("/sessions")
        .send({ username: "bob", password: "12345678" });

      expect(res.body).toEqual({ error: "error" });
    });
  });
});
