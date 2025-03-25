import { Router } from "express";
import { CanvasRepositoryImpl } from "../../../infrastructure/repositories/canvas/Canvas.impl";
import { CanvasController } from "../../controllers/canvas/Canvas.controller";
import { AuthenticateUser } from "../../../shared/middlewares/auth.middleware";

const canvasRouter = Router();
const canvasRepo = new CanvasRepositoryImpl();
const canvasController = new CanvasController(canvasRepo);

canvasRouter.post("/", AuthenticateUser, canvasController.create);
canvasRouter.get("/room/:roomId", AuthenticateUser, canvasController.findByRoomId);
canvasRouter.get("/:id", AuthenticateUser, canvasController.findById);
canvasRouter.patch("/", AuthenticateUser, canvasController.update);
canvasRouter.delete("/:id", AuthenticateUser, canvasController.delete);

export default canvasRouter;
