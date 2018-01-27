import Crop from '../src/index.js';
import imgSrc from './img.jpg';

const crop = new Crop({
    selectot: '#cvs',
    imgSrc
});

console.log(crop);
