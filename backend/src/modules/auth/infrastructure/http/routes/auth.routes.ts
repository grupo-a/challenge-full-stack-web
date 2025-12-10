import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { PrismaUserRepository } from "@/modules/users/infrastructure/database/prisma/prisma-user.repository";
import { LoginUseCase } from "@/modules/auth/application/usecases/login.usecase";

const authRoutes = Router();

const userRepository = new PrismaUserRepository();
const loginUseCase = new LoginUseCase(userRepository);
const authController = new AuthController(loginUseCase);

authRoutes.post("/login", (req, res) => authController.login(req, res));

export { authRoutes };
