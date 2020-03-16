import { NgModule } from '@angular/core';
import { OangModule } from '@cblx.br/oang';
import { FieldTextModule } from './field-text';

@NgModule({
  imports: [
    OangModule,
    FieldTextModule
  ],
  exports:[
    OangModule,
    FieldTextModule
  ]
})
export class OangMaterialModule {

}
