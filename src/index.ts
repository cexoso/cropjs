import CropperBorder from './type/cropperBorder'
import ImgDrawer from './type/imgDrawer'
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
        border: 1.3, // 边框的长宽比 如：1.5 长宽比为1.5 : 1
        left: 0.5, // 50%
        size: 0.6, // 框架大小，相对于整个canvas比例 size: 0.8 canvas宽度的0.8
        top: 0.3, // 30%
    },
    panImg: true,
    pinchImg: true,
}
export default class Crop {
    private imgDrawer: ImgDrawer
    private borderDrawer?: ImgDrawer
    constructor(options) {
        Object.assign(options, defaultOptions)
        this.initDom(options);
    }
    public async setImg(getImg: () => Promise<ImageBitmap>) {
        return this.imgDrawer.setImg(getImg)
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
        this.imgDrawer = this.makrLayerAndInsert(container, "0", "initial", (canvas) => new ImgDrawer(canvas, options))
        if (options.fixCropOpts) {
            this.borderDrawer = this.makrLayerAndInsert(container, "1", "none", (canvas) => new CropperBorder(canvas, options.fixCropOpts))
        }
    }
}