import { NgModule } from '@angular/core';
import { OangModule } from '@cblx.br/oang';
import { OangMatInputFieldModule } from './input-field';
import { OangMatCheckboxFieldModule } from './checkbox-field';

@NgModule({
  imports: [
    OangModule,
    OangMatInputFieldModule
  ],
  exports:[
    OangModule,
    OangMatCheckboxFieldModule,
    OangMatInputFieldModule
  ]
})
export class OangMaterialModule {}
