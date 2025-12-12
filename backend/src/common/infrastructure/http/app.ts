import express from "express";
import cors from "cors";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);
app.use(errorHandler);

export default app;
