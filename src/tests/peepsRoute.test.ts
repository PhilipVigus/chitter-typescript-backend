import request from "supertest";
import app from "../server";
import PGConnection from "../model/PGConnection";
import Peep from "../model/Peep";

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
      await Peep.create("First peep");
      await Peep.create("Second peep");
      const res = await request(app).get("/peeps");
      expect(res.body.peeps.length).toEqual(2);
    });
  });

  describe("POST", () => {
    it("returns status 200", async () => {
      const res = await request(app).post("/peeps").send({ text: "New peep" });
      expect(res.status).toBe(200);
    });

    it("stores the peep in the database", async () => {
      await request(app).post("/peeps").send({ text: "New peep" });
      const result = await PGConnection.query("SELECT * FROM Peeps;");

      expect(result.rowCount).toEqual(1);
      expect(result.rows[0].text).toEqual("New peep");
    });
  });
});
