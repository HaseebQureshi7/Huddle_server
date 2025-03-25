import { UpdateCanvasDTO } from "../../application/dtos/canvas/UpdateCanvas.dto";
import { CreateCanvasDTO } from "../../application/dtos/canvas/CreateCanvas.dto";
import { CanvasEntity } from "../entities/Canvas.entity";

export interface CanvasRepository {
  findByRoomId(roomId: string): Promise<CanvasEntity | null>;
  findById(cid: string): Promise<CanvasEntity | null>;
  update(updated_data: UpdateCanvasDTO): Promise<CanvasEntity>;
  create(data: CreateCanvasDTO): Promise<CanvasEntity>;
  delete(cid: string): Promise<CanvasEntity>;
}
