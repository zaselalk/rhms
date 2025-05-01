import { Router } from "express";
import clinicSessionController from "../controllers/clinicSessionController";

const router = Router();

// Create a new session
router.post("/", clinicSessionController.createSession);

// Get all sessions
router.get("/", clinicSessionController.getAllSessions);

// Get a specific session by ID
//router.get("/:id", clinicSessionController.getSessionById);

// Update a session by ID
//router.put("/:id", clinicSessionController.updateSession);

// Delete a session by ID
//router.delete("/:id", clinicSessionController.deleteSession);

export default router;
