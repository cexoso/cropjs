import './assets/style.css'
import CropperBorder from './cropperBorder'
import ImgDrawer from './imgDrawer'
import Mitt, { EventHandle } from './mitt'
import Preview from './preview'
import StatusBar from './statusBar'
import { Ioptions } from './types';
import { addCls, hasKey, IObj, merge, removeCls } from './utils'

type DOM = string | HTMLElement
type base64 = string
const defaultOptions: Ioptions = {
    cropOpts: {
        border: 1.3, // 边框的长宽比 如：1.5 长宽比为1.5 : 1
        left: 0.5, // 50%
        size: 0.6, // 框架大小，相对于整个canvas比例 size: 0.6 canvas宽度的0.6
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
    private isShow: boolean = false
    constructor(dom: DOM, options = {}) {
        this.option = { ...defaultOptions, ...options }
        this.initDom(dom, this.option);
        this.emitter = new Mitt();
    }
    public show() {
        this.isShow = true
        addCls(this.container, "crop_full"); // todo 暂时只支持全屏展示
        this.fresh()
    }
    public hide() {
        this.isShow = false
        removeCls(this.container, "crop_full");
    }
    public reset() {
        this.imgDrawer.reset();
        this.emitter.reset();
    }
    public addEventListener(eventName: string, eventHandle: EventHandle) {
        return this.emitter.on(eventName, eventHandle)
    }
    public setImg(img: ImageBitmap) {
        return this.imgDrawer.setImg(img)
    }
    public setOptions(opts: IObj) {
        this.option = merge(this.option, opts) as Ioptions
        if (this.show && hasKey(opts, "cropOpts, imgOpts")) {
            this.fresh();
        }
    }
    private fresh() {
        if (this.option.containerSize === 'fullScreen') {
            const { clientWidth, clientHeight } = document.body
            this.imgDrawer.init(clientWidth, clientHeight)
            this.borderDrawer.init(clientWidth, clientHeight);
        }
    }
    private initDom(dom: DOM, options: Ioptions) {
        const container = typeof dom === 'string' ? document.querySelector(dom) as HTMLElement : dom
        this.container = container;
        container.setAttribute('class', "crop_container");
        function makrLayerAndInsert(tagName: string, style: { zIndex: string, pointerEvents: string, [name: string]: string }, className = ''): any {
            const tag = document.createElement(tagName)
            tag.setAttribute('class', className)
            Object.assign(tag.style, { ...style, position: "absolute" })
            container.appendChild(tag)
            return tag;
        }
        this.imgDrawer = new ImgDrawer(makrLayerAndInsert('canvas', { zIndex: "1000", pointerEvents: "initial" }), options.imgOpts)
        this.borderDrawer = new CropperBorder(makrLayerAndInsert('canvas', { zIndex: "1001", pointerEvents: "none" }), options.cropOpts)
        this.statusBar = new StatusBar(
            makrLayerAndInsert('div', {
                zIndex: "1002",
                pointerEvents: "initial"
            }, "crop_status_bar"),
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
        const getBlob = () => preview.toBlob(mimeType, quality);
        const getDataUrl = () => Promise.resolve(preview.toDataUrl(mimeType, quality));
        const getAll = () => Promise.all([getBlob(), getDataUrl()]).then(([blob, dataUrl]) => ({ blob, dataUrl }))
        const map: { [name: string]: () => Promise<any> } = {
            blob: getBlob,
            dataUrl: getDataUrl,
            all: getAll
        }
        const promise = map[this.option.result.type]();
        promise.then(res => { this.emitter.emit('crop', res) })

    }
}