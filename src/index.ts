import * as Hammer from 'hammerjs'
import CropperBorder from './type/cropperBorder'
import Distance from './type/distance'
import DrawerLayer from './type/drawerLayer'
import Point from './type/point'
// tslint:disable:object-literal-sort-keys
const layerStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%"
}
// tslint:enable:object-literal-sort-keys
type base64 = string
const defaultOptions = {
    fixCropOpts: {
        border: 1.618, // 边框的长宽比 如：1.5 长宽比为1.5 : 1
        size: 0.8 // 框架大小，相对于整个canvas比例 size: 0.8 canvas宽度的0.8
    },
    panImg: true,
    pinchImg: true,
}
export default class Crop {
    private imgDrawer: DrawerLayer
    private borderDrawer?: DrawerLayer
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
    private makrLayerAndInsert(container: HTMLElement, zIndex: string, pointerEvent: string, factor) {
        const canvas = document.createElement("canvas")
        canvas.style.zIndex = zIndex
        canvas.style.pointerEvents = pointerEvent
        canvas.style.position = "absolute"

        container.appendChild(canvas)
        return factor(canvas);
    }
    private initDom(options) {
        const container = document.querySelector(options.selectot) as HTMLElement;
        container.style.position = "relative"
        this.imgDrawer = this.makrLayerAndInsert(container, "0", "initial", (canvas) => new DrawerLayer(canvas))
        if (options.fixCropOpts) {
            this.borderDrawer = this.makrLayerAndInsert(container, "1", "none", (canvas) => new CropperBorder(canvas, options))
        }
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