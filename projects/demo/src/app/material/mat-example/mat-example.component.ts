import { Component, OnInit, Input, Injectable } from '@angular/core';
import { OangEngine, FormGroupInfo, FieldComponentResolver, ComponentResolution, FieldComponentResolverContext } from '@cblx.br/oang';
import { SchemaObject } from 'openapi3-ts';

// @Injectable()
// export class MyComponentResolver implements FieldComponentResolver {
//   resolve(context: FieldComponentResolverContext): ComponentResolution {
//     return { type: MyComponent }
//   }
// }

@Component({
  selector: 'app-mat-example',
  templateUrl: './mat-example.component.html',
  styleUrls: ['./mat-example.component.scss']
})
export class MatExampleComponent implements OnInit {
  formGroupInfo: FormGroupInfo;
  @Input() schema: SchemaObject;
  constructor(private oangEngine: OangEngine) {
    //oangEngine.fieldComponentResolvers.push(MyComponentResolver);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    if (changes.schema) {
      this.formGroupInfo = this.oangEngine.createForm(this.schema);
    }
  }


  // refresh(schema: SchemaObject){
  //   alert('epa');
  //   this.formGroupInfo = this.oangEngine.createForm(schema);
  // }
}


// @Component({
//   template: 'epa'
// })
// export class MyComponent{

// }