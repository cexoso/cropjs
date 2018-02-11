import { doCrop } from './cropServer';
const prepend = (container, dom) => {
    const { firstChild } = container;
    if (firstChild) {
        return container.insertBefore(dom, firstChild);
    }
    return container.append(dom);
};
const realFile = document.getElementById('real_file');
const preview = document.getElementById('preview');
realFile.addEventListener('change', e => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    doCrop(url).then(res => {
        const { type, data: { blob, dataUrl } } = res;
        if (type === 'crop') {
            const img = new Image();
            img.src = dataUrl;
            console.log(blob);
            // Use form upload blob to backend
            // const form = new FormData();
            // form.append('img', blob);
            prepend(preview, img);
        }
    });
});
