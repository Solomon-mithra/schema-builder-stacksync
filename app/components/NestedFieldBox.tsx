import { motion } from 'framer-motion';

interface NestedFieldBoxProps {
  nestedField: SchemaField;
  onUpdate: (updatedField: SchemaField) => void;
}

const NestedFieldBox = ({ nestedField, onUpdate }: NestedFieldBoxProps) => {
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    const newId = newLabel.toLowerCase().replace(/\s+/g, '_');
    onUpdate({ ...nestedField, label: newLabel, id: newId });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white/60 p-3 rounded-lg border border-gray-200/80 flex-grow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Label
          </label>
          <input
            type="text"
            value={nestedField.label}
            onChange={handleLabelChange}
            className="block w-full px-2 py-1 bg-white/80 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">ID</label>
          <input
            type="text"
            value={nestedField.id}
            disabled
            className="block w-full px-2 py-1 bg-gray-100/70 border border-gray-300 rounded-md sm:text-sm text-gray-600"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Description
          </label>
          <textarea
            value={nestedField.description || ''}
            onChange={(e) => onUpdate({ ...nestedField, description: e.target.value })}
            className="block w-full px-2 py-1 bg-white/80 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"
            rows={2}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default NestedFieldBox;
