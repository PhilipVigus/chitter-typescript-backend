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
    await PGConnection.query("TRUNCATE likes, comments, peeps, users CASCADE;");
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
      const dbData = await PGConnection.query("SELECT * FROM users;");

      const res = await request(app.server)
        .post("/sessions")
        .send({ username: "bob", password: "12345678" });

      expect(res.body).toEqual({
        id: dbData.rows[0].id,
        username: dbData.rows[0].username
      });
    });

    it("returns an error if the username is not found", async () => {
      const res = await request(app.server)
        .post("/sessions")
        .send({ username: "bob", password: "12345678" });

      expect(res.body).toEqual({ error: "Incorrect login details" });
      expect(res.status).toEqual(422);
    });

    it("returns an error if the passoword is incorrect", async () => {
      await User.create("bob", "12345678");

      const res = await request(app.server)
        .post("/sessions")
        .send({ username: "bob", password: "1234567" });

      expect(res.body).toEqual({ error: "Incorrect login details" });
      expect(res.status).toEqual(422);
    });
  });
});
