import Mitt from './mitt';
import { Rect } from './types'

interface IPoint {
    x: number,
    y: number
}
export default class DrawerLayer {
    protected clientWidth: number
    protected clientHeight: number
    protected needListen = true
    protected ctx: CanvasRenderingContext2D
    protected canvas: HTMLCanvasElement
    protected emitter: Mitt = new Mitt();
    private deltaX = 0
    private deltaY = 0
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.fullScreen()
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    }
    public drawLine(pointStart: IPoint, pointEnd: IPoint) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.moveTo(pointStart.x, pointStart.y);
        this.ctx.lineTo(pointEnd.x, pointEnd.y);
        this.ctx.stroke();
    }
    public drawImg(image: ImageBitmap, deltaX = 0, deltaY = 0, scale = 1) {
        console.log(this.clientWidth, this.clientHeight);
        console.log(image.width, image.height, deltaX, deltaY, image.width * scale, image.height * scale);
        this.ctx.clearRect(0, 0, this.clientWidth, this.clientHeight)
        this.ctx.drawImage(image, 0, 0, image.width, image.height, deltaX, deltaY, image.width * scale, image.height * scale)
    }
    public getImageData([sx, sy, sw, sh]: Rect) {
        return this.ctx.getImageData(sx, sy, sw, sh)
    }
    public getCanvas() {
        return this.canvas
    }
    public getCtx() {
        return this.ctx
    }
    public init(w?: number, h?: number) {
        this.fullScreen(w, h)
    }
    private fullScreen(w?: number, h?: number) {
        const parent = this.canvas.parentElement;
        if (parent) {
            w = w || parent.clientWidth
            h = h || parent.clientHeight
            this.canvas.width = w;
            this.canvas.height = h;
            this.clientWidth = w;
            this.clientHeight = h;
        }
    }
}