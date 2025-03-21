import { Router } from "express";
import healthRouter from "./health/health.routes";
import authRouter from "./auth/Auth.routes";

const appRouter = Router();

const prefix = "/api/v1";

appRouter.use(prefix + "/health", healthRouter);
appRouter.use(prefix + "/auth", authRouter);

export default appRouter;
