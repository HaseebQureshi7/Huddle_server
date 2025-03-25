import { CanvasRepository } from "../../../domain/repositories/Canvas.repo";
import { CanvasEntity } from "../../../domain/entities/Canvas.entity";
import { AppError } from "../../../shared/utils/AppError";

export class FindCanvasByIdUseCase {
  private canvasRepository: CanvasRepository;

  constructor(canvasRepository: CanvasRepository) {
    this.canvasRepository = canvasRepository;
  }

  async execute(canvasId: string): Promise<CanvasEntity> {
    const canvas = await this.canvasRepository.findById(canvasId);

    if (!canvas) {
      throw new AppError("Canvas not found for the given ID.", 404);
    }

    return canvas;
  }
}
