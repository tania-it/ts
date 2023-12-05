import { ValidatorResult } from "./ValidatorResult";

export interface ValidatorFunction<Value> {
    (value: Value): ValidatorResult;
}
