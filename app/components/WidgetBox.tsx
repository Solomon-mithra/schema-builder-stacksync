import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';


interface WidgetBoxProps {
  field: SchemaField;
  onUpdateField: (oldInternalId: string, updatedField: SchemaField) => void;
  onDeleteField: (internalId: string) => void;
}

const WidgetBox = ({ field, onUpdateField, onDeleteField }: WidgetBoxProps) => {
  const [rawChoicesInput, setRawChoicesInput] = useState<string>(() =>
    JSON.stringify(field.choices?.values || [], null, 2)
  );
  const [rawAllowedAppTypesInput, setRawAllowedAppTypesInput] = useState<string>(
    () => JSON.stringify(field.allowed_app_types || [], null, 2)
  );

  useEffect(() => {
    setRawChoicesInput(JSON.stringify(field.choices?.values || [], null, 2));
  }, [field.choices]);

  useEffect(() => {
    setRawAllowedAppTypesInput(
      JSON.stringify(field.allowed_app_types || [], null, 2)
    );
  }, [field.allowed_app_types]);

  const handleFieldChange = (updatedField: Partial<SchemaField>) => {
    const newId = (updatedField.label || field.label)
      .toLowerCase()
      .replace(/\s+/g, '_');

    const updatedFieldWithId = { ...field, ...updatedField, id: newId };

    if (updatedFieldWithId.content?.content_objects?.[0]) {
      updatedFieldWithId.content.content_objects[0].id = `content_${newId}`;
    }

    onUpdateField(field._internalId!, updatedFieldWithId);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleFieldChange({ [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === 'required') {
      handleFieldChange({
        validation: checked ? { required: true } : undefined,
      });
    } else if (name === 'dynamic') {
      if (checked) {
        handleFieldChange({
          content: {
            type: ['managed'],
            content_objects: [{ id: `content_${field.id}` }],
          },
        });
      } else {
        handleFieldChange({ content: undefined });
      }
    } else if (name === 'load_schema') {
      handleFieldChange({
        on_action: checked ? { load_schema: true } : undefined,
      });
    }
  };

  const handleChoicesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setRawChoicesInput(value);
    try {
      const parsedChoices = JSON.parse(value);
      handleFieldChange({ choices: { values: parsedChoices } });
    } catch (error) {
      // Invalid JSON, do not update the schema state, only the local raw input
      console.error('Invalid JSON for choices:', error);
    }
  };

  const handleAllowedAppTypesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setRawAllowedAppTypesInput(value);
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        handleFieldChange({ allowed_app_types: parsed });
      }
    } catch (error) {
      console.error('Invalid JSON for Allowed App Types:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-br from-white/50 to-white/10 backdrop-blur-2xl p-4 rounded-xl shadow-2xl shadow-gray-300/50 border border-gray-200"
    >
      <button
        onClick={() => onDeleteField(field._internalId!)}
        className="absolute top-4 right-3 text-red-400 hover:text-red-600 focus:outline-none group"
        aria-label="Delete Widget"
      >
        <Trash2
          className="w-5 h-5 stroke-current group-hover:fill-current"
          strokeWidth={1.5}
        />
      </button>
      <div className="font-bold text-lg mb-2 text-gray-800 flex items-center">
        {field.label}
        <span className="ml-2 text-sm italic text-gray-600 font-normal">
          ({field.originalName})
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Label
          </label>
          <motion.input
            whileFocus={{ borderColor: '#3b82f6' }}
            transition={{ duration: 0.2 }}
            type="text"
            name="label"
            value={field.label}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white/30 border border-gray-300 rounded-md focus:outline-none sm:text-sm text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">ID</label>
          <input
            type="text"
            value={field.id}
            disabled
            className="mt-1 block w-full px-3 py-2 bg-gray-100/30 border border-gray-300 rounded-md sm:text-sm text-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Description
          </label>
          <motion.textarea
            whileFocus={{ borderColor: '#3b82f6' }}
            transition={{ duration: 0.2 }}
            name="description"
            value={field.description || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white/30 border border-gray-300 rounded-md focus:outline-none sm:text-sm text-gray-800"
          ></motion.textarea>
        </div>
        <div>
          <div className="flex items-center mb-1">
            <input
              type="checkbox"
              name="required"
              checked={field.validation?.required || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="required"
              className="ml-2 block text-sm text-gray-800"
            >
              Required
            </label>
          </div>
          <div className="flex items-center ">
            {field.ui_options?.ui_widget === 'SelectWidget' &&
              field.originalName !== 'Dynamic Load Select' && (
                <>
                  <input
                    type="checkbox"
                    name="load_schema"
                    checked={field.on_action?.load_schema || false}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="load_schema"
                    className="ml-2 block text-sm text-gray-800"
                  >
                    Load Schema on Change
                  </label>
                </>
              )}
          </div>
          {field.type === 'array' && (
            <div className="flex items-center">
              <input
                type="checkbox"
                name="dynamic"
                checked={!!field.content}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="dynamic"
                className="ml-2 block text-sm text-gray-800"
              >
                Dynamic
              </label>
            </div>
          )}
        </div>
        {(field.ui_options?.ui_widget === 'SelectWidget' ||
          (field.type === 'string' && field.choices)) &&
          field.originalName !== 'Dynamic Load Select' && (
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-500">
                Choices (JSON Array)
              </label>
              <motion.textarea
                whileFocus={{ boxShadow: '0px 0px 8px rgb(59, 130, 246, 0.5)' }}
                name="choices"
                value={rawChoicesInput}
                onChange={handleChoicesChange}
                rows={6}
                className="mt-1 block w-full px-3 py-2 bg-white/30 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800 font-mono"
              />
            </div>
          )}
        {field.type === 'connection' && (
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-500">
              Allowed App Types (Array)
            </label>
            <motion.textarea
              whileFocus={{ boxShadow: '0px 0px 8px rgb(59, 130, 246, 0.5)' }}
              name="allowed_app_types"
              value={rawAllowedAppTypesInput}
              onChange={handleAllowedAppTypesChange}
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-white/30 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800 font-mono"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WidgetBox;