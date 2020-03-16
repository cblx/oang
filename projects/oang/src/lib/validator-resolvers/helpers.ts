import { ExtendedSchemaObject } from '../extended-schema-object';
import { ValidatorFn } from '@angular/forms';

export function wrapFn(schema: ExtendedSchemaObject, fn: ValidatorFn, messagePath: string){
    let validationMessages = schema['x-validationMessages'] || {};
    return ctrl => {
        let errors = fn(ctrl);
        if(errors){
            for(let prop in errors){
                errors[prop] =  validationMessages[messagePath] || true;
                break;
            }
            return errors;
        }
    };
}