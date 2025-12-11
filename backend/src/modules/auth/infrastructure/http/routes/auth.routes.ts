import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { LoginUseCase } from "@/modules/auth/application/usecases/login.usecase";
import { RegisterUseCase } from "@/modules/auth/application/usecases/register.usecase";
import { DrizzleUserRepository } from "@/modules/user/infrastructure/database/drizzle/drizzle-user.repository";

const authRoutes = Router();

const userRepository = new DrizzleUserRepository();
const loginUseCase = new LoginUseCase(userRepository);
const registerUseCase = new RegisterUseCase(userRepository);
const authController = new AuthController(loginUseCase, registerUseCase);

authRoutes.post("/login", (req, res) => authController.login(req, res));
authRoutes.post("/register", (req, res) => authController.register(req, res));

export { authRoutes };
