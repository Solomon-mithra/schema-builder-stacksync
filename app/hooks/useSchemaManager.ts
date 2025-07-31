import { useSchema } from './useSchema';

export const useSchemaManager = () => {
  const { schema, setSchema } = useSchema();

  const addWidget = (widget: WidgetDefinition) => {
    const newField = {
      _internalId: Date.now().toString(36) + Math.random().toString(36).substring(2),
      id: widget.name.toLowerCase().replace(/\s+/g, '_'),
      originalName: widget.name,
      type: widget.type,
      label: widget.name,
      ...(widget.description && { description: widget.description }),
      ...(widget.hasOwnProperty('default') && { default: widget.default }),
      ...(widget.ui_widget && { ui_options: { ui_widget: widget.ui_widget, ...(widget.ui_options || {}) } }),
      ...(widget.items && { items: widget.items }),
      ...(widget.choices && { choices: widget.choices }),
      ...(widget.allowed_app_types && { allowed_app_types: widget.allowed_app_types }),
      ...(widget.allowed_connection_management_types && { allowed_connection_management_types: widget.allowed_connection_management_types }),
      ...(widget.content && { content: widget.content }),
    };
    setSchema((prevSchema) => ({
      ...prevSchema,
      fields: [...prevSchema.fields, newField],
      ui_options: {
        ...prevSchema.ui_options,
        ui_order: [...(prevSchema.ui_options?.ui_order || []), newField._internalId!],
      },
    }));
  };

  const updateField = (oldInternalId: string, updatedField: SchemaField) => {
    setSchema((prevSchema) => ({
      ...prevSchema,
      fields: prevSchema.fields.map((field) =>
        field._internalId === oldInternalId ? updatedField : field
      ),
      ui_options: {
        ...prevSchema.ui_options,
        ui_order: prevSchema.ui_options?.ui_order?.map((id) =>
          id === oldInternalId ? updatedField._internalId! : id
        ),
      },
    }));
  };

  const deleteField = (internalId: string) => {
    setSchema((prevSchema) => ({
      ...prevSchema,
      fields: prevSchema.fields.filter((field) => field._internalId !== internalId),
      ui_options: {
        ...prevSchema.ui_options,
        ui_order: prevSchema.ui_options?.ui_order?.filter((id) => id !== internalId),
      },
    }));
  };

  return { addWidget, updateField, deleteField };
};