import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldTextComponent } from './field-text.component';
import { FieldTextComponentResolver } from './field-text-component-resolver';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { OangModule, OangEngine } from '@cblx.br/oang';


@NgModule({
  declarations: [FieldTextComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    OangModule,
    ReactiveFormsModule
  ],
  exports: [FieldTextComponent],
  entryComponents: [FieldTextComponent],
  providers:[FieldTextComponentResolver]
})
export class FieldTextModule {
  constructor(oangEngine: OangEngine){
    //Adicionar no final
    oangEngine.fieldComponentResolvers.push(FieldTextComponentResolver);
  }
}
