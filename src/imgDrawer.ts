import * as all from 'hammerjs'
import Distance from './distance'
import DrawerLayer from './drawerLayer'
import Point from './point'
import { IImgOption } from './types'

const Hammer: HammerStatic = (all as any).default // typed is wrong
export default class ImgDrawe extends DrawerLayer {
    private background: ImageBitmap
    private scale = 1
    private startPoint = new Point(0, 0)
    constructor(canvas: HTMLCanvasElement, options: IImgOption) {
        super(canvas)
        this.initEvent(canvas, options)
    }
    public init(w?: number, h?: number) {
        super.init(w, h);
        if (this.background) {
            this.drawBackground(this.startPoint, this.scale)
        }
    }
    public reset() {
        this.startPoint = new Point(0, 0)
        this.scale = 1;
    }
    public setImg(img: ImageBitmap) {
        this.background = img
        this.drawBackground(new Point(0, 0), 1);
    }
    private drawBackground(startPoint: Point, scale: number) {
        this.drawImg(this.background, startPoint.x, startPoint.y, scale);
    }
    private initEvent(canvas: HTMLCanvasElement, options: IImgOption) {
        const hammertime = new Hammer(canvas);
        hammertime.get('pan').set({ direction: (Hammer as any).DIRECTION_ALL });
        hammertime.get('pinch').set({ enable: true });
        if (options.panImg) {
            hammertime.on('pan panend', this.panBackground.bind(this))
        }
        if (options.pinchImg) {
            hammertime.on('pinch pinchend', this.pinchBackground.bind(this))
        }
    }
    private panBackground(e: HammerInput) {
        if (this.background !== null) {
            const p = Point.move(this.startPoint, new Distance(-e.deltaX, -e.deltaY))
            this.drawBackground(p, this.scale);
            if (e.type === 'panend') {
                this.startPoint = p
            }
        }
    }
    private pinchBackground(e: HammerInput) {
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