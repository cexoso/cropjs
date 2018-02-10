export type EventHandle = (event?: any) => any
export default class Mitt {
    private all: {[name: string]: EventHandle[]} = {}
    public on(type: string, handler: EventHandle) {
        (this.all[type] || (this.all[type] = [])).push(handler);
    }
    public off(type: string, handler: EventHandle) {
        if (this.all[type]) {
            const indexOf = this.all[type].indexOf(handler)
            if (indexOf) {
                this.all[type].splice(indexOf, 1);
            }
        }
    }
    public emit(type: string, evt?: any) {
        (this.all[type] || []).map((handler) => { handler(evt) });
    }
    public reset() {
        this.all = {}
    }
}
