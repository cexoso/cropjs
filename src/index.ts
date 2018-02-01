import Drawer from './drawer'

type base64 = string
export default class Crop {
    private imgDrawer: Drawer
    constructor(options) {
        const container = document.querySelector(options.selectot) as HTMLElement;
        const canvas = document.createElement("canvas")
        container.appendChild(canvas);
        this.imgDrawer = new Drawer(canvas);
    }
    public async setImg(getImg: () => Promise<any>) {
        const base = await getImg();
        this.imgDrawer.drawImg(base);
    }
}
