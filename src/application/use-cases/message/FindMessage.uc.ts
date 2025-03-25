import { MessageRepository } from "../../../domain/repositories/Message.repo";
import { MessageEntity } from "../../../domain/entities/Message.entity";
import { AppError } from "../../../shared/utils/AppError";

export class FindMessageUseCase {
  constructor(private messageRepository: MessageRepository) {}

  async execute(messageId: string): Promise<MessageEntity> {
    if (!messageId) {
      throw new AppError("Message ID is required.", 400);
    }

    const message = await this.messageRepository.findById(messageId);
    if (!message) {
      throw new AppError("Message not found.", 404);
    }

    return message;
  }
}
