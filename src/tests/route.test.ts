import request from "supertest";
import app from "../server";

describe("Endpoints", () => {
  it("gets the test endpoint", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(5);
  });
});
