import Mitt from 'mitt';

interface IPoint {
    x: number,
    y: number
}
export default class DrawerLayer {
    protected clientWidth
    protected clientHeight
    protected needListen = true
    protected ctx: CanvasRenderingContext2D
    protected canvas: HTMLCanvasElement
    protected emitter: Mitt.Emitter = new Mitt();
    private deltaX = 0
    private deltaY = 0
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.fullScreen()
        this.ctx = canvas.getContext('2d');
    }
    public drawLine(pointStart: IPoint, pointEnd: IPoint) {
        this.ctx.beginPath();
        this.ctx.moveTo(pointStart.x, pointStart.y);
        this.ctx.lineTo(pointEnd.x, pointEnd.y);
        this.ctx.stroke();
    }
    public drawImg(image: ImageBitmap, deltaX = 0, deltaY = 0, scale = 1) {
        this.ctx.clearRect(0, 0, image.width, image.height)
        this.ctx.drawImage(image, 0, 0, image.width, image.height, deltaX, deltaY, image.width * scale, image.height * scale)
    }
    public getImageData(sx: number, sy: number, sw: number, sh: number) {
        return this.ctx.getImageData(sx, sy, sw, sh)
    }
    public getCanvas() {
        return this.canvas
    }
    public getCtx() {
        return this.ctx
    }
    private fullScreen() {
        const parent = this.canvas.parentElement;
        const { clientWidth, clientHeight } = parent
        this.canvas.width = clientWidth;
        this.canvas.height = clientHeight;
        this.clientWidth = clientWidth;
        this.clientHeight = clientHeight;
    }
}