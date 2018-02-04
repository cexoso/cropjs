import Distance from './distance'
export default class Point {
    public static getDistenceBetween(p1: Point, p2: Point) {
        return new Distance(p1.x - p2.x, p1.y - p2.y)
    }
    public static move(p: Point, distance: Distance) {
        return new Point(p.x - distance.deltaX, p.y - distance.deltaY);
    }
    public x: number
    public y: number
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
