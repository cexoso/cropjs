
export default class Preview {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    constructor(imageData: ImageData) {
        this.canvas = document.createElement('canvas')
        this.canvas.width = imageData.width
        this.canvas.height = imageData.height
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.ctx.putImageData(imageData, 0, 0);
    }
    public toBlob(): Promise<any> {
        return new Promise((resolve) => {
            this.canvas.toBlob(resolve)// todo 可能需要关心的type参数
        })
    }
    public toDataUrl(type?: string, quality?: number) {
        return this.canvas.toDataURL(type, quality)
    }
}
