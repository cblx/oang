import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorResolver, ValidatorResolverContext } from '../oang-engine';
import { wrapFn } from './helpers';

@Injectable()
export class MaxLengthValidatorResolver implements ValidatorResolver {
    constructor() { }
    resolve(context: ValidatorResolverContext): ValidatorFn {
        if (context.controlInfo.schema.maxLength) {
            return wrapFn(context.controlInfo.schema, Validators.maxLength(context.controlInfo.schema.maxLength), 'maxLength');
        }
    }
}
