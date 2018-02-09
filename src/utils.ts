export function onclick(dom: HTMLElement, eventHandle: (e: Event) => any) {
    dom.addEventListener('click', eventHandle)
}
export function now() {
    return performance.now(); // for no imcompatible
}

export function addCls(dom: HTMLElement, className: string) {
    return dom.classList.add(className)
}
export function removeCls(dom: HTMLElement, className: string) {
    return dom.classList.remove(className)
}