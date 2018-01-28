import Crop from '../src/index';
import imgSrc from './img.jpg';

const crop = new Crop({
    selectot: '#cvs',
    imgSrc
});

console.log(crop);
