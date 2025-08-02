import { createContext, useState } from 'react';

interface SchemaProviderProps {
  children: React.ReactNode;
}

export const SchemaContext = createContext<{
  schema: Schema;
  setSchema: React.Dispatch<React.SetStateAction<Schema>>;
  cleanSchema: (schema: Schema) => Schema;
}>({
  schema: {
    metadata: {
      workflows_module_schema_version: '1.0.0',
    },
    fields: [],
    ui_options: {},
  },
  setSchema: () => {},
  cleanSchema: (schema: Schema) => schema,
});

export const SchemaProvider = ({ children }: SchemaProviderProps) => {
  const [schema, setSchema] = useState<Schema>({
    metadata: {
      workflows_module_schema_version: '1.0.0',
    },
    fields: [],
    ui_options: {},
  });

  const cleanSchema = (schema: Schema) => {
    const cleanSchema = JSON.parse(JSON.stringify(schema));
    const idMap = new Map<string, string>();

    const cleanFields = (fields: SchemaField[]) => {
      fields.forEach((field: any) => {
        idMap.set(field._internalId, field.id);
        delete field._internalId;
        delete field.originalName;

        if (field.type === 'array' && field.items?.type === 'object' && field.items.fields) {
          cleanFields(field.items.fields);
        } else if (field.type === 'array' && Array.isArray(field.items)) {
          // For String Array where items is an array of field definitions
          // No need to delete items here, as it now contains the actual data
        }
      });
    };

    cleanFields(cleanSchema.fields);

    if (cleanSchema.ui_options?.ui_order) {
      cleanSchema.ui_options.ui_order = cleanSchema.ui_options.ui_order.map(
        (internalId: string) => idMap.get(internalId) || internalId
      );
    }

    return cleanSchema;
  };

  return (
    <SchemaContext.Provider value={{ schema, setSchema, cleanSchema }}>
      {children}
    </SchemaContext.Provider>
  );
};
