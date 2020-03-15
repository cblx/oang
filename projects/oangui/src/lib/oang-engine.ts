import { Injectable, Injector, Type } from '@angular/core';
import { FormBuilder, AbstractControl, ValidatorFn, Validators, FormGroup } from '@angular/forms';
import { ExtendedSchemaObject } from './extended-schema-object';
import { SchemaObject } from 'openapi3-ts';



@Injectable()
export class OangEngine {
    controlResolvers: (Type<ControlResolver> | ControlResolverFn)[] = [];
    defaultValueResolvers: Type<DefaultValueResolver>[] = [];
    validatorsResolvers: Type<ValidatorResolver>[] = [];
    fieldComponentResolvers: Type<FieldComponentResolver>[] = [];
    //displayComponentResolvers: Type<DisplayComponentResolver>[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private injector: Injector
    ) { }

    private setValidators(controlInfo: ControlInfo<any>) {
        //Lista de validadores
        let validators: ValidatorFn[] = [];

        for (let vrType of this.validatorsResolvers) {
            let vr = this.injector.get(vrType);
            let context: ValidatorResolverContext = { controlInfo };
            let validator = vr.resolve(context);

            if (validator) {
                validators.push(validator);
            }
        }
        controlInfo.control.setValidators(Validators.compose(validators));
    }

    createForm(schema: SchemaObject) : FormGroupInfo {
        let formGroupInfo = this.createFormWithControls(schema);
        let formGroup = formGroupInfo.control;

        //Configure validators
        //for (let p in formGroup.controls) {
            for (let p in formGroupInfo.controlInfos) {
            let controlInfo = formGroupInfo.controlInfos[p];
            this.setValidators(controlInfo);
        }

        return formGroupInfo;
    }

    public getFieldComponentType(controlInfo:ControlInfo<any>) {
        for (let componentResolverType of this.fieldComponentResolvers) {
            let componentResolver = this.injector.get(componentResolverType);
            let componentResolution = componentResolver.resolve({ controlInfo });
            if (componentResolution) {
                return componentResolution;
            }
        }
    }

    // public getDisplayComponentType(metadata: DefaultModelMetadata) {
    //     for (let componentResolverType of this.displayComponentResolvers) {
    //         let componentResolver = this.injector.get(componentResolverType);
    //         let componentResolution = componentResolver.resolve({ metadata });
    //         if (componentResolution) {
    //             return componentResolution;
    //         }
    //     }
    // }

    private createFormWithControls(schema: SchemaObject) : FormGroupInfo {
        //Create form group
        let formGroup = this.formBuilder.group({});

        let formGroupInfo: FormGroupInfo = {
            control: formGroup,
            schema: schema,
            name: null,
            controlInfos: {}
        };

        //Create controls
        for (let propName in schema.properties) {
            let control: AbstractControl;
            let propSchema: ExtendedSchemaObject = schema.properties[propName];
            propSchema['x-isRequired'] = schema.required?.indexOf(propName) >= 0;

            for (let rType of this.controlResolvers) {
                let r = this.injector.get(rType);
                //let metadata = new ExtendedModelMetadata(prop);
                //let context = { metadata };

                if ('resolve' in r) {
                    control = r.resolve(propSchema);
                } else {
                    control = r(propSchema);
                }

                if (control) {
                    break;
                }
            }

            if (!control) {
                throw 'Form Control could not be resolved';
            }

            let controlInfo: ControlInfo<any> = {
                control,
                name: propName,
                schema: propSchema
            };
            formGroupInfo.controlInfos[propName] = controlInfo;
            //console.log(formGroupInfo);

            for (let dvrType of this.defaultValueResolvers) {
                let dvr = this.injector.get(dvrType);
                let dv = dvr.resolve({ controlInfo });
                if (dv) {
                    control.setValue(dv.value);
                    break;
                }
            }
            
            formGroup.addControl(propName, control);

        }

        return formGroupInfo;
    }

    // async createForm(metadataName: string) {
    //     let metadata = await this.sMetadata.get(metadataName);
    //     return this.createFormFromMetadata(metadata);
    // }
}

export interface ControlInfo<TControl extends AbstractControl> {
    name: string;
    control: TControl;
    schema: ExtendedSchemaObject;
}

export interface FormGroupInfo extends ControlInfo<FormGroup> {
    controlInfos: {
        [key: string]: ControlInfo<AbstractControl>
    }
}

///////////////////////////////////
export interface ComponentResolution{
    type: Type<any>;
    data?: any;
}

////////////////////////////////////
// Field components
export interface FieldComponentResolverContext {
    controlInfo: ControlInfo<any>;
}

export interface FieldComponentResolver {
    resolve(context: FieldComponentResolverContext): ComponentResolution;
}

/////////////////////////////////////////////
// Display components
// export interface DisplayComponentResolverContext {
//     metadata: DefaultModelMetadata;
// }

// export interface DisplayComponentResolver {
//     resolve(context: DisplayComponentResolverContext): ComponentResolution;
// }

///////////////////////////////////////////
//Controls
export type ControlResolverFn = (context: ControlResolverContext) => AbstractControl;

export interface ControlResolverContext {
    schema: SchemaObject
}

export interface ControlResolver {
    resolve(context: ControlResolverContext): AbstractControl;
}
///////////////////////////////////////////////////////////////


//////////////////////////////////////////
//Default Values
export interface DefaultValueResolverContext {
    controlInfo: ControlInfo<any>
}
export interface DefaultValueResolver {
    resolve(context?: DefaultValueResolverContext): { value: any };
}
//////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//Validators
export interface ValidatorResolverContext {
    controlInfo: ControlInfo<any>
}

export interface ValidatorResolver {
    resolve(context: ValidatorResolverContext): ValidatorFn;
}
////////////////////////////////////////////////////////////////