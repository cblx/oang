import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorResolver, ValidatorResolverContext } from '../oang-engine';
import { wrapFn } from './helpers';

@Injectable()
export class PatternValidatorResolver implements ValidatorResolver {
    constructor() { }
    resolve(context: ValidatorResolverContext): ValidatorFn {
        if (context.controlInfo.schema.pattern) {
            return wrapFn(context.controlInfo.schema, Validators.pattern(context.controlInfo.schema.pattern), 'pattern');
        }
    }
}
