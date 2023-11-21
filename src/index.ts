import { colorSpan } from './colorSpan';
colorSpan();

/*
const mainEl = document.getElementById('main');
const spanCollection = mainEl
    ? Array.from(mainEl.querySelectorAll<HTMLElement>('[data-color]'))
    : [];

spanCollection.forEach((spanEl) => {
    function paintBg() {
        const colorValue = spanEl.textContent;

        spanEl.style.setProperty('background-color', colorValue);
        setTimeout(() => {
            spanEl.style.removeProperty('background-color');
        }, 1_000);
    }

    spanEl.addEventListener('click', paintBg);


    setTimeout(() => {
        spanEl.removeEventListener('click', paintBg);
    }, 5_000);
});*/
