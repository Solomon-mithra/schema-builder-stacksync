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

    cleanSchema.fields.forEach((field: any) => {
      idMap.set(field._internalId, field.id);
      delete field._internalId;
      delete field.originalName;
    });

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
