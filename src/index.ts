import CropperBorder from './cropperBorder'
import ImgDrawer from './imgDrawer'
import Preview from './preview'
import StatusBar from './statusBar'
import { Ioptions } from './types'
import './assets/style/style.css'

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
    private borderDrawer: CropperBorder
    private statusBar: StatusBar
    constructor(options: Ioptions) {
        this.initDom({ ...defaultOptions, ...options });
    }
    public setImg(getImg: () => Promise<ImageBitmap>) {
        return this.imgDrawer.setImg(getImg)
    }
    private initDom(options: Ioptions) {
        const container = document.querySelector(options.selector) as HTMLElement;
        container.style.position = "relative"
        function makrLayerAndInsert(tagName: string, style: { zIndex: string, pointerEvents: string, [name: string]: string }, className = ''): any {
            const tag = document.createElement(tagName)
            tag.setAttribute('class', className)
            Object.assign(tag.style, { ...style, position: "absolute" })
            container.appendChild(tag)
            return tag;
        }
        this.imgDrawer = new ImgDrawer(makrLayerAndInsert('canvas', { zIndex: "0", pointerEvents: "initial" }), options.imgOpts)
        this.borderDrawer = new CropperBorder(makrLayerAndInsert('canvas', { zIndex: "1", pointerEvents: "none" }), options.cropOpts)
        this.statusBar = new StatusBar(
            makrLayerAndInsert('div', {
                zIndex: "2",
                pointerEvents: "initial",
                bottom: "0",
                height: "40px", //一行40px,四个一行
                left: "0",
                width: "100%"
            }, 'status-bar'),
            options.statusOpts
        )
        this.statusBar.addEventListener('zoomIn', console.log)
        this.statusBar.addEventListener('zoomOut', console.log)
        this.statusBar.addEventListener('crop', this.getCropData.bind(this))
    }
    private getCropData() {
        const imageData = this.imgDrawer.getImageData(
            this.borderDrawer.getRect()
        )
        const preview = new Preview(imageData);
        const dataUrl = preview.toDataUrl()
        const img = new Image()
        img.src = dataUrl
        document.body.appendChild(img)
    }
}