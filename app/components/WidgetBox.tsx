import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

interface WidgetBoxProps {
  field: SchemaField;
  onUpdateField: (oldId: string, updatedField: SchemaField) => void;
  onDeleteField: (fieldId: string) => void;
}

const WidgetBox = ({ field, onUpdateField, onDeleteField }: WidgetBoxProps) => {
  const [localField, setLocalField] = useState<SchemaField>(field);

  useEffect(() => {
    setLocalField(field);
  }, [field]);

  useEffect(() => {
    // This effect runs when localField changes, and propagates the change to the parent
    // We need to ensure we're passing the original ID for the update operation
    const oldId = field.id; // The ID of the field as it was when this WidgetBox was rendered
    const newId = localField.label.toLowerCase().replace(/\s+/g, '_');
    
    // Only call onUpdateField if there's an actual change to prevent infinite loops
    // or unnecessary updates.
    if (oldId !== newId || JSON.stringify(field) !== JSON.stringify(localField)) {
      onUpdateField(oldId, { ...localField, id: newId });
    }
  }, [localField, onUpdateField, field]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setLocalField((prev) => {
      if (name === 'required') {
        const newValidation = checked ? { required: true } : undefined;
        return { ...prev, validation: newValidation };
      } else if (name === 'choices') {
        try {
          const parsedChoices = JSON.parse(value);
          return { ...prev, choices: { values: parsedChoices } };
        } catch (error) {
          console.error("Invalid JSON for choices:", error);
          return prev; // Or handle error more gracefully
        }
      } else if (name === 'dynamic') {
        const newItems = checked
          ? {
              type: "string",
              label: "default",
              content: {
                type: ["managed"],
                content_objects: [{ id: "default_feild" }],
              },
            }
          : { type: "string", label: "Value" };
        return {
          ...prev,
          items: newItems,
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => onDeleteField(field.id)}
        className="absolute top-4 right-3 text-red-400 hover:text-red-600 focus:outline-none group"
        aria-label="Delete Widget"
      >
        <Trash2 className="w-5 h-5 stroke-current group-hover:fill-current" strokeWidth={1.5} />
      </button>
      <div className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100 flex items-center">
        {localField.label}
        <span className="ml-2 text-sm italic text-gray-500 dark:text-gray-400 font-normal">({field.originalName})</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Label</label>
          <input
            type="text"
            name="label"
            value={localField.label}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID</label>
          <input
            type="text"
            value={localField.id}
            disabled
            className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-sm text-gray-500 dark:text-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            value={localField.description || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className='mt-2'>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="required"
              checked={localField.validation?.required || false}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="required" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Required</label>
          </div>
          {localField.type === 'array' && localField.items?.type === 'string' && (
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="dynamic"
                checked={!!localField.items?.content}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="dynamic" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Dynamic</label>
            </div>
          )}
          <div className="flex items-center mt-2">
            {localField.ui_options?.ui_widget === 'SelectWidget' && localField.originalName !== 'Dynamic Load Select' && (
              <>
                <input
                  type="checkbox"
                  name="load_schema"
                  checked={localField.on_action?.load_schema || false}
                  onChange={(e) => {
                    setLocalField((prev) => ({
                      ...prev,
                      on_action: e.target.checked ? { load_schema: true } : undefined,
                    }));
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="load_schema" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Load Schema on Change</label>
              </>
            )}
          </div>
        </div>
        {localField.ui_options?.ui_widget === 'SelectWidget' && localField.originalName !== 'Dynamic Load Select' && (
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Choices (JSON Array)</label>
            <textarea
              name="choices"
              value={JSON.stringify(localField.choices?.values || [], null, 2)}
              onChange={handleChange}
              rows={6}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-gray-100 font-mono"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetBox;

