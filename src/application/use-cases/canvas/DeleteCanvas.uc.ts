import { CanvasRepository } from "../../../domain/repositories/Canvas.repo";
import { CanvasEntity } from "../../../domain/entities/Canvas.entity";
import { AppError } from "../../../shared/utils/AppError";

export class DeleteCanvasUseCase {
  private canvasRepository: CanvasRepository;

  constructor(canvasRepository: CanvasRepository) {
    this.canvasRepository = canvasRepository;
  }

  async execute(canvasId: string): Promise<CanvasEntity> {
    const canvas = await this.canvasRepository.findById(canvasId);

    if (!canvas) {
      throw new AppError("Canvas not found.", 404);
    }

    const deletedCanvas = await this.canvasRepository.delete(canvasId);

    return deletedCanvas;
  }
}
