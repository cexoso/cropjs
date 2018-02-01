import ImgDrawer from './imgDrawer'

type base64 = string
export default class Crop {
    private imgDrawer: ImgDrawer
    constructor(options) {
        this.init(options);
        this.imgDrawer.onDrag(this.dragBackground.bind(this))
    }
    public async setImg(getImg: () => Promise<any>) {
        const base = await getImg();
        this.imgDrawer.drawImg(base);
    }
    private init(options) {
        const container = document.querySelector(options.selectot) as HTMLElement;
        const canvas = document.createElement("canvas")
        container.appendChild(canvas);
        this.imgDrawer = new ImgDrawer(canvas);
    }
    private dragBackground(e) {
        console.info(e.current);
    }
}
