import { useState, useEffect } from 'react';
import { Trash2, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AddWidgetModal from './AddWidgetModal';
import NestedFieldBox from './NestedFieldBox';


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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stringArrayValues, setStringArrayValues] = useState<string[]>(() =>
    Array.isArray(field.default) ? field.default : []
  );

  useEffect(() => {
    if (field.type === 'array' && field.items?.type === 'string') {
      setStringArrayValues(Array.isArray(field.default) ? field.default : []);
    }
  }, [field.default, field.type, field.items?.type]);

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

  const handleAddNestedField = (widget: WidgetDefinition) => {
    const newField: SchemaField = {
      _internalId: `${field._internalId}-nested-${Date.now()}`,
      id: widget.name.toLowerCase().replace(/\s+/g, '_'),
      originalName: widget.name,
      type: widget.type,
      label: widget.name,
      description: widget.description,
      ui_options: widget.ui_options,
      choices: widget.choices,
      content: widget.content,
      allowed_app_types: widget.allowed_app_types,
      allowed_connection_management_types: widget.allowed_connection_management_types,
    };
    delete newField.default;

    const updatedItems = {
      ...field.items,
      fields: [...(field.items?.fields || []), newField],
    };
    handleFieldChange({ items: updatedItems });
  };

  const handleDeleteNestedField = (nestedFieldInternalId: string) => {
    const updatedFields = field.items?.fields?.filter(
      (f) => f._internalId !== nestedFieldInternalId
    );
    const updatedItems = { ...field.items, fields: updatedFields };
    handleFieldChange({ items: updatedItems });
  };

  const handleUpdateNestedField = (updatedNestedField: SchemaField) => {
    const updatedFields = field.items?.fields?.map((f) =>
      f._internalId === updatedNestedField._internalId ? updatedNestedField : f
    );
    const updatedItems = { ...field.items, fields: updatedFields };
    handleFieldChange({ items: updatedItems });
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
        className="absolute top-4 right-3 text-red-400 hover:text-red-600 focus:outline-none cursor-pointer"
        aria-label="Delete Widget"
      >
        <Trash2 className="w-5 h-5" />
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
        {field.type === 'array' && field.items && Array.isArray(field.items) && field.items.every((item: any) => item.type === 'string') && (
          <div className="col-span-full">
            <h3 className="text-md font-semibold text-gray-700 mt-4 mb-2">
              Nested Fields
            </h3>
            <div className="grid gap-3">
              {stringArrayValues.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-grow">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => {
                        const newValues = [...stringArrayValues];
                        newValues[index] = { ...item, label: e.target.value };
                        setStringArrayValues(newValues);
                        handleFieldChange({ items: newValues });
                      }}
                      className="block w-full px-2 py-1 bg-white/80 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"
                    />
                    <label className="block text-xs font-medium text-gray-500 mb-1 mt-2">
                      Description
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) => {
                        const newValues = [...stringArrayValues];
                        newValues[index] = { ...item, description: e.target.value };
                        setStringArrayValues(newValues);
                        handleFieldChange({ items: newValues });
                      }}
                      className="block w-full px-2 py-1 bg-white/80 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"
                      rows={2}
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newValues = stringArrayValues.filter((_, i) => i !== index);
                      setStringArrayValues(newValues);
                      handleFieldChange({ items: newValues });
                    }}
                    className="text-red-400 hover:text-red-600 focus:outline-none p-2 cursor-pointer"
                    aria-label="Delete Value"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const newValues = [...stringArrayValues, { type: 'string', label: 'New Value', description: '' }];
                setStringArrayValues(newValues);
                handleFieldChange({ items: newValues });
              }}
              className="mt-3 flex items-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              <PlusCircle size={18} className="mr-2" />
              Add Field
            </button>
          </div>
        )}
        {field.type === 'array' && field.items?.type === 'object' && (
          <div className="col-span-full">
            <h3 className="text-md font-semibold text-gray-700 mt-4 mb-2">
              Nested Fields
            </h3>
            <div className="grid gap-3">
              {field.items.fields?.map((nestedField) => (
                <div key={nestedField._internalId} className="flex items-center gap-3">
                  <NestedFieldBox
                    nestedField={nestedField}
                    onUpdate={handleUpdateNestedField}
                  />
                  <button
                    onClick={() => handleDeleteNestedField(nestedField._internalId!)}
                    className="text-red-400 hover:text-red-600 focus:outline-none p-2 cursor-pointer"
                    aria-label="Delete Nested Field"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 flex items-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              <PlusCircle size={18} className="mr-2" />
              Add Nested Field
            </button>
            <AddWidgetModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onAddWidget={handleAddNestedField}
              excludeTypes={['connection', 'array']}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WidgetBox;
