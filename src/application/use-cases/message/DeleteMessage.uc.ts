import { MessageRepository } from "../../../domain/repositories/Message.repo";
import { MessageEntity } from "../../../domain/entities/Message.entity";
import { AppError } from "../../../shared/utils/AppError";

export class DeleteMessageUseCase {
  constructor(private messageRepository: MessageRepository) {}

  async execute(messageId: string): Promise<MessageEntity> {
    if (!messageId) {
      throw new AppError("Message ID is required.", 400);
    }

    // 💡 Check if the message exists before deleting
    const message = await this.messageRepository.findById(messageId);
    if (!message) {
      throw new AppError("Message not found.", 404);
    }

    const deletedMessage = await this.messageRepository.delete(messageId);
    return deletedMessage;
  }
}
