/*import { colorSpan } from './colorSpan';
colorSpan(); */

import { COLORS } from "./colors";
import { createElementByColor } from "./createElementByColor";


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

const fragment = document.createDocumentFragment();
COLORS.forEach((color) => {
    fragment.appendChild(createElementByColor(color));
})
mainEl?.appendChild(fragment);


/*const coloredElements = COLORS.map((color) => createElementByColor(color));
for (const coloredElement of coloredElements) {
    mainEl?.append(...coloredElements);
}
*/

mainEl?.addEventListener('click', (event) => {
    const targetEl = event.target as HTMLElement;
    const coloredEl = targetEl.closest<HTMLElement>('[data-color]');

    if (coloredEl) {
        const colorValue = coloredEl.getAttribute('data-color');
        coloredEl.style.setProperty('background-color', colorValue);
    }

})



