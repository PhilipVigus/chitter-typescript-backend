import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import http, { Server } from "http";
import { createTerminus } from "@godaddy/terminus";
import PGConnection from "./model/PGConnection";
import peepsRoute from "./routes/peepsRoute";
import usersRoute from "./routes/usersRoute";
import sessionsRoute from "./routes/sessionsRoute";

dotenv.config();

const port = process.env.SERVER_PORT;

class App {
  private _app: Application;

  private _server: Server | null;

  public constructor() {
    this._app = express();
    this._app.use(helmet());
    this._app.use(cookieParser());
    this._app.use(
      cookieSession({
        name: "session",
        keys: ["some string"],
        maxAge: 24 * 60 * 60 * 1000
      })
    );
    this._app.use(cors({ origin: true, credentials: true }));
    this._app.options("*", cors({ origin: true, credentials: true }));
    this._app.use(express.json());

    this._app.use("/peeps", peepsRoute);
    this._app.use("/users", usersRoute);
    this._app.use("/sessions", sessionsRoute);
    this._server = http.createServer(this._app);

    createTerminus(this._server, {
      signals: ["SIGINT", "SIGTERM"],
      onSignal: this.onSignal
    });

    PGConnection.open();
  }

  public start(): void {
    this._server?.listen(port);
  }

  public async stop(): Promise<void> {
    this._server?.close();
    await PGConnection.close();
  }

  private async onSignal(): Promise<void> {
    this.stop();
  }

  get server(): Application {
    return this._app;
  }
}

export default App;
