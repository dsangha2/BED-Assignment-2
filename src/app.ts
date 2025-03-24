import express, {Express} from "express";
import morgan from "morgan";
import setupSwagger from "../config/swagger";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { CorsOptions } from 'cors';

dotenv.config();

const app: Express = express();

app.use(helmet());

const corsOptions: CorsOptions = {
	origin: ["https://trusted-domain.com", "http://localhost:3000"],
	optionsSuccessStatus: 200
  };

app.use(cors(corsOptions));

app.use(express.json());

setupSwagger(app);

app.use(morgan("combined"));

/**
 * @openapi
 * /:
 *   get:
 *     description: Respond with "Hello, World!"
 *     responses:
 *       200:
 *         description: A successful response
 */
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/v1/health", (req, res) => {
	res.json({
		status: "OK",
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
		version: "1.0.0",
	});
});

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);
app.use(errorHandler);

export default app; 