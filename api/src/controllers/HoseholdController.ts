import { Request, Response } from "express";
import { Household } from "../models/hosehold";

class HoseholdController {
  async ping(req: Request, res: Response): Promise<Response> {
    return new Promise((resolve) => {
      return res.json({ message: "pong" });
    });
  }
  async create(req: Request, res: Response): Promise<Response> {
    const {
        houseid,
        password,
        name,
        familyMember

    } = req.body;

    const household = await Household.create({
      houseid,
      password,
      name,
      familyMember

    });

    return res.json(household);
  }
}

export default HoseholdController;
