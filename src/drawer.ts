import Mitt from 'mitt';

interface IPoint {
    x: number,
    y: number
}
const emitter: Mitt.Emitter = new Mitt();

export default class Drawer {
    protected clientWidth
    protected clientHeight
    protected ctx: CanvasRenderingContext2D
    private canvas: HTMLCanvasElement
    private needListen = true
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
    public drawImg(image: ImageBitmap) {
        this.ctx.drawImage(image, 0, 0, image.width, image.height)
    }
    public getCanvas() {
        return this.canvas
    }
    public onDrag(handle) {
        const event: any = {};
        if (this.needListen) {
            this.canvas.addEventListener('touchstart', (e) => {
                const point = e.targetTouches[0];
                event.start = {
                    x: point.screenX,
                    y: point.screenY
                }
            })
            this.canvas.addEventListener('touchmove', (e) => {
                const point = e.targetTouches[0];
                event.current = {
                    x: point.screenX,
                    y: point.screenY
                }
                emitter.emit('drop', event);
            });
        }
        emitter.on('drop', handle);
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