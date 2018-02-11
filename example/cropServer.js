import Crop from '../src/index';

const raf = requestAnimationFrame;
let _cropper = null;
const { document } = window;
export default function getCropper() {
    if (!_cropper) {
        const container = document.createElement('div');
        _cropper = new Promise(resolve => {
            const instance = new Crop(container, {
                result: {
                    type: 'all'
                }
            });
            document.body.appendChild(container);
            raf(() => raf(() => resolve(instance)));
        });
    }
    return _cropper;
}
export function doCrop(url, opts) {
    return new Promise(resolve => {
        const img = new window.Image();
        img.onload = function() {
            getCropper().then(cropper => {
                cropper.reset();
                if (opts) {
                    cropper.setOptions(opts);
                }
                cropper.show('fullScreen');
                cropper.setImg(img);
                const result = type => data => {
                    cropper.hide();
                    resolve({ type, data });
                };
                cropper.addEventListener('crop', result('crop'));
                cropper.addEventListener('cancel', result('cancel'));
            });
        };
        img.src = url;
    });
}
