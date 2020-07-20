import request from "supertest";
import app from "../server";
import PGConnection from "../model/PGConnection";

describe("/users endpoint", () => {
  afterEach(async () => {
    await PGConnection.query("TRUNCATE Users;");
  });

  afterAll(async () => {
    await PGConnection.close();
  });

  describe("POST", () => {
    it("returns status 200", async () => {
      const res = await request(app)
        .post("/users")
        .send({ username: "bob", password: "12345678" });
      expect(res.status).toBe(200);
    });

    it("returns the user id and name", async () => {
      const res = await request(app)
        .post("/users")
        .send({ username: "bob", password: "12345678" });
      expect(res.body.username).toEqual("bob");
    });
  });
});
