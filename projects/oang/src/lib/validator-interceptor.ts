import { ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { ValidatorResolverContext } from './oang-engine';
import { Inject, LOCALE_ID, Injectable } from '@angular/core';

export type ValidationKindStrict = 'email'
    | 'maximum'
    | 'minimum'
    | 'required'
    | 'maxLength';

export type ValidationKind = ValidationKindStrict | string;

export abstract class ValidatorInterceptor {
    abstract intercept(kind: ValidationKind, fn: ValidatorFn, context: ValidatorResolverContext): ValidatorFn;
}

@Injectable()
export class DefaultValidatorInterceptor extends ValidatorInterceptor {
    private supported = ['en'/*, 'pt'*/];
    private translations
        : { [lang: string]: { [kind: string]: (context: ValidatorResolverContext) => string } }
        = {
            'en': {
                'email': ctx => 'Invalid email',
                'maximum': ctx => `Must be less than ${ctx.controlInfo.schema.maximum}`,
                'maxLength': ctx => `Maximum ${ctx.controlInfo.schema.maxLength} characters`,
                'minimum': ctx => `Must be greater than ${ctx.controlInfo.schema.minimum}`,
                'required': ctx => 'Required'
            },
            'pt':{
                'email': ctx => 'Email inválido',
                'maximum': ctx => `Deve ser menor que ${ctx.controlInfo.schema.maximum}`,
                'maxLength': ctx => `Máximo ${ctx.controlInfo.schema.maxLength} caracteres`,
                'minimum': ctx => `Deve ser maior que ${ctx.controlInfo.schema.minimum}`,
                'required': ctx => 'Obrigatório' 
            }
        }

    constructor(@Inject(LOCALE_ID) private localeId: string) {
        super();
    }

    intercept(kind: ValidationKindStrict, fn: ValidatorFn, context: ValidatorResolverContext) {
        let translation: string;
        let lang = this.localeId.substr(0, 2);
        if (this.supported.indexOf(lang) < 0) {
            lang = 'en';
        }
        if (this.translations[lang] && this.translations[lang][kind]) {
            translation = this.translations[lang][kind](context);
        }


        // switch(kind){
        //     case 'email':
        //         switch(lang){
        //             case 'en':
        //         }
        //         break;
        //     case 'maxLength':
        //         break;
        //     case 'maximum':
        //         break;
        //     case 'minimum':
        //         break;
        //     case 'required':
        //         break;
        // }

        if (translation) {
            return (ctrl: AbstractControl) => {
                let errors = fn(ctrl);
                if (errors) {
                    for (let prop in errors) {
                        // Change 'true' to the tranlsation value
                        // Ex: { required: true } => { required: 'Required' }
                        errors[prop] = translation;
                        break;
                    }
                    return errors;
                }
            };
        }

        return fn;

    }
}