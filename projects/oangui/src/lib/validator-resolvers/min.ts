import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorResolver, ValidatorResolverContext } from '../oang-engine';
import { wrapFn } from './helpers';

@Injectable()
export class MinValidatorResolver implements ValidatorResolver {
    constructor() { }
    resolve(context: ValidatorResolverContext): ValidatorFn {
        let minimum = context.controlInfo.schema.minimum;
        if (minimum || minimum === 0) {
            return wrapFn(context.controlInfo.schema, Validators.min(minimum), 'minimum');
        }
    }
}
