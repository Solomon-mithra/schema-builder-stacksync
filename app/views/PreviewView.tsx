import React, { useState } from 'react';
import { useSchema } from '~/hooks/useSchema';
import type { SchemaField } from '../types/schema';
import { PlusCircle } from 'lucide-react';

const StringArrayField: React.FC<{ field: SchemaField }> = ({ field }) => {
  const [values, setValues] = useState(['']);

  const itemLabel = (field.items && !Array.isArray(field.items)) ? field.items.label : '';

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-900">{field.label}</h3>
        <button type="button" className="text-blue-500">
          <PlusCircle size={20} />
        </button>
      </div>
      {values.map((value, index) => (
        <div key={index} className="mb-2">
          <label htmlFor={`${field.id}-${index}`} className="block text-sm font-medium text-gray-700">{itemLabel}</label>
          <input
            type="text"
            id={`${field.id}-${index}`}
            value={value}
            readOnly
            className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none sm:text-sm text-gray-800"
          />
        </div>
      ))}
    </div>
  );
};

const ObjectArrayField: React.FC<{ field: SchemaField }> = ({ field }) => {
  const fieldsToRender = (field.items && !Array.isArray(field.items) && field.items.fields) ? field.items.fields : [];

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-900">{field.label}</h3>
        <button type="button" className="text-blue-500">
          <PlusCircle size={20} />
        </button>
      </div>
      {fieldsToRender.map(renderField)}
    </div>
  );
};

const renderField = (field: SchemaField) => {
  switch (field.type) {
    case 'string':
      if (field.ui_options?.ui_widget === 'password') {
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input type="password" id={field.id} name={field.id} className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none sm:text-sm text-gray-800" />
          </div>
        );
      }
      if (field.ui_options?.ui_widget === 'textarea' || field.ui_options?.ui_widget === 'CodeblockWidget') {
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label}</label>
            <textarea id={field.id} name={field.id} rows={4} className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none sm:text-sm text-gray-800"></textarea>
          </div>
        );
      }
      if (field.choices) {
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label}</label>
            <div className="relative mt-1">
              <select id={field.id} name={field.id} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none sm:text-sm text-gray-800 appearance-none pr-8">
                {field.choices.values.map(choice => (
                  <option key={choice.value} value={choice.value}>{choice.label}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div key={field.id} className="mb-4">
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label}</label>
          <input type="text" id={field.id} name={field.id} className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none sm:text-sm text-gray-800" />
        </div>
      );
    case 'number':
      return (
        <div key={field.id} className="mb-4">
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label}</label>
          <input type="number" id={field.id} name={field.id} className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none sm:text-sm text-gray-800" />
        </div>
      );
    case 'boolean':
      return (
        <div key={field.id} className="mb-4 flex items-center">
          <input type="checkbox" id={field.id} name={field.id} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          <label htmlFor={field.id} className="ml-2 block text-sm text-gray-900">{field.label}</label>
        </div>
      );
    case 'connection':
      return (
        <div key={field.id} className="mb-4">
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label}</label>
          <div className="relative mt-1">
            <select id={field.id} name={field.id} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none sm:text-sm text-gray-800 appearance-none pr-8">
              <option value="api_key_1">API Key 1</option>
              <option value="api_key_2">API Key 2</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      );
    case 'object':
      const objectFieldsToRender = (field.fields && Array.isArray((field as any).fields))
        ? (field as any).fields as SchemaField[]
        : (field.items && !Array.isArray(field.items) && field.items.fields) ? field.items.fields : [];
      return (
        <div key={field.id} className="mb-4 p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-medium text-gray-900">{field.label}</h3>
          {objectFieldsToRender.map(renderField)}
        </div>
      );
    case 'array':
      if (field.items && !Array.isArray(field.items)) {
        if (field.items.type === 'string') {
          return <StringArrayField field={field} />;
        }
        if (field.items.type === 'object') {
          return <ObjectArrayField field={field} />;
        }
      }
      return null;
    default:
      return null;
  }
};

const PreviewView = () => {
  const { schema } = useSchema();

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg min-w-[300px] w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Preview</h2>
      <form>
        {schema.fields.map(renderField)}
      </form>
    </div>
  );
};

export default PreviewView;