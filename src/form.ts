import { FormValidator } from "./FormValidator";
import { maxLength, nonEmptyArray, requiredText } from "./validators";

const pizzaOrderForm = document.forms.namedItem('pizzaOrder');

interface PizzaOrder {
    pizzas: string[];
    addons:string[];
    paymentType:string;
    customerName:string;
    shippingAddress:string;
}

const pizzaOrderValidator = new FormValidator<PizzaOrder> ({
        pizzas: [
            nonEmptyArray,
        ],
        paymentType: [
            requiredText,
        ],
        customerName: [
            requiredText,
            maxLength (100),
        ],
        shippingAddress: [
            requiredText,
            maxLength (200),
        ],  
});

pizzaOrderForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(pizzaOrderForm);
    console.log (formData);
    const pizzaOrder: PizzaOrder = {
        pizzas: formData.getAll ('pizza') as string[],
        addons: formData.getAll ('addon') as string[],
        paymentType: String(formData.get('paymentType')),
        customerName: String(formData.get('customerName')).trim(),
        shippingAddress: String(formData.get('shippingAddress')).trim(),
    };


    const errors = pizzaOrderValidator.validate(pizzaOrder);

    console.log(pizzaOrder);
    console.log(errors); // выводим сообщение об ошибках
});

function buildTemplateString(text, data) {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
		console.log(key);
        return Object.hasOwn(data, key) ? String(data[key]) : match;
    });
} 

let res = buildTemplateString( 'У вас {{count}} товаров в корзине', {count: 6});
console.log(res);

