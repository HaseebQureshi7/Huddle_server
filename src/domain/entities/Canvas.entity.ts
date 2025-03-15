import { CanvasData as ICanvasData } from "@prisma/client";

export class CanvasEntity implements ICanvasData {
  id: string;
  roomId: string;
  data: any;
  updatedAt: Date;

  constructor(canvasData: ICanvasData) {
    this.id = canvasData.id;
    this.roomId = canvasData.roomId;
    this.data = canvasData.data;
    this.updatedAt = canvasData.updatedAt;
  }
}
