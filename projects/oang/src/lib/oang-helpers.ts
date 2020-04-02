import { SchemaCatalog, ControlInfo } from './oang-engine';
import { ExtendedSchemaObject } from './extended-schema-object';

export function getSchemaFromCatalog(schemaCatalog: SchemaCatalog, schemaNameOrRef: string): ExtendedSchemaObject {
    if (!schemaCatalog) { return null; }
    if (!schemaNameOrRef) { return null; }
    schemaNameOrRef = schemaNameOrRef.replace('#/components/schemas/', '');
    return schemaCatalog[schemaNameOrRef];
}

export function getRefSchema(controlInfo: ControlInfo<any>) : ExtendedSchemaObject {
    return getSchemaFromCatalog(controlInfo?.schemaCatalog, controlInfo?.schema?.$ref);
}