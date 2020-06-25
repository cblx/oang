import { NgModule } from '@angular/core';
import { OangField , NoComponent } from './components/field.component';
import { PortalModule } from '@angular/cdk/portal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OangEngine } from './oang-engine';
import { DefaultControlResolver } from './control-resolvers/default';
import { CommonModule } from '@angular/common';
import { EmailValidatorResolver } from './validator-resolvers/email';
import { IsRequiredValidatorResolver } from './validator-resolvers/is-required';
import { MaxLengthValidatorResolver } from './validator-resolvers/max-length';
import { PatternValidatorResolver } from './validator-resolvers/pattern';
import { MinValidatorResolver } from './validator-resolvers/min';
import { MaxValidatorResolver } from './validator-resolvers/max';
import { InputFieldComponent, InputFieldComponentResolver } from './components/input-field.component';
import { CheckboxFieldComponent, CheckboxFieldComponentResolver } from './components/checkbox-field.component';
import { SelectFieldComponentResolver, SelectFieldComponent } from './components/select-field.component';
import { FormArrayResolver } from './control-resolvers/form-array';
//import { NoComponent } from './components/no.component';


@NgModule({
  declarations: [
    OangField, 
    CheckboxFieldComponent,
    InputFieldComponent,
    NoComponent,
    SelectFieldComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PortalModule,
    ReactiveFormsModule
  ],
  exports: [
    OangField,
    CheckboxFieldComponent,
    InputFieldComponent,
    SelectFieldComponent
  ],
  providers: [
    // Control
    DefaultControlResolver,
    FormArrayResolver,

    // Components
    CheckboxFieldComponentResolver,
    InputFieldComponentResolver,
    SelectFieldComponentResolver,
    
    // Validatos
    EmailValidatorResolver,
    IsRequiredValidatorResolver,
    MaxLengthValidatorResolver,
    MaxValidatorResolver,
    MinValidatorResolver,
    PatternValidatorResolver,

    // The Engine
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
    //oangEngine.defaultValueResolvers.push(
      //FromMetadataDefaultValueResolver
    //);

    //Controls resolvers
    oangEngine.controlResolvers.push(
      FormArrayResolver,
      DefaultControlResolver
    );

    oangEngine.fieldComponentResolvers.push(
      CheckboxFieldComponentResolver,
      SelectFieldComponentResolver,
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
