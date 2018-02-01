export default class Drawer {
    private ctx: CanvasRenderingContext2D
    private canvas: HTMLCanvasElement
    private clientWidth
    private clientHeight
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.fullScreen();
        this.ctx = canvas.getContext('2d');
    }
    public drawImg(image: ImageBitmap) {
        this.ctx.drawImage(image, 0, 0, image.width, image.height)
    }
    private fullScreen() {
        const parent = this.canvas.parentElement;
        const { clientWidth, clientHeight} = parent
        this.canvas.width = clientWidth;
        this.canvas.height = clientHeight;
        this.clientWidth = clientWidth;
        this.clientHeight = clientHeight;
    }
}