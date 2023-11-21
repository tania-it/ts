export function colorSpan() {
    const mainElem = document.getElementById('main');
    const spanCollection_2 = mainElem
        ? Array.from(mainElem.querySelectorAll<HTMLElement>('[data-color]'))
        : [];

    spanCollection_2.forEach((spanEl) => {
    //   console.log(colorValue);

        function paintBg() {
            const colorValue = spanEl.textContent;

            if (colorValue) {
                spanEl.style.setProperty('background-color', colorValue);

                setTimeout(() => {
                    spanEl.style.removeProperty('background-color');
                }, 1_000);
            }
        }
        spanEl.addEventListener('click', paintBg);

        setTimeout(() => {
            spanEl.removeEventListener('click', paintBg);
        }, 5_000);
    });
}
// step 2 
