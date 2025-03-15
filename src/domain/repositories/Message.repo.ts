import { CreateMessageDTO } from "../../application/dtos/message/CreateMessage.dto";
import { MessageEntity } from "../entities/Message.entity";

export interface MessageRepository {
  create(message_data: CreateMessageDTO): Promise<MessageEntity>;
  viewById(mid: string): Promise<MessageEntity | null>;
  delete(mid: string): Promise<MessageEntity>;
}
