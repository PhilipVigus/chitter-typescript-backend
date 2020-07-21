import request from "supertest";
import app from "../server";

describe("/sessions endpoint", () => {
  describe("POST", () => {
    it("returns status 200", async () => {
      const res = await request(app)
        .post("/sessions")
        .send({ username: "bob", password: "12345678" });
      expect(res.status).toBe(200);
    });
  });
});
