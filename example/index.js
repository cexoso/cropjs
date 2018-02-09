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

// (function() {
//     var script = document.createElement('script');
//     script.src = '//cdn.jsdelivr.net/npm/eruda';
//     document.body.appendChild(script);
//     script.onload = function() {
//         eruda.init();
//     };
// })();
