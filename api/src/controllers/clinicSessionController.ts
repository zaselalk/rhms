import { NextFunction, Request, Response } from "express";
import sessionService from "../services/ClinicSessionService";
import Resident from "../models/resident";

const createSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await sessionService.createSession(req.body);
    res.status(201).json(session);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getAllSessions = async (_req: Request, res: Response) => {
  try {
    const sessions = await sessionService.getAllSessions();
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
    const session = await sessionService.updateSession(Number(req.params.id), req.body);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(session);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSession = async (req: Request, res: Response) => {
  try {
    const session = await sessionService.deleteSession(Number(req.params.id));
    if (!session) {
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
