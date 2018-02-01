import Crop from '../src/index';
import imgSrc from './img.jpg';

const crop = new Crop({
    selectot: '#cvs'
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
