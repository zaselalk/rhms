import { Request, Response } from "express";
import { Resident } from "../models/resident";

class ResidentController {
  async ping(req: Request, res: Response): Promise<Response> {
    return new Promise((resolve) => {
      return res.json({ message: "pong" });
    });
  }
  async create(req: Request, res: Response): Promise<Response> {
    const {
      firstName,
      lastName,
      email,
      password,
      birthday,
      bloodGroup,
      sex,
      clinicNumber,
      bloodPressure,
      glucose,
      heartRate,
      cholesterol,
      nic,
      address,
      contactNumber,
      divtionId,
      civilStatus,
      education_status,
      addictedNotes,
      alergyNotes,
      currentDiseases,
      height,
      weight,
    } = req.body;

    const resident = await Resident.create({
      firstName,
      lastName,
      email,
      password,
      birthday,
      bloodGroup,
      sex,
      clinicNumber,
      bloodPressure,
      glucose,
      heartRate,
      cholesterol,
      nic,
      address,
      contactNumber,
      divtionId,
      civilStatus,
      education_status,
      addictedNotes,
      alergyNotes,
      currentDiseases,
      height,
      weight,
    });

    return res.json(resident);
  }
}

export default ResidentController;
