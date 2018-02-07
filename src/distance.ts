export default class Distance {
    public static add(distance1: Distance, distance2: Distance) {
        return new Distance(distance1.deltaX + distance2.deltaX, distance1.deltaY + distance2.deltaY)
    }
    public static scale(distance: Distance, s: number) {
        return new Distance(distance.deltaX * s, distance.deltaY * s)
    }
    public deltaX: number
    public deltaY: number
    constructor(x: number, y: number) {
        this.deltaX = x;
        this.deltaY = y;
    }
}

