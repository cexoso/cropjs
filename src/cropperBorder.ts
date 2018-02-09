import DrawerLayer from './drawerLayer'
import Point from './point'
import { ICropOption, Rect } from './types'
export default class CropperBorder extends DrawerLayer {
    private rect: Rect
    private options: ICropOption
    constructor(canvas: HTMLCanvasElement, options: ICropOption) {
        super(canvas)
        this.options = options;
        this.init();
    }
    public getRect() {
        return this.rect
    }
    public init(w?: number, h?: number) {
        super.init(w, h);
        this.drawBorder(this.options)
    }
    private drawRectBox(point: { x: number, y: number }, width: number, height: number) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.moveTo(point.x, point.y);
        this.ctx.lineTo(point.x + width, point.y);
        this.ctx.lineTo(point.x + width, point.y + height);
        this.ctx.lineTo(point.x, point.y + height);
        this.ctx.lineTo(point.x, point.y);
        this.ctx.stroke();
    }
    private drawBorder(opts: ICropOption) {
        this.ctx.fillStyle = "#00000066";
        this.ctx.fillRect(0, 0, this.clientWidth, this.clientHeight);
        const w = this.clientWidth * opts.size;
        const h = w / opts.border
        const x = this.clientWidth * opts.left - w / 2
        const y = this.clientHeight * opts.top - h / 2
        this.rect = [x, y, w, h]
        this.ctx.clearRect(x, y, w, h)
        this.drawRectBox(new Point(x, y), w, h)
    }
}