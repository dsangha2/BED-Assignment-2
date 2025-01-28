import express, {Express} from "express";
import setupSwagger from "../config/swagger";
import morgan from "morgan";

const app: Express = express();

setupSwagger(app);

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

// Use morgan for HTTP request logging
app.use(morgan("combined"));

export default app; 