import Drawer from './drawer'
const division = 6
export default class ImgDrawer extends Drawer {
    private left: number
    private right: number
    private top: number
    private down: number
    constructor(canvas) {
        super(canvas)
        this.left = this.clientWidth / division
        this.right = this.left * (division - 1)
        this.top = this.clientHeight / division
        this.down = this.top * (division - 1)
        this.debug()
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