import { Router } from "express";
import healthRouter from "./health/health.routes";
import authRouter from "./auth/Auth.routes";

const appRouter = Router();

appRouter.use("/health", healthRouter);
appRouter.use("/auth", authRouter);

export default appRouter;
