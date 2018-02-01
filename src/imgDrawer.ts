import Drawer from './drawer'
const division = 6
export default class ImgDrawer extends Drawer {
    public left: number
    public right: number
    public top: number
    public down: number
    constructor(canvas) {
        super(canvas)
        this.left = this.clientWidth / division
        this.right = this.left * (division - 1)
        this.top = this.clientHeight / division
        this.down = this.top * (division - 1)
        this.debug()
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
                this.emitter.emit('drop', event);
            });
        }
        this.emitter.on('drop', handle);
    }
    private debug() {
        setTimeout(() => {
            this.drawLine({ x: 0, y: this.top }, { x: this.clientWidth, y: this.top })
            this.drawLine({ x: 0, y: this.down }, { x: this.clientWidth, y: this.down })
            this.drawLine({ x: this.left, y: 0 }, { x: this.left, y: this.clientHeight })
            this.drawLine({ x: this.right, y: 0 }, { x: this.right, y: this.clientHeight })
        }, 100)
    }
}