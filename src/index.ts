/*import { colorSpan } from './colorSpan';
colorSpan(); */


const mainEl = document.getElementById('main');
/*const spanCollection = mainEl
    ? Array.from(mainEl.querySelectorAll<HTMLElement>('[data-color]'))
    : [];

spanCollection.forEach((spanEl) => {
    function paintBg() {
        const colorValue = spanEl.textContent;

        spanEl.style.setProperty('background-color', colorValue);
        
    }
    spanEl.addEventListener('click', paintBg);
 
}); */

mainEl?.addEventListener('click', (event) => {
    const targetEl = event.target as HTMLElement;
    const coloredEl = targetEl.closest<HTMLElement>('[data-color]');

    if (coloredEl) {
        coloredEl.style.setProperty('background-color', coloredEl.textContent);
    }

})
