import Drawer from './drawer'
const division = 6
export default class ImgDrawer extends Drawer {
    public left: number
    public right: number
    public top: number
    public bottom: number
    private startDrop = false
    constructor(canvas) {
        super(canvas)
        this.left = this.clientWidth / division
        this.right = this.left * (division - 1)
        this.top = this.clientHeight / division
        this.bottom = this.top * (division - 1)
    }
    public onMove(handle) {
        const event: any = {};
        if (this.needListen) {
            const touchend = () => {
                this.startDrop = false;
            }
            this.canvas.addEventListener('touchstart', (e) => {
                const { pageX, pageY } = e.targetTouches[0];
                if (
                    pageX > this.left && pageX < this.right &&
                    pageY > this.top && pageY < this.bottom
                ) {
                    this.startDrop = true
                    event.start = {
                        x: pageX,
                        y: pageY
                    }
                }
            })
            this.canvas.addEventListener('touchmove', (e) => {
                if (this.startDrop) {
                    const { pageX, pageY } = e.targetTouches[0];
                    event.current = {
                        x: pageX,
                        y: pageY
                    }
                    const dleft = pageX <= this.left
                    const dright = pageX >= this.right
                    const dtop: boolean = pageY <= this.top;
                    const dbottom: boolean = pageY >= this.bottom;

                    if (dleft || dright || dtop || dbottom) {
                        this.emitter.emit('move', {
                            bottom: dbottom && ((pageY - this.bottom) / this.top),
                            left: 1 - pageX / this.left,
                            right: 1 - pageX / this.right,
                            top: 1 - pageY / this.top,
                        });
                    }
                }
            });
            this.canvas.addEventListener('touchend', touchend)
            this.canvas.addEventListener('touchcancel', touchend)
        }
        this.emitter.on('move', handle);
    }
}