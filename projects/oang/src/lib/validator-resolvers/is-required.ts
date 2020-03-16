import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorResolver, ValidatorResolverContext } from '../oang-engine';
import { wrapFn } from './helpers';

@Injectable()
export class IsRequiredValidatorResolver implements ValidatorResolver {
    constructor() { }
    resolve(context: ValidatorResolverContext): ValidatorFn {
        if (context.controlInfo.schema['x-isRequired']) {
            return wrapFn(context.controlInfo.schema, Validators.required, 'required');
        }
    }
}
