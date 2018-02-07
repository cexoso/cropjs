
export default class Preview {
    private canvas: HTMLCanvasElement
    constructor(imageData: ImageData) {
        this.canvas = document.createElement('canvas')
        this.canvas.width = imageData.width
        this.canvas.height = imageData.height
        const ctx = this.canvas.getContext('2d')
        ctx.putImageData(imageData, 0, 0);
    }
    public toBlob(): Promise<Blob> {
        return new Promise((resolve) => {
            this.canvas.toBlob(resolve)
        })
    }
    public toDataUrl(type?: string, quality?: number) {
        return this.canvas.toDataURL(type, quality)
    }
}
