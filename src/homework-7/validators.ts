import { ValidatorFunction } from "./ValidatorFunction";

export const nonEmptyString: ValidatorFunction<unknown[]> = (value) => {
    return value.length ? null : {nonEmptyString : true};
};
/********************************************************************************************* */
 export const requiredText: ValidatorFunction<string> = (value) => {
    return value.trim().length ? null : {requiredText: true};
 };

 /********************************************************************************************* */
export const maxLength: (maxLength: number) => ValidatorFunction<string> = (maxLength) => {
return(value) => {
    return value.length <= maxLength ? null : {maxLength: true};
}
}
/********************************************************************************************** */

// ?? return String(value).length <= maxLength ? null : {maxLength: true};  ??
export const min : (min: number) => ValidatorFunction<string> = (min) => {
    return (value) => {
        return value.length >= min ? null : { min: true };
    };
};

/*********************************************************************************************** */

export const requiredNumber: ValidatorFunction<number> = (value: number) => {
    return Number(value) ? null : {requiredNumber: true};
}















/*const max = (max) => {
    return (value) => {
        return value <= max ? null : { max: true };
    };
};
*/