const pizzaOrderForm = document.forms.namedItem('pizzaOrder');


pizzaOrderForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(pizzaOrderForm);
    console.log (formData);
    const pizzaOrder = {
        //pizzas: formData.getAll ('pizza'),
          pizzas: pizzaOrderForm.pizza.value, 

        //addons: formData.getAll ('addon'),
          addons: pizzaOrderForm.addon.value, 

        //paymentType: formData.get('paymentType'),
          paymentType: pizzaOrderForm.paymentType.value,    

        //customerName: String(formData.get('customerName')).trim(),
          customerName: pizzaOrderForm.customerName.value,  

        //shippingAddress: String(formData.get('shippingAddress')).trim(),
        shippingAddress: pizzaOrderForm.shippingAddress.value,
    };
    console.log(pizzaOrder);

});


