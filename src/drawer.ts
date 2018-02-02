import Mitt from 'mitt';

interface IPoint {
    x: number,
    y: number
}
export default class Drawer {
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
    public drawImg(image: ImageBitmap, deltaX = 0, deltaY = 0) {
        this.ctx.clearRect(0, 0, image.width, image.height)
        this.deltaX = deltaX
        this.deltaY = deltaY
        this.ctx.drawImage(image, 0, 0, image.width, image.height, this.deltaX, this.deltaY, image.width, image.height)
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
                    x: point.pageX,
                    y: point.pageY
                }
            })
            this.canvas.addEventListener('touchmove', (e) => {
                const point = e.targetTouches[0];
                event.current = {
                    x: point.pageX,
                    y: point.pageY
                }
                this.emitter.emit('drop', event);
            });
        }
        this.emitter.on('drop', handle);
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