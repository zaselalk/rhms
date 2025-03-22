import { Request, Response } from "express";

class DisaseController {
  ping(req: Request, res: Response): Promise<Response> {
    return new Promise((resolve) => {
      return res.json({ message: "Pong" });
    });
  }
}

export default DisaseController;
