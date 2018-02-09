import Mitt, { EventHandle } from './mitt'
import { IStatusOption } from './types'
import { onclick } from './utils'
import styles from './assets/style/style.css'

export default class StatusBar {
    private emitter: Mitt
    constructor(div: HTMLElement, options: IStatusOption) {
        const fragment = document.createDocumentFragment()
        this.emitter = new Mitt()
        if (options.zoom) {
            fragment.appendChild(this.creataBotton('缩小', 'zoomOut',styles.toolItem));
        }
        fragment.appendChild(this.creataBotton('裁剪', 'crop',styles.toolItem));
        if (options.zoom) {
            fragment.appendChild(this.creataBotton('放大', 'zoomIn',styles.toolItem));
            fragment.appendChild(this.creataBotton('放大', 'zoomIn',styles.toolItem));            
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
        wrap.setAttribute('class',styles.toolItemBox);
        wrap.appendChild(dom);
        return wrap;
    }
}