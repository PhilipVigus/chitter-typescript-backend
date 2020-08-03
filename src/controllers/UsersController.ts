import { Request, Response } from "express";
import User from "../model/User";

class UsersController {
  public static async createUser(req: Request, res: Response): Promise<void> {
    const user = await User.create(req.body.username, req.body.password);

    if (user) {
      res.status(200).send({ id: user?.id, username: user?.username });
    } else {
      res.status(422).send({ error: "Username already taken" });
    }
  }
}

export default UsersController;
