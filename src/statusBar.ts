import Mitt, { EventHandle } from './mitt'
import { IstatusOption } from './types'
import { onclick } from './utils'

export default class StatusBar {
    private emitter: Mitt
    constructor(div: HTMLElement, options: IstatusOption) {
        const fragment = document.createDocumentFragment()
        this.emitter = new Mitt()
        if (options.zoom) {
            fragment.appendChild(this.creataBotton('缩小', 'zoomOut','tool-item'));
        }
        fragment.appendChild(this.creataBotton('裁剪', 'crop','tool-item'));
        if (options.zoom) {
            fragment.appendChild(this.creataBotton('放大', 'zoomIn','tool-item'));
            fragment.appendChild(this.creataBotton('放大', 'zoomIn','tool-item'));            
        }
        div.appendChild(fragment)
    }
    public addEventListener(eventName: string, eventHandle: EventHandle) {
        return this.emitter.on(eventName, eventHandle)
    }
    private creataBotton(name: string, eventName: string,className: string) {
        const dom = document.createElement('span');
        dom.setAttribute('class',className)
        dom.innerText = name
        onclick(dom, (e) => this.emitter.emit(eventName, e))
        const wrap = document.createElement('div');
        wrap.setAttribute('class',className+'-box');
        wrap.appendChild(dom);
        return wrap;
    }
}