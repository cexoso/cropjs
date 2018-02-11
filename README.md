# cropjs
A cropper base on mobile.Use canvas show and crop.

# example
example at [https://cexoso.github.io/cropjs](https://cexoso.github.io/cropjs). Use mobile visit will be better.
# api
## get instance
```javascript
import Crop from 'canvas_cropjs'
const crop = new Crop(ele, opt);
```
### ele: string or DOM. The container crop will be in. If string is receipted, document.querySelector will be called to get a DOM.
### opts: 
* cropOpts
```javascript
{
    border: 1.3, // border aspect ratio
    left: 0.5, // 50%
    size: 0.6, // size of border box，Relative to width of canvas.
    top: 0.3, // 30%
}
statusOpts: {
        zoom: true
    },
    result: {
        type: 'base64',
        mimeType: '',
        quality: 1
    }
```
* statusOpts
```javascript
{
    zoom: true // Add clickable Element for scaling .
}
```
* result
```javascript
{
    type: 'base64' | 'blob' | 'all', // export base64,blob, of all of they.
    mimeType: 'image/png' | 'image/jpeg', // The mimeType of export blob
    quality: 1 // 0~1 quality
}
```
## add eventListener
```javascript
crop.addEventListener('crop', onCrop);
// cancel and crop can be Listened.
```
## set img
set img to crop
```javascript
const img = new Image();
img.src = URL.createObjectURL(file);
crop.setImg(Img);
```
## reset
reset crop for next crop.
```javascript
crop.reset();
```
## show hide
show or hide the crop.
```javascript
crop.show()
crop.hide()
```





# development
1. run `yarn` or `npm i` to install Dependencies
2. run `yarn start` or `npm start` to open development environment.

# depoly
The `example` folder includes exmaple source. And run yarn deploy will deploy example to homepage(https://cexoso.github.io/cropjs/).
