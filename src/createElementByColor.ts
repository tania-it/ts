export function createElementByColor(color: string): HTMLElement {
    const el = document.createElement('span');

    el.setAttribute('data-color', color);
    el.textContent = color;
    

    return el;
}