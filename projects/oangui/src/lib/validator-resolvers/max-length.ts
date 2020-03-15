import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorResolver, ValidatorResolverContext } from '../oang-engine';

@Injectable()
export class MaxLengthValidatorResolver implements ValidatorResolver {
    constructor() { }
    resolve(context: ValidatorResolverContext): ValidatorFn {
        if (context.controlInfo.schema.maxLength) {
            return Validators.maxLength(context.controlInfo.schema.maxLength);
        }
    }
}
