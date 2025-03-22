import { RoomRepository } from "../../../domain/repositories/Room.repo";
import { AppError } from "../../../shared/utils/AppError";
import { RoomEntity } from "../../../domain/entities/Room.entity";

export class FindRoomByIdUseCase {
  constructor(private roomRepository: RoomRepository) {}

  async execute(roomId: string): Promise<RoomEntity> {
    if (!roomId) {
      throw new AppError("Room ID is required.", 400);
    }

    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new AppError("Room not found.", 404);
    }

    return room;
  }
}
