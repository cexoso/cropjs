
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
    public toBlob(mimeType: string = 'image/png', quality: number = 1): Promise<any> {
        return new Promise((resolve) => {
            this.canvas.toBlob(resolve, mimeType, quality)
        })
    }
    public toDataUrl(mimeType: string = 'image/png', quality: number = 1) {
        return this.canvas.toDataURL(mimeType, quality)
    }
}
