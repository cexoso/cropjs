import Crop from '../src/index';

const crop = new Crop({
    selector: '#cvs'
});

window.onload = function() {
    const input = document.getElementById('file');
    input.addEventListener('change', handleInput);
};

function handleInput() {
    const pathToBase = () => {
        return new Promise(resolve => {
            const image = document.createElement('img');
            image.onload = function() {
                showInputBox(false);
                // setTimeout(()=>)
                resolve(image);
            };
            image.src = window.URL.createObjectURL(this.files[0]);
        });
    };
    crop.setImg(pathToBase);
}

function showInputBox(show) {
    const inputBox = document.getElementById('file-input');
    const cvs = document.getElementById('cvs');
    if (show) {
        inputBox.style.display = 'block';
        cvs.style.display = 'none';
    } else {
        inputBox.style.display = 'none';
        cvs.style.display = 'block';
    }
}
