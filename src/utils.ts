export function onclick(dom: HTMLElement, eventHandle: (e: Event) => any) {
    dom.addEventListener('click', eventHandle)
}