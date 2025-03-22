import { RoomRepository } from "../../../domain/repositories/Room.repo";
import { AppError } from "../../../shared/utils/AppError";
import { CreateRoomDTO } from "../../dtos/room/CreateRoom.dto";
import { RoomEntity } from "../../../domain/entities/Room.entity";

export class CreateRoomUseCase {
  constructor(private roomRepository: RoomRepository) {}

  async execute(roomData: CreateRoomDTO): Promise<RoomEntity> {
    const { name } = roomData;

    if (!name) {
      throw new AppError("Room name is required.", 400);
    }

    return this.roomRepository.create(roomData);
  }
}
