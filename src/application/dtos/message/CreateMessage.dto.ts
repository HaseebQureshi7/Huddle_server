import { CreateMessageDTOProps } from "./interfaces/ICreateMessage.type";

export class CreateMessageDTO {
    public userId: string;
    public roomId: string;
    public content: string;

    constructor(messageData: CreateMessageDTOProps) {
        this.userId = messageData.userId;
        this.roomId = messageData.roomId;
        this.content = messageData.content;
    }
}
