import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { LoginUseCase } from "@/modules/auth/application/usecases/login.usecase";
import { RegisterUseCase } from "@/modules/auth/application/usecases/register.usecase";
import { GetProfileUseCase } from "@/modules/auth/application/usecases/get-profile.usecase";
import { DrizzleUserRepository } from "@/modules/user/infrastructure/database/drizzle/drizzle-user.repository";
import { authMiddleware } from "@/common/infrastructure/http/middlewares/auth.middleware";

const authRoutes = Router();

const userRepository = new DrizzleUserRepository();
const loginUseCase = new LoginUseCase(userRepository);
const registerUseCase = new RegisterUseCase(userRepository);
const getProfileUseCase = new GetProfileUseCase(userRepository);
const authController = new AuthController(
  loginUseCase,
  registerUseCase,
  getProfileUseCase
);

authRoutes.post("/login", (req, res) => authController.login(req, res));
authRoutes.post("/register", (req, res) => authController.register(req, res));
authRoutes.get("/me", authMiddleware, (req, res) =>
  authController.me(req, res)
);

export { authRoutes };
