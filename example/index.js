import Crop from '../src/index';
import imgSrc from './img.jpg';

const crop = new Crop('#cvs');
setTimeout(() => {
    crop.show();
    const image = new Image();
    image.onload = function() {
        crop.setImg(image);
    };
    image.src = imgSrc;
}, 700);
setTimeout(() => {
    crop.setOptions({
        cropOpts: {
            border: 1.5, // 边框的长宽比 如：1.5 长宽比为1.5 : 1
            left: 0.5, // 50%
            size: 0.6, // 框架大小，相对于整个canvas比例 size: 0.8 canvas宽度的0.8
            top: 0.5 // 30%
        }
    });
}, 1300);

// (function() {
//     var script = document.createElement('script');
//     script.src = '//cdn.jsdelivr.net/npm/eruda';
//     document.body.appendChild(script);
//     script.onload = function() {
//         eruda.init();
//     };
// })();
