import request from "supertest";
import app from "../server";
import PGConnection from "../model/PGConnection";

describe("/users endpoint", () => {
  describe("POST", () => {
    it("returns status 200", async () => {
      const res = await request(app)
        .post("/users")
        .send({ username: "bob", password: "12345678" });
      expect(res.status).toBe(200);
    });
  });
});
