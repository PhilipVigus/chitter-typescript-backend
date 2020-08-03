import { Request, Response } from "express";
import Peep from "../model/Peep";

class PeepsController {
  public static async createPeep(req: Request, res: Response): Promise<void> {
    await Peep.create(req.body.userId, req.body.text);
    res.status(200).send();
  }

  public static async getPeeps(req: Request, res: Response): Promise<void> {
    res.status(200).send(await Peep.all());
  }
}

export default PeepsController;
