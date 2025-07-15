import { NextFunction, Request, Response } from "express";
import sessionService from "../services/ClinicSessionService";


const createSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await sessionService.createSession(req.body);
    res.status(201).json(session);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getAllSessions = async (req: Request, res: Response) => {
  try {
    const clinicId = Number(req.params.id);
    if (isNaN(clinicId)) {
      return res.status(400).json({ error: "Invalid clinic ID" });
    }
    const sessions = await sessionService.getSessionsByClinicId(clinicId);
    res.json(sessions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getSessionById = async (req: Request, res: Response) =>   {
  try {
    const session = await sessionService.getSessionById(Number(req.params.id));
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(session);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateSession = async (req: Request, res: Response) => {
  try {
    const sessionId = Number(req.params.sid); // use sid here
    const session = await sessionService.updateSession(sessionId, req.body);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json(session); // return the updated session
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


const deleteSession = async (req: Request, res: Response) => {
  try {
    const sessionId = Number(req.params.sid);

    const deleted = await sessionService.deleteSession(sessionId);

    if (!deleted) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ message: "Session deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



export default {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
};
