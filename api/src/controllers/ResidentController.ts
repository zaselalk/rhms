import { Request, Response } from "express";

class ResidentController {
  async ping(req: Request, res: Response): Promise<Response> {
    return new Promise((resolve) => {
      return res.json({ message: "pong" });
    });
  }
}

export default ResidentController;
