const mainEl = document.getElementById ('main');
const spanCollection = mainEl 
? Array.from(mainEl.querySelectorAll<HTMLElement>('[data-color]'))
:[];

spanCollection.forEach((spanEl) => {
    const colorValue = spanEl.textContent;

   if (colorValue) { 
spanEl.onclick = () => {
    spanEl.style.backgroundColor = colorValue;
}


    
   }
});
