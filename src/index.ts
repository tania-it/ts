const mainEl = document.getElementById ('main');
const spanCollection = mainEl 
? Array.from(mainEl.querySelectorAll<HTMLElement>('[data-color]'))
:[];

spanCollection.forEach((spanEl) => {
    const colorValue = spanEl.textContent;

   if (colorValue) { 
    const paintBg = () => {spanEl.style.backgroundColor = colorValue};
     spanEl.addEventListener('click', paintBg);

  setTimeout(() => {
    spanEl.removeEventListener('click',paintBg);
  }, 5_000);
}
});
