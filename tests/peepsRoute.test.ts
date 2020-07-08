import request from "supertest";
import app from "../src/server";

describe("Endpoints", () => {
  it("gets the test endpoint", async () => {
    const expectedData = {
      peeps: [
        { text: "First peep", timeCreated: 1594030856065 },
        { text: "Second peep", timeCreated: 1594030856065 }
      ]
    };

    const res = await request(app).get("/peeps");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedData);
  });
});
