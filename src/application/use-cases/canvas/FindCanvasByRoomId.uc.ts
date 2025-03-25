import { CanvasRepository } from "../../../domain/repositories/Canvas.repo";
import { CanvasEntity } from "../../../domain/entities/Canvas.entity";
import { AppError } from "../../../shared/utils/AppError";

export class FindCanvasByRoomIdUseCase {
  private canvasRepository: CanvasRepository;

  constructor(canvasRepository: CanvasRepository) {
    this.canvasRepository = canvasRepository;
  }

  async execute(roomId: string): Promise<CanvasEntity> {
    const canvas = await this.canvasRepository.findByRoomId(roomId);

    if (!canvas) {
      throw new AppError("Canvas not found for the given room ID.", 404);
    }

    return canvas;
  }
}
