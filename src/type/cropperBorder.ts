import DrawerLayer from './drawerLayer'

export default class CropperBorder extends DrawerLayer {
    private dom: HTMLCanvasElement
    private drawer: DrawerLayer
    constructor(canvas, options) {
        super(canvas)
        this.drawBorder(options)
    }
    private drawBorder(opts) {
        console.log(opts);
    }
}