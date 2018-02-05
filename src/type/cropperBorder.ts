// tslint:disable:object-literal-sort-keys
const style = {
    bottom: 0,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(100,100,100,0.6)',
    pointerEvents: 'none',
    width: '100%',
}
// tslint:enable
export default class CropperBorder {
    private dom: HTMLDivElement
    constructor(options) {
        const {
            border,
            size,
        } = options;
        const cropper = document.createElement('div')
        Object.assign(cropper.style, style)
        this.dom = cropper
    }
    public getDom() {
        return this.dom;
    }
}