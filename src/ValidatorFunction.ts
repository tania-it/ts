import { ValidatorResult } from "./ValidatorResult";

export interface ValidatorFunction<Value> {
    (value: Value): ValidatorResult;
}

export const nonEmptyArray: ValidatorFunction<unknown[]> = (value) => {
    return value.length ? null : {nonEmptyArray : true};
};

 export const requiredText: ValidatorFunction<string> = (value) => {
    return value.trim().length ? null : {requiredText: true};
 };
