import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { widgets } from '~/config/widgets';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWidget: (widget: WidgetDefinition) => void;
}

const AddWidgetModal = ({ isOpen, onClose, onAddWidget }: AddWidgetModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredWidgets = widgets.filter((widget) =>
    widget.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose} // Close modal when clicking outside
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add Widget</h2>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.input
              type="text"
              placeholder="Search widgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 mb-4 bg-white/30 border border-gray-300 rounded-md focus:outline-none sm:text-sm text-gray-800"
              whileFocus={{ borderColor: '#3b82f6' }}
              transition={{ duration: 0.2 }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredWidgets.map((widget) => (
                <motion.div
                  key={widget.name}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center p-2 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200"
                  onClick={() => {
                    onAddWidget(widget);
                    onClose();
                  }}
                >
                  <div className="mr-2 text-gray-600">{widget.icon}</div>
                  <span className="text-base text-gray-800">{widget.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddWidgetModal;
