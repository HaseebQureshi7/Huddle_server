import { Router } from "express";
import { AuthController } from "../../controllers/auth/Auth.controller";
import { AuthRepositoryImpl } from '../../../infrastructure/repositories/auth/Auth.impl';

const authRepo = new AuthRepositoryImpl();
const authController = new AuthController(authRepo);
const authRouter = Router();

authRouter.post("/signup", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refreshToken);

export default authRouter;
