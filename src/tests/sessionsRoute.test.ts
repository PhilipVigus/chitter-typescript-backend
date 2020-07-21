import request from "supertest";
import app from "../server";
import User from "../model/User";
import PGConnection from "../model/PGConnection";

describe("/sessions endpoint", () => {
  afterEach(async () => {
    await PGConnection.query("TRUNCATE Users;");
  });

  afterAll(async () => {
    await PGConnection.close();
  });

  describe("POST", () => {
    it("returns status 200", async () => {
      User.create("bob", "12345678");
      const res = await request(app)
        .post("/sessions")
        .send({ username: "bob", password: "12345678" });

      expect(res.status).toBe(200);
    });

    it("returns the username and id", async () => {
      User.create("bob", "12345678");
      const res = await request(app)
        .post("/sessions")
        .send({ username: "bob", password: "12345678" });

      expect(res.body).toEqual({ id: 1, username: "bob" });
    });

    it("returns an error if the login fails", async () => {
      const res = await request(app)
        .post("/sessions")
        .send({ username: "bob", password: "12345678" });

      expect(res.body).toEqual({ error: "error" });
    });
  });
});
