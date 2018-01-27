export default class Crop {
    constructor(options) {
        this.canvas = this._getCanvas(options.selectot);
        const img = this._getImg(options.imgSrc);
        console.log(img);
    }

    _getCanvas(selectot) {
        return document.querySelector(selectot);
    }

    async _getImg(imgSrc) {
        const img = new Image();
        img.src = imgSrc;
        img.onload = function(e) {
            console.log(e);
        };
    }
}
