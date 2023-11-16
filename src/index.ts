const mainEl = document.getElementById ('main');
const spanCollection = mainEl 
? Array.from(mainEl.querySelectorAll<HTMLElement>('[data-color]'))
:[];

spanCollection.forEach((spanEl) => {
    const colorValue = spanEl.textContent;

   if (colorValue) { 
  spanEl.addEventListener('click', () => {
    spanEl.style.backgroundColor = colorValue;
  }, { once: true });
}
});
