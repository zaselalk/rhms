import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.routes";
import sequelize from "./models";
import DisaseRouter from "./routes/disease.routes";
import cors from "cors";
import ResidentRouter from "./routes/resident.routes";
import HouseholdRouter from "./routes/hosehold.routes";
import ClinicRouter from "./routes/clinic.routes";
import PermissionRouter from "./routes/permission.routes";
import RoleRouter from "./routes/role.routes";
import UserRouter from "./routes/user.routes";
import serializeUser from "./middleware/serializeuser.middleware";
import clinicSessionRoutes from "./routes/clinicSession.routes";
import expressErrorHandler from "./util/expressErrorHandler";
import residentClinicRouter from "./routes/residentclinic.routes";
import HouseholdResidentRouter from "./routes/householdresident.routes";
import DivisionRouter from "./routes/division.routes";
import { auditLogger } from "./middleware/auditLogger.middleware";
import ResidentDiseaseRouter from "./routes/residentdisease.route";
import MapdataRouter from "./routes/mapdata.routes";
import "./models/association"; // Import associations to ensure they are registered
import clinicSessionRouter from './routes/clinicSession.routes'; 

dotenv.config();

// env variables
const PORT: number =
  parseInt(process.env.APPLICATION_PORT as string, 10) || 3001;
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Middleware to serialize user data
// This middleware will be used to serialize user data before sending it in the response
app.use(serializeUser);

// Middleware to log actions
app.use(auditLogger);

// home route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API server is running..." });
});

// health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is healthy.. 😊" });
});

// Registering routes
app.use("/auth", AuthRouter);
app.use("/disease", DisaseRouter);
app.use("/resident", ResidentRouter);
app.use("/household", HouseholdRouter);
app.use("/clinic", ClinicRouter);
app.use('/sessions', clinicSessionRouter);
app.use("/permission", PermissionRouter);
app.use("/role", RoleRouter);
app.use("/user", UserRouter);
app.use("/residentClinic", residentClinicRouter);
app.use("/division", DivisionRouter);
app.use("/residentdisease", ResidentDiseaseRouter);
app.use("/sessions", clinicSessionRoutes);
app.use("/household-resident", HouseholdResidentRouter);
app.use("/mapdata", MapdataRouter);

// error handling middleware
app.use(expressErrorHandler);

app.listen(PORT, async () => {
  sequelize.sync();
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
