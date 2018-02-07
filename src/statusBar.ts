import Mitt from 'mitt'
import { IstatusOption } from './types'
import { onclick } from './utils'

export default class StatusBar {
    private emitter: Mitt.Emitter
    constructor(div: HTMLElement, options: IstatusOption) {
        const fragment = document.createDocumentFragment()
        this.emitter = new Mitt()
        if (options.zoom) {
            fragment.appendChild(this.creataBotton('缩小', 'zoomOut'));
        }
        fragment.appendChild(this.creataBotton('裁剪', 'crop'));
        if (options.zoom) {
            fragment.appendChild(this.creataBotton('放大', 'zoomIn'));
        }
        div.appendChild(fragment)
    }
    public addEventListener(eventName: string, eventHandle: Mitt.Handler) {
        return this.emitter.on(eventName, eventHandle)
    }
    private creataBotton(name: string, eventName: string) {
        const dom = document.createElement('span');
        dom.innerText = name
        onclick(dom, (e) => this.emitter.emit(eventName, e))
        return dom;
    }
}