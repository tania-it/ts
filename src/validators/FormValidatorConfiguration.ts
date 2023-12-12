import { ValidatorFunction } from "./ValidatorFunction";

export type FormValidatorConfiguration<T extends object> = {
    [Property in keyof T]? : ValidatorFunction<T[Property]>[];

}