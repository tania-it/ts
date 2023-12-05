import { FormValidator } from "./FormValidator";
import { maxLength, nonEmptyString, requiredText } from "./validators";


const anketaForm = document.forms.namedItem('Anketa');

interface Anketa {
    first_name: string;
    last_name:string;
    middle_name:string;
    age: number;
    gender:string;
}

const anketaValidator = new FormValidator<Anketa> ({
        first_name: [
            requiredText,
        ],
        last_name: [
            requiredText,
        ],
        middle_name: [
            requiredText,
            maxLength (100),
        ],
        age: [
        //    maxLength (3),
        ],
        gender: [
            requiredText,
        ]

});

anketaForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(anketaForm);
    console.log (formData);
    const fillAnketa: Anketa = {
        first_name: String(formData.get('first_name')),
        last_name: String(formData.get('last_name')),
        middle_name: String(formData.get('middle_name')),
        age: Number(formData.get('age')),
        gender: String(formData.get('gender')),
    };


    const errors = anketaValidator.validate(fillAnketa);

    console.log(fillAnketa);
    console.log(errors); // выводим сообщение об ошибках
});

