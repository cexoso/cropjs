import Crop from '../src/index';

const crop = new Crop({
    selector: '#cvs',
    result: {
        type: 'blob'
    }
});
crop.addEventListener('crop', res => {
    console.log(res);
});
window.onload = function() {
    const input = document.getElementById('file');
    const inputBox = document.getElementById('file-input');
    const esc = document.getElementById('esc');
    esc.addEventListener('click', () => openCrop(false));
    input.addEventListener('change', handleInput);
    window.addEventListener('keyup', function(e) {
        if (e.keyCode === 27) {
            openCrop(false);
        }
    });

    function handleInput() {
        if (this.files[0]) {
            const pathToBase = () => {
                return new Promise(resolve => {
                    const image = document.createElement('img');
                    image.onload = function() {
                        openCrop(true);
                        resolve(image);
                    };
                    image.src = window.URL.createObjectURL(this.files[0]);
                });
            };
            crop.setImg(pathToBase);
        }
    }

    function openCrop(show) {
        if (show) {
            inputBox.style.display = 'none';
        } else {
            inputBox.style.display = 'block';
            input.value = null;
        }
    }
};
