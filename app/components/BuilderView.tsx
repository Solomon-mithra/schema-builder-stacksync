import { useState } from 'react';
import AddWidgetModal from '~/components/AddWidgetModal';
import WidgetBox from '~/components/WidgetBox';

interface BuilderViewProps {
  schema: Schema;
  setSchema: React.Dispatch<React.SetStateAction<Schema>>;
}

const BuilderView = ({ schema, setSchema }: BuilderViewProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addWidget = (widget: WidgetDefinition) => {
    const newField = {
      _internalId: crypto.randomUUID(),
      id: widget.name.toLowerCase().replace(/\s+/g, '_'),
      originalName: widget.name,
      type: widget.type,
      label: widget.name,
      ...(widget.description && { description: widget.description }),
      ...(widget.hasOwnProperty('default') && { default: widget.default }),
      ...(widget.ui_widget && { ui_options: { ui_widget: widget.ui_widget } }),
      ...(widget.items && { items: widget.items }),
      ...(widget.choices && { choices: widget.choices }),
      ...(widget.allowed_app_types && { allowed_app_types: widget.allowed_app_types }),
      ...(widget.allowed_connection_management_types && { allowed_connection_management_types: widget.allowed_connection_management_types }),
    };
    setSchema((prevSchema) => ({
      ...prevSchema,
      fields: [...prevSchema.fields, newField],
      ui_options: {
        ...prevSchema.ui_options,
        ui_order: [...(prevSchema.ui_options?.ui_order || []), newField.id],
      },
    }));
  };

  const updateField = (oldId: string, updatedField: SchemaField) => {
    setSchema((prevSchema) => ({
      ...prevSchema,
      fields: prevSchema.fields.map((field) =>
        field.id === oldId ? updatedField : field
      ),
      ui_options: {
        ...prevSchema.ui_options,
        ui_order: prevSchema.ui_options?.ui_order?.map((id) =>
          id === oldId ? updatedField.id : id
        ),
      },
    }));
  };

  const handleDeleteField = (fieldId: string) => {
    setSchema((prevSchema) => ({
      ...prevSchema,
      fields: prevSchema.fields.filter((field) => field.id !== fieldId),
      ui_options: {
        ...prevSchema.ui_options,
        ui_order: prevSchema.ui_options?.ui_order?.filter((id) => id !== fieldId),
      },
    }));
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        Add Widget
      </button>
      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddWidget={addWidget}
      />
      <div className="mt-4 grid gap-4">
        {(() => {
          const orderedFields: SchemaField[] = [];
          const unorderedFields: SchemaField[] = [];
          const uiOrder = schema.ui_options?.ui_order;

          if (uiOrder) {
            const fieldMap = new Map(schema.fields.map(field => [field.id, field]));
            uiOrder.forEach(fieldId => {
              const field = fieldMap.get(fieldId);
              if (field) {
                orderedFields.push(field);
                fieldMap.delete(fieldId); // Remove from map once added to orderedFields
              }
            });
            // Add any fields not specified in ui_order
            schema.fields.forEach(field => {
              if (fieldMap.has(field.id)) {
                unorderedFields.push(field);
              }
            });
          } else {
            // If no ui_order, all fields are unordered
            unorderedFields.push(...schema.fields);
          }

          const fieldsToRender = [...orderedFields, ...unorderedFields];

          return fieldsToRender.map((field) => (
            <WidgetBox key={field._internalId} field={field} onUpdateField={updateField} onDeleteField={handleDeleteField} />
          ));
        })()}
      </div>
    </div>
  );
};

export default BuilderView;
