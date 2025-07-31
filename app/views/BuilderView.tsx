import { useState } from 'react';
import AddWidgetModal from '~/components/AddWidgetModal';
import WidgetBox from '~/components/WidgetBox';
import { useSchema } from '~/hooks/useSchema';
import { useSchemaManager } from '~/hooks/useSchemaManager';

const BuilderView = () => {
  const { schema } = useSchema();
  const { addWidget, updateField, deleteField } = useSchemaManager();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition-colors duration-200 cursor-pointer"
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
            const fieldMap = new Map(schema.fields.map(field => [field._internalId!, field]));
            uiOrder.forEach(fieldInternalId => {
              const field = fieldMap.get(fieldInternalId);
              if (field) {
                orderedFields.push(field);
                fieldMap.delete(fieldInternalId); // Remove from map once added to orderedFields
              }
            });
            // Add any fields not specified in ui_order
            schema.fields.forEach(field => {
              if (fieldMap.has(field._internalId!)) {
                unorderedFields.push(field);
              }
            });
          } else {
            // If no ui_order, all fields are unordered
            unorderedFields.push(...schema.fields);
          }

          const fieldsToRender = [...orderedFields, ...unorderedFields];

          return fieldsToRender.map((field) => (
            <WidgetBox key={field._internalId} field={field} onUpdateField={updateField} onDeleteField={deleteField} />
          ));
        })()}
      </div>
    </div>
  );
};

export default BuilderView;
