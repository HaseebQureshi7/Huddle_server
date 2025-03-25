import { CreateMessageDTO } from "../../dtos/message/CreateMessage.dto";
import { MessageRepository } from "../../../domain/repositories/Message.repo";
import { MessageEntity } from "../../../domain/entities/Message.entity";
import { AppError } from "../../../shared/utils/AppError";

export class CreateMessageUseCase {
  constructor(private messageRepository: MessageRepository) {}

  async execute(data: CreateMessageDTO): Promise<MessageEntity> {
    const { userId, roomId, content } = data;

    // 💡 Validate required fields
    if (!userId || !roomId || !content) {
      throw new AppError("User ID, Room ID, and content are required.", 400);
    }

    // 💡 Ensure content is not empty
    if (content.trim().length === 0) {
      throw new AppError("Message content cannot be empty.", 400);
    }

    // ✅ Create the message
    const message = await this.messageRepository.create(data);
    return message;
  }
}
