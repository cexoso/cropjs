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
export interface IObj { [name: string]: any }

export function merge(o: IObj = {}, d: IObj) {
    const res = { ...o }
    if (d) {
        Object.keys(d).forEach(key => {
            const value = d[key];
            if (typeof value === 'object') {
                res[key] = merge(res[key], value);
            } else {
                res[key] = value
            }
        })
    }
    return res;
}
export function hasKey(o: any, keys: string) {
    return o && keys.split(',').some(key => Object.prototype.hasOwnProperty.call(o, key.trim()));
}