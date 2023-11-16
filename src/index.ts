const mainEl = document.getElementById ('main');
const spanCollection = mainEl 
? Array.from(mainEl.querySelectorAll('span'))
:[];

spanCollection.forEach((spanEl) => {
    const colorValue = spanEl.textContent;

   if (colorValue) { 
     spanEl.style.backgroundColor = colorValue
   }
});
