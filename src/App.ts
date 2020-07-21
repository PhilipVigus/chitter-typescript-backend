import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import PGConnection from "./model/PGConnection";
import peepsRoute from "./routes/peepsRoute";
import usersRoute from "./routes/usersRoute";
import sessionsRoute from "./routes/sessionsRoute";
import { Server } from "http";

dotenv.config();

const port = process.env.SERVER_PORT;

class App {
  private _server: Application;

  private _test: Server | null;

  public constructor() {
    this._test = null;
    this._server = express();
    this._server.use(helmet());
    this._server.use(cors());
    this._server.use(express.json());

    this._server.use("/peeps", peepsRoute);
    this._server.use("/users", usersRoute);
    this._server.use("/sessions", sessionsRoute);

    PGConnection.open();
  }

  public start(): void {
    this._test = this._server.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });
  }

  public async stop(): Promise<void> {
    this._test?.close();
    await PGConnection.close();
  }

  get server(): Application {
    return this._server;
  }
}

export default App;
