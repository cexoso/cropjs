import * as Hammer from 'hammerjs'
import ImgDrawer from './imgDrawer'

type base64 = string
const defaultOptions = {
    panImg: true
}
export default class Crop {
    private imgDrawer: ImgDrawer
    private background: any
    private deltaX = 0
    private deltaY = 0
    constructor(options) {
        Object.assign(options, defaultOptions)
        this.initDom(options);
        this.initEvent(options);
        
    }
    public async setImg(getImg: () => Promise<any>) {
        const base = await getImg();
        this.background = base
        this.imgDrawer.drawImg(base);
    }
    private initDom(options) {
        const container = document.querySelector(options.selectot) as HTMLElement;
        const canvas = document.createElement("canvas")
        container.appendChild(canvas);
        this.imgDrawer = new ImgDrawer(canvas);
    }
    private initEvent(options) {
        const hammertime: any = new Hammer(this.imgDrawer.getCanvas());
        hammertime.get('pan').set({ direction: (Hammer as any).DIRECTION_ALL });
        if (options.panImg) {
            hammertime.on('pan', this.panBackground.bind(this))
        }
    }
    private panBackground(e) {
        if (this.background !== null) {
            this.imgDrawer.drawImg(this.background, this.deltaX + e.deltaX, this.deltaY + e.deltaY);
            if (e.isFinal) {
                this.deltaX += e.deltaX
                this.deltaY += e.deltaY
            }
        }
    }
}