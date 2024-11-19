import { camelCase, upperFirst } from 'lodash';
import * as fs from 'node:fs';
import type { SchemaObject } from 'openapi-typescript';
// eslint-disable-next-line import/no-extraneous-dependencies
import openapiTS from 'openapi-typescript';

const API_DOCS_ENDPOINT =
  'https://business-shift-backend-ftf264evdq-uk.a.run.app/api-docs.json';

const OUT_PUT_PATH = './src/shared/types/api/generated.ts';

const enumCache = new Map();

const getSchemaName = (str: string) => {
  const arr = str.split('/');

  const schemaName = arr.at(-1);

  return schemaName;
};

const transformUnionToEnum = (enumValues: string[], enumName: string) => {
  const enumString = enumValues
    .map((value) => `${upperFirst(camelCase(value))} = '${value}'`)
    .join(',\n  ');

  const enumType = `\n\nexport enum ${enumName} {
  ${enumString}
}`;

  return enumType;
};

const collectAndTransformEnums = (
  schemaObject: SchemaObject,
  metadata: { path: string },
) => {
  if ('enum' in schemaObject) {
    const enumName = getSchemaName(metadata.path);

    if (!enumName) {
      return '';
    }

    const enumValues = schemaObject.enum as string[];

    const schemaName = getSchemaName(enumName);

    const enumTypeString = transformUnionToEnum(enumValues, enumName);

    enumCache.set(schemaName, enumTypeString);

    return enumName;
  }

  return '';
};

const generateTypesFromSchema = async () => {
  const localPath = new URL(API_DOCS_ENDPOINT, import.meta.url);

  const output = await openapiTS(localPath, {
    transform: collectAndTransformEnums,
  });

  if (!output) return '';

  return output;
};

// eslint-disable-next-line unicorn/prefer-top-level-await
generateTypesFromSchema().then((types) => {
  let newTypes = types;

  enumCache.forEach((enumType) => {
    newTypes += enumType;
  });

  return fs.writeFile(OUT_PUT_PATH, newTypes, (err) => {
    if (err) {
      throw err;
    }
  });
});
