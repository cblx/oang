import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorResolver, ValidatorResolverContext } from '../oang-engine';
import { wrapFn } from './helpers';

@Injectable()
export class EmailValidatorResolver implements ValidatorResolver {
    constructor() { }
    resolve(context: ValidatorResolverContext): ValidatorFn {
        if (context.controlInfo.schema.format == 'email') {
            return wrapFn(context.controlInfo.schema, Validators.email, 'email');
        }
    }
}
