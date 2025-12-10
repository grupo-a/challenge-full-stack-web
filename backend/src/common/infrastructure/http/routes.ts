import { authRoutes } from "@/modules/auth/infrastructure/http/routes/auth.routes";
import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World!" });
});

routes.use("/auth", authRoutes);

export { routes };
