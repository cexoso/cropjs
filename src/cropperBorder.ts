import DrawerLayer from './drawerLayer'

export default class CropperBorder extends DrawerLayer {
    private dom: HTMLCanvasElement
    private drawer: DrawerLayer
    constructor(canvas, options) {
        super(canvas)
        this.drawBorder(options)
    }
    private drawBorder(opts: { border: number, left: number, top: number, size: number }) {
        this.ctx.fillStyle = "#1a1a1bc2";
        this.ctx.fillRect(0, 0, this.clientWidth, this.clientHeight);
        const w = this.clientWidth * opts.size;
        const h = w / opts.border
        this.ctx.clearRect(
            this.clientWidth * opts.left - w / 2,
            this.clientHeight * opts.top - h / 2,
            w,
            h,
        )
    }
}