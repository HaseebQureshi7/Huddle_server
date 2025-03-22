import { Router } from "express";
import healthRouter from "./health/health.routes";
import authRouter from "./auth/Auth.routes";
import roomRouter from "./room/Room.routes";

const appRouter = Router();

const prefix = "/api/v1";

appRouter.use(prefix + "/health", healthRouter);
appRouter.use(prefix + "/auth", authRouter);
appRouter.use(prefix + "/room", roomRouter);

export default appRouter;
