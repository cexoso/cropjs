import DrawerLayer from './drawerLayer'
import { ICropOption, Rect } from './types'
import Point from './point'
export default class CropperBorder extends DrawerLayer {
    private rect: Rect

    constructor(canvas: HTMLCanvasElement, options: ICropOption) {
        super(canvas)
        this.drawBorder(options)
    }
    public getRect() {
        return this.rect
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
        this.drawRectBox(new Point(x,y),w,h)
    }
}