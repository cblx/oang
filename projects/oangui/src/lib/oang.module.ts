import { NgModule } from '@angular/core';
import { OangField, FieldDefaultComponent } from './components/field.component';
import { PortalModule } from '@angular/cdk/portal';
import { ReactiveFormsModule } from '@angular/forms';
import { OangEngine } from './oang-engine';
import { DefaultControlResolver } from './control-resolvers/default';
import { CommonModule } from '@angular/common';
import { EmailValidatorResolver } from './validator-resolvers/email';
import { IsRequiredValidatorResolver } from './validator-resolvers/is-required';
import { MaxLengthValidatorResolver } from './validator-resolvers/max-length';
import { PatternValidatorResolver } from './validator-resolvers/pattern';


@NgModule({
  declarations: [OangField, FieldDefaultComponent],
  imports: [
    CommonModule,
    PortalModule,
    ReactiveFormsModule
  ],
  exports: [OangField],
  providers: [
    DefaultControlResolver,
    EmailValidatorResolver,
    IsRequiredValidatorResolver,
    MaxLengthValidatorResolver,
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

    //Display resolvers
    // oangEngine.displayComponentResolvers.push(
    //   //DisplayDateResolver,
    //   //DisplayEnumResolver,
    //   //DisplayTextResolver
    // );
  }
}
