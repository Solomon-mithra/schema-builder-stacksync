import { useState } from 'react';
import type { Route } from './+types/home';
import BuilderView from '~/views/BuilderView';
import CodeView from '~/views/CodeView';
import '~/types/schema.d'; // Import the type definition
import { SchemaProvider } from '~/state/SchemaProvider';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Schema Builder' },
    { name: 'description', content: 'Build your schema visually' },
  ];
}

const Home = () => {
  const [activeTab, setActiveTab] = useState('builder');

  return (
    <div className="min-h-screen text-gray-900">
      <div className="container mx-auto p-4 pt-10 pb-10">
      <h1 className="text-3xl font-bold mb-4">Schema Builder</h1>
      <p className="mb-6 text-gray-600">
        Use the Schema Builder to visually create and manage your schema for Connector Modules.
      </p>
      <div className="flex border-b border-gray-300 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-lg font-medium flex items-center cursor-pointer transition-all duration-200 ease-in-out ${activeTab === 'builder'
            ? 'border-b border-blue-500 text-blue-500'
            : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('builder')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 00-1 1v1a2 2 0 11-4 0v-1a1 1 0 00-1-1H7a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 001-1V9a1 1 0 00-1-1H7a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1z" /></svg>
            Builder
          </button>
          <button
            className={`px-4 py-2 text-lg font-medium flex items-center cursor-pointer transition-all duration-200 ease-in-out ${activeTab === 'code'
              ? 'border-b border-blue-500 text-blue-500'
              : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('code')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            Code
          </button>
        </div>
        <div className="pt-4">
          <div style={{ display: activeTab === 'builder' ? 'block' : 'none' }}>
            <BuilderView />
          </div>
          <div style={{ display: activeTab === 'code' ? 'block' : 'none' }}>
            <CodeView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomeWrapper() {
  return (
    <SchemaProvider>
      <Home />
    </SchemaProvider>
  );
}
