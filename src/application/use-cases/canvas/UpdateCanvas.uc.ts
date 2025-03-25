import { CanvasRepository } from "../../../domain/repositories/Canvas.repo";
import { CanvasEntity } from "../../../domain/entities/Canvas.entity";
import { UpdateCanvasDTO } from "../../dtos/canvas/UpdateCanvas.dto";
import { AppError } from "../../../shared/utils/AppError";

export class UpdateCanvasUseCase {
  private canvasRepository: CanvasRepository;

  constructor(canvasRepository: CanvasRepository) {
    this.canvasRepository = canvasRepository;
  }

  async execute(cid:string, updatedCanvasData: UpdateCanvasDTO): Promise<CanvasEntity> {
    if (!updatedCanvasData || !cid) {
      throw new AppError("Missing required fields: canvas_id, data ", 400);
    }
    // Check if the canvas exists
    const existingCanvas = await this.canvasRepository.findById(cid);
    
    if (!existingCanvas) {
      throw new AppError("No canvas found for the specified room.", 404);
    }

    // Update the canvas
    const updatedCanvas = await this.canvasRepository.update(updatedCanvasData);

    return updatedCanvas;
  }
}
