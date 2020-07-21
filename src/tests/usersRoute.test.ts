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
      const dbResult = await PGConnection.query("SELECT * FROM Users;");

      expect(res.body.username).toEqual(dbResult.rows[0].username);
      expect(res.body.id).toEqual(dbResult.rows[0].id);
    });

    it("returns  422 if the username is taken", async () => {
      await request(app)
        .post("/users")
        .send({ username: "bob", password: "12345678" });

      const res = await request(app)
        .post("/users")
        .send({ username: "bob", password: "09876543" });

      expect(res.status).toBe(422);
    });

    it("returns an error if the username is taken", async () => {
      await request(app)
        .post("/users")
        .send({ username: "bob", password: "12345678" });

      const res = await request(app)
        .post("/users")
        .send({ username: "bob", password: "09876543" });

      expect(res.body).toEqual({ error: "Username already taken" });
    });
  });
});
