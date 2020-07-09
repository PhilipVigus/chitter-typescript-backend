import request from "supertest";
import app from "../src/server";
import PGConnection from "../src/model/PGConnection";

describe("/peeps endpoint", () => {
  afterEach(async () => {
    await PGConnection.query("TRUNCATE Peeps;");
  });

  afterAll(async () => {
    await PGConnection.close();
  });

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
      const res = await request(app).post("/peeps").send({ text: "New peep" });
      expect(res.status).toBe(200);
    });

    it("stores the peep in the database", async () => {
      const res = await request(app).post("/peeps").send({ text: "New peep" });
      const result = await PGConnection.query("SELECT * FROM Peeps;");

      expect(result.rowCount).toEqual(1);
      expect(result.rows[0].text).toEqual("New peep");
    });
  });
});
