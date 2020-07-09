import request from "supertest";
import app from "../src/server";

describe("/peeps endpoint", () => {
  describe("GET", () => {
    it("returns status 200", async () => {
      const res = await request(app).get("/peeps");
      expect(res.status).toBe(200);
    });

    it("gets the peeps", async () => {
      const expectedData = {
        peeps: [
          { text: "First peep", timeCreated: 1594030856065 },
          { text: "Second peep", timeCreated: 1494030856065 }
        ]
      };

      const res = await request(app).get("/peeps");
      expect(res.body).toEqual(expectedData);
    });
  });

  describe("POST", () => {
    it("returns status 200", async () => {
      const res = await request(app)
        .post("/peeps")
        .send({ text: "New peep", timeCreated: 1594030856065 });
      expect(await res.status).toBe(200);
    });
  });
});
