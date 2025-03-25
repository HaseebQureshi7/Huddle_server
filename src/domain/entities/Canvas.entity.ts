import { Canvas as ICanvasData } from "@prisma/client";

export class CanvasEntity implements ICanvasData {
  id: string;
  roomId: string;
  data: any;
  updatedAt: Date;

  constructor(canvas: ICanvasData) {
    this.id = canvas.id;
    this.roomId = canvas.roomId;
    this.data = canvas.data;
    this.updatedAt = canvas.updatedAt;
  }
}
