import { authRoutes } from "@/modules/auth/infrastructure/http/routes/auth.routes";
import { studentRoutes } from "@/modules/student/infrastructure/http/routes/student.routes";
import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World!" });
});

routes.use("/auth", authRoutes);
routes.use("/students", studentRoutes);

export { routes };
