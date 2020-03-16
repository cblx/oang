import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorResolver, ValidatorResolverContext } from '../oang-engine';
import { wrapFn } from './helpers';

@Injectable()
export class MaxValidatorResolver implements ValidatorResolver {
    constructor() { }
    resolve(context: ValidatorResolverContext): ValidatorFn {
        let maximum = context.controlInfo.schema.maximum;
        if (maximum || maximum === 0) {
            return wrapFn(context.controlInfo.schema, Validators.max(maximum), 'maximum');
        }
    }
}
