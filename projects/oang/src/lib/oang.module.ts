import { NgModule } from '@angular/core';
import { OangField } from './components/field.component';
import { PortalModule } from '@angular/cdk/portal';
import { ReactiveFormsModule } from '@angular/forms';
import { OangEngine } from './oang-engine';
import { DefaultControlResolver } from './control-resolvers/default';
import { CommonModule } from '@angular/common';
import { EmailValidatorResolver } from './validator-resolvers/email';
import { IsRequiredValidatorResolver } from './validator-resolvers/is-required';
import { MaxLengthValidatorResolver } from './validator-resolvers/max-length';
import { PatternValidatorResolver } from './validator-resolvers/pattern';
import { MinValidatorResolver } from './validator-resolvers/min';
import { MaxValidatorResolver } from './validator-resolvers/max';
import { InputFieldComponent } from './components/input-field.component';
import { InputFieldComponentResolver } from './component-resolvers/input-component-resolver';
import { CheckboxFieldComponent } from './components/checkbox-field.component';
import { CheckboxFieldComponentResolver } from './component-resolvers/checkbox-component-resolver';


@NgModule({
  declarations: [
    OangField, 
    CheckboxFieldComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    ReactiveFormsModule
  ],
  exports: [
    OangField,
    CheckboxFieldComponent,
    InputFieldComponent
  ],
  providers: [
    DefaultControlResolver,
    EmailValidatorResolver,

    CheckboxFieldComponentResolver,
    InputFieldComponentResolver,
    
    IsRequiredValidatorResolver,
    MaxLengthValidatorResolver,
    MaxValidatorResolver,
    MinValidatorResolver,
    PatternValidatorResolver,
    OangEngine,
  ]
})
export class OangModule {
  constructor(oangEngine: OangEngine) {
    //Validators resolvers
    oangEngine.validatorsResolvers.push(
      EmailValidatorResolver,
      IsRequiredValidatorResolver,
      MaxLengthValidatorResolver,
      MaxValidatorResolver,
      MinValidatorResolver,
      PatternValidatorResolver,
    )

    //Default values resovlers
    oangEngine.defaultValueResolvers.push(
      //FromMetadataDefaultValueResolver
    );

    //Controls resolvers
    oangEngine.controlResolvers.push(
      //EnumerableToFormArrayResolver,
      DefaultControlResolver
    );

    oangEngine.fieldComponentResolvers.push(
      CheckboxFieldComponentResolver,
      InputFieldComponentResolver
    );

    //Display resolvers
    // oangEngine.displayComponentResolvers.push(
    //   //DisplayDateResolver,
    //   //DisplayEnumResolver,
    //   //DisplayTextResolver
    // );
  }
}
