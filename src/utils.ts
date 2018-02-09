export function onclick(dom: HTMLElement, eventHandle: (e: Event) => any) {
    dom.addEventListener('click', eventHandle)
}
export function now() {
    return performance.now(); // for no imcompatible
}