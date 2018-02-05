import * as Hammer from 'hammerjs'
import ImgDrawer from './imgDrawer'
import Distance from './type/distance'
import Point from './type/point'


type base64 = string
const defaultOptions = {
    panImg: true,
    pinchImg: true
}
export default class Crop {
    private imgDrawer: ImgDrawer
    private background: ImageBitmap
    private startPoint = new Point(0, 0)
    private scale = 1
    constructor(options) {
        Object.assign(options, defaultOptions)
        this.initDom(options);
        this.initEvent(options);

    }
    public async setImg(getImg: () => Promise<ImageBitmap>) {
        const base = await getImg();
        this.background = base
        this.drawBackground(new Point(0, 0), 1);
    }
    private drawBackground(startPoint: Point, scale: number) {
        this.imgDrawer.drawImg(this.background, startPoint.x, startPoint.y, scale);
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
            hammertime.on('pinch pinchend', this.pinchBackground.bind(this))
        }
    }
    
    private panBackground(e) {
        if (this.background !== null) {
            const p = Point.move(this.startPoint, new Distance(-e.deltaX, -e.deltaY))
            this.drawBackground(p, this.scale);
            if (e.type === 'panend') {
                this.startPoint = p
            }
        }
    }
    private pinchBackground(e) {
        e.preventDefault()
        if (this.background !== null) {
            const { deltaX, deltaY, scale, type } = e
            const center = e.center as Point
            
            const bx = center.x - scale * (center.x - this.startPoint.x)// todo重构此处使代码更好理解 
            const by = center.y - scale * (center.y - this.startPoint.y)
            const finalPoint = Point.move(new Point(bx, by), new Distance(-e.deltaX, -e.deltaY))
            
            const finalScale = this.scale * scale
            this.drawBackground(finalPoint, finalScale)
            if (type === 'pinchend') {
                this.startPoint = finalPoint
                this.scale = finalScale
            }
        }
    }
}