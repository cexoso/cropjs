window.onload = function() {
    const tips = document.getElementById('file-input-tips');
    const input = document.getElementById('file');
    tips.onclick = function() {
        input.click();
    };
};
