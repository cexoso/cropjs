export default class CropperBorder {
    private dom: HTMLDivElement
    private a: any
    constructor(options) {
        const {
            border,
            size,
        } = options;
        const cropper = document.createElement('div')
        cropper.innerText = '123'
        this.a = a;
        
        this.dom = cropper
    }
    public getDom() {
        return this.dom;
    }
}