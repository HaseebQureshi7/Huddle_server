import { UpdateCanvasDTOProps } from "./interfaces/IUpdateCanvas.type";

export class UpdateCanvasDTO {
    public roomId: string;
    public data: object;

    constructor(canvasData: UpdateCanvasDTOProps) {
        this.roomId = canvasData.roomId;
        this.data = canvasData.data;
    }
}
