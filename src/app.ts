import express, {Express} from "express";
import morgan from "morgan";
import setupSwagger from "../config/swagger";

const app: Express = express();

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

export default app; 