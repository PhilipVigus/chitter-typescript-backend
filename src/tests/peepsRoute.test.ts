import request from "supertest";
import PGConnection from "../model/PGConnection";
import Peep from "../model/Peep";
import User from "../model/User";
import App from "../App";

describe("/peeps endpoint", () => {
  let app: App;

  beforeEach(() => {
    app = new App();
    app.start();
  });

  afterEach(async () => {
    await PGConnection.query("TRUNCATE peeps, users;");
    await app.stop();
  });

  describe("GET", () => {
    it("returns status 200", async () => {
      const res = await request(app.server).get("/peeps");
      expect(res.status).toBe(200);
    });

    it("gets the peeps", async () => {
      const user = await User.create("bob", "12345678");
      await Peep.create(user?.id as number, "First peep");
      await Peep.create(user?.id as number, "Second peep");
      const res = await request(app.server).get("/peeps");
      expect(res.body.peeps.length).toEqual(2);
    });
  });

  describe("POST", () => {
    it("returns status 200", async () => {
      const user = await User.create("bob", "12345678");
      const res = await request(app.server)
        .post("/peeps")
        .send({ userId: user?.id as number, text: "New peep" });
      expect(res.status).toBe(200);
    });

    it("stores the peep in the database", async () => {
      const user = await User.create("bob", "12345678");
      await request(app.server)
        .post("/peeps")
        .send({ userId: user?.id as number, text: "New peep" });
      const result = await PGConnection.query("SELECT * FROM peeps;");

      expect(result.rowCount).toEqual(1);
      expect(result.rows[0].text).toEqual("New peep");
    });
  });
});
