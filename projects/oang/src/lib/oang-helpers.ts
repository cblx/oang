import { SchemaCatalog, ControlInfo } from './oang-engine';
import { ExtendedSchemaObject } from './extended-schema-object';

export function getSchemaFromCatalog(schemaCatalog: SchemaCatalog, schemaNameOrRef: string): ExtendedSchemaObject {
    if (!schemaCatalog) { return null; }
    if (!schemaNameOrRef) { return null; }
    schemaNameOrRef = schemaNameOrRef.replace('#/components/schemas/', '');
    return schemaCatalog[schemaNameOrRef];
}


/**
 * Find ref schema for a control.
 * Searches on $ref field or first ocurrence in allOf
 * @param controlInfo 
 */
export function getRefSchema(controlInfo: ControlInfo<any>) : ExtendedSchemaObject {
    let ref = controlInfo?.schema?.$ref || controlInfo?.schema?.allOf?.find(() => true)?.$ref;
    return getSchemaFromCatalog(controlInfo?.schemaCatalog, ref);
}