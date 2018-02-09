export interface ICropOption {
    border: number, // 边框的长宽比 如：1.5 长宽比为1.5 : 1
    left: number, // 50%
    size: number, // 框架大小，相对于整个canvas比例 size: 0.8 canvas宽度的0.8
    top: number, // 30%
}
export interface IImgOption {
    panImg: boolean,
    pinchImg: boolean,
}
export interface IStatusOption {
    zoom: boolean
}
export interface IResult {
    type: 'blob' | 'base64',
    mimeType: string,
    quality: number
}
export interface Ioptions {
    cropOpts: ICropOption
    imgOpts: IImgOption
    selector: string // seletor container DOM
    statusOpts: IStatusOption
    result: IResult
}
export type Rect = [number, number, number, number]