import Crop from '../src/index';
import imgSrc from './img.jpg';

const crop = new Crop({
    selector: '#cvs'
});
function pathToBase() {
    return new Promise(resolve => {
        const image = new Image();
        image.onload = function() {
            resolve(image);
        };
        image.src = imgSrc;
    });
}
crop.setImg(pathToBase);
(function() {
    var script = document.createElement('script');
    script.src = '//cdn.jsdelivr.net/npm/eruda';
    document.body.appendChild(script);
    script.onload = function() {
        eruda.init();
    };
})();
