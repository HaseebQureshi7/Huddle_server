import { UpdateCanvasDTO } from "../../application/dtos/canvas/UpdateCanvas.dto";
import { CanvasEntity } from "../entities/Canvas.entity";

export interface CanvasRepository {
  viewByRoomId(roomId: string): Promise<CanvasEntity | null>;
  update(updated_data: UpdateCanvasDTO): Promise<CanvasEntity>;
}
