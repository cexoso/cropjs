import x from './assets/style/style.css'
const styles = x as any
import CropperBorder from './cropperBorder'
import ImgDrawer from './imgDrawer'
import Mitt, { EventHandle } from './mitt'
import Preview from './preview'
import StatusBar from './statusBar'
import { Ioptions } from './types';
import { addCls, removeCls } from './utils'

type DOM = string | HTMLElement
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
    containerSize: 'fullScreen',
    result: {
        type: 'base64',
        mimeType: '',
        quality: 1
    }
}

export default class Crop {
    private imgDrawer: ImgDrawer
    private borderDrawer: CropperBorder
    private statusBar: StatusBar
    private emitter: Mitt
    private option: Ioptions
    private container: HTMLElement
    constructor(dom: DOM, options = {}) {
        this.option = { ...defaultOptions, ...options }
        this.initDom(dom, this.option);
        this.emitter = new Mitt();
    }
    public show(type: string) {
        addCls(this.container, styles.full); // todo 暂时只支持全屏展示
        if (this.option.containerSize === 'fullScreen') {
            const { clientWidth, clientHeight } = document.body
            this.imgDrawer.init(clientWidth, clientHeight)
            this.borderDrawer.init(clientWidth, clientHeight);
        }
    }
    public hide() {
        removeCls(this.container, styles.full);
    }
    public reset() {
        // todo
    }
    public addEventListener(eventName: string, eventHandle: EventHandle) {
        return this.emitter.on(eventName, eventHandle)
    }
    public setImg(img: ImageBitmap) {
        return this.imgDrawer.setImg(img)
    }
    private initDom(dom: DOM, options: Ioptions) {
        const container = typeof dom === 'string' ? document.querySelector(dom) as HTMLElement : dom
        this.container = container;
        container.setAttribute('class', styles.container);
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
                height: "40px", // 一行40px,四个一行
            }, styles.statusBar),
            options.statusOpts
        )
        this.statusBar.addEventListener('zoomIn', console.log)
        this.statusBar.addEventListener('zoomOut', console.log)
        this.statusBar.addEventListener('crop', this.getCropData.bind(this))
        this.statusBar.addEventListener('cancel', () => {
            this.emitter.emit('cancel');
        })
    }
    private getCropData() {
        const { imgDrawer, borderDrawer, option: { result: { mimeType, quality } } } = this
        const imageData = imgDrawer.getImageData(borderDrawer.getRect())
        const preview = new Preview(imageData);
        const promise = this.option.result.type === 'blob' ? preview.toBlob(mimeType, quality) : Promise.resolve(preview.toDataUrl(mimeType, quality));
        promise.then(res => { this.emitter.emit('crop', res) })

    }
}