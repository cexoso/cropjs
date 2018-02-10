import './assets/style.css'
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
        dom.className = "crop_tool_item"
        dom.innerText = name
        onclick(dom, (e) => this.emitter.emit(eventName, e))
        const wrap = document.createElement('div');
        wrap.className = "crop_tool_item_box"
        wrap.appendChild(dom);
        return wrap;
    }
}