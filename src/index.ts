import * as Hammer from 'hammerjs'
import ImgDrawer from './imgDrawer'

type base64 = string
const defaultOptions = {
    panImg: true,
    pinchImg: true
}
export default class Crop {
    private imgDrawer: ImgDrawer
    private background: any
    private deltaX = 0
    private deltaY = 0
    private scale = 1
    private pinchStartCenter: { x: number, y: number }
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
        hammertime.get('pinch').set({ enable: true });
        if (options.panImg) {
            hammertime.on('pan panend', this.panBackground.bind(this))
        }
        if (options.pinchImg) {
            hammertime.on('pinchstart pinch pinchend', this.pinchBackground.bind(this))
        }
    }
    private panBackground(e) {
        if (this.background !== null) {
            this.imgDrawer.drawImg(this.background, this.deltaX + e.deltaX, this.deltaY + e.deltaY, this.scale);
            if (e.type === 'panend') {
                this.deltaX += e.deltaX
                this.deltaY += e.deltaY
            }
        }
    }
    private pinchBackground(e) {
        if (this.background !== null) {
            const { deltaX, deltaY, scale, type, center } = e
            if (type === 'pinchstart') {
                this.pinchStartCenter = center
            }
            this.imgDrawer.drawImg(this.background, this.pinchStartCenter.x - (this.deltaX + e.deltaX) * this.scale * scale, this.pinchStartCenter.y - (this.deltaY + e.deltaY) * this.scale * scale, this.scale * scale);

            if (type === 'pinchend') {
                this.deltaX += deltaX
                this.deltaY += deltaY
                this.scale *= scale
            }
        }
    }
}