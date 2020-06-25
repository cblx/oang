# oang
Angular library for helping writing UI components and validators based on Open Api Schemas:

https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schema-object

Demo:

https://cblxoang.z15.web.core.windows.net/

## Usage

Installing

`
npm install cblx.br/oang --save-dev
`

Import OangModule

```
import { OangMaterialModule } from '@cblx.br/oang';


@NgModule({
  imports: [
    OangModule,
  ]
})
export class MyModule { }
```

## Creating FormGroups from OpenApi schemas

```
import { OangEngine } from '@cblx.br/oang';

...
constructor(oangEngine: OangEngine){
   const formGroupInfo = oangEngine.createForm(schemaCatalog /* the schema dictionary */, 'MyRequestDto' /* component name */);
}
...

