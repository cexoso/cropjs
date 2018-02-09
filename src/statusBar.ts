import * as styles from './assets/style/style.css'
import Mitt, { EventHandle } from './mitt'
import { IStatusOption } from './types'
import { onclick } from './utils'

export default class StatusBar {
    private emitter: Mitt
    constructor(div: HTMLElement, options: IStatusOption) {
        const fragment = document.createDocumentFragment()
        this.emitter = new Mitt()
        fragment.appendChild(this.creataBotton('裁剪', 'crop'));
        if (options.zoom) {
            fragment.appendChild(this.creataBotton('缩小', 'zoomOut'));
            fragment.appendChild(this.creataBotton('放大', 'zoomIn'));
        }
        fragment.appendChild(this.creataBotton('取消', 'cancel'));
        div.appendChild(fragment)
    }
    public addEventListener(eventName: string, eventHandle: EventHandle) {
        return this.emitter.on(eventName, eventHandle)
    }
    private creataBotton(name: string, eventName: string) {
        const dom = document.createElement('span');
        dom.className = styles.toolItem
        dom.innerText = name
        onclick(dom, (e) => this.emitter.emit(eventName, e))
        const wrap = document.createElement('div');
        wrap.className = styles.toolItemBox
        wrap.appendChild(dom);
        return wrap;
    }
}