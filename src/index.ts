const mainEl = document.getElementById ('main');
const spanCollection = mainEl 
? Array.from(mainEl.querySelectorAll<HTMLElement>('[data-color]'))
:[];

spanCollection.forEach((spanEl) => {
    const colorValue = spanEl.textContent;

function paintBg() {
    const  colorValue = 
    if (colorValue) { 
        spanEl.style.setProperty('bacground-color', colorValue); 
     
}

 
 
} 
setTimeout(() => {
    spanEl.removeEventListener('click',paintBg);
  }, 1_000);
});

