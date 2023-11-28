const pizzaOrderForm = document.forms.namedItem('pizzaOrder');


pizzaOrderForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(pizzaOrderForm);
    console.log (formData);
    const pizzaOrder = {
        pizzas: formData.getAll ('pizza'),
        addons: formData.getAll ('addon'),
        paymentType: formData.get('paymentType'),
        customerName: String(formData.get('customerName')).trim(),
        shippingAddress: String(formData.get('shippingAddress')).trim(),
    };

    console.log(pizzaOrder);
});


