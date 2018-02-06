import CropperBorder from './cropperBorder'
import ImgDrawer from './imgDrawer'
import StatusBar from './statusBar'
import { Ioptions } from './types'
type base64 = string
const defaultOptions: Ioptions = {
    cropOpts: {
        border: 1.3, // 边框的长宽比 如：1.5 长宽比为1.5 : 1
        left: 0.5, // 50%
        size: 0.6, // 框架大小，相对于整个canvas比例 size: 0.8 canvas宽度的0.8
        top: 0.3, // 30%
    },
    imgOpts: {
        panImg: true,
        pinchImg: true,
    },
    statusOpts: {
        zoom: true
    },
    selector: '#croper'
}
export default class Crop {
    private imgDrawer: ImgDrawer
    private borderDrawer?: CropperBorder
    private statusBar?: StatusBar
    constructor(options: Ioptions) {
        this.initDom({ ...defaultOptions, ...options });
    }
    public async setImg(getImg: () => Promise<ImageBitmap>) {
        return this.imgDrawer.setImg(getImg)
    }
    private initDom(options: Ioptions) {
        const container = document.querySelector(options.selector) as HTMLElement;
        container.style.position = "relative"
        function makrLayerAndInsert(tagName: string, style: { zIndex: string, pointerEvent: string, [name: string]: string }) {
            const tag = document.createElement(tagName)
            Object.assign(tag.style, {
                ...style,
                position: "absolute"
            })
            container.appendChild(tag)
            return tag;
        }
        this.imgDrawer = new ImgDrawer(makrLayerAndInsert('canvas', { zIndex: "0", pointerEvent: "initial" }), options.imgOpts)
        if (options.cropOpts) {
            this.borderDrawer = new CropperBorder(makrLayerAndInsert('canvas', { zIndex: "1", pointerEvent: "none" }), options.cropOpts)
        }
        if (options.statusOpts) {
            this.statusBar = new StatusBar(
                makrLayerAndInsert('div', {
                    zIndex: "2",
                    pointerEvent: "initial",
                    bottom: "0",
                    height: "100px",
                    backgroundColor: "#55c5a5a8",
                    left: "0",
                    width: "100%"
                }),
                options.statusOpts
            )
        }
    }
}