import { ValidatorFunction, nonEmptyArray, requiredText } from "./ValidatorFunction";

export function composeValidators<T>(...validators: ValidatorFunction<T>[]) : ValidatorFunction<T>{
    return (value: T) : ValidatorResult => {
        for (const validator of validators) {
            const result = validator(value);

            if (result) {
                return result;
            }
        }
        return null;
    };
}


const requiredFIO =  composeValidators (
    requiredText,
    (value) => value.length <= 50 ? null : {maxLength: true},
);

requiredFIO ('Ivanov');