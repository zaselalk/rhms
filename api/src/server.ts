import express, { Application } from "express";
import dotenv from "dotenv";
import passport from "./config/passport";
import session from "express-session";
import AuthRouter from "./routes/auth.routes";
import sequelize from "./models";
import DisaseRouter from "./routes/disease.routes";
import cors from "cors";
import { Resident } from "./models/resident";
import ResidentRouter from "./routes/resident.routes";
import HouseholdRouter from "./routes/hosehold.routes";

dotenv.config();

// env variables
const PORT: number = 
  parseInt(process.env.APPLICATION_PORT as string, 10) || 3001;
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", AuthRouter);
app.use("/disease", DisaseRouter);
app.use("/resident", ResidentRouter);
app.use("/household", HouseholdRouter);



app.listen(PORT, async () => {
  sequelize.sync();
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
