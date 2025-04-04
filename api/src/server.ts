import express, { Application } from "express";
import dotenv from "dotenv";
import passport from "./config/passport";
import AuthRouter from "./routes/auth.routes";
import DisaseRouter from "./routes/disease.routes";
import cors from "cors";
import ResidentRouter from "./routes/resident.routes";
import ClinicRouter from "./routes/clinic.routes";
import PermissionRouter from "./routes/permission.routes";
import RoleRouter from "./routes/role.routes";

dotenv.config();

// env variables
const PORT: number =
  parseInt(process.env.APPLICATION_PORT as string, 10) || 3001;
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", AuthRouter);
app.use("/disease", DisaseRouter);
app.use("/resident", ResidentRouter);
app.use("/clinic", ClinicRouter);
app.use("/permission", PermissionRouter);
app.use("/role", RoleRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
