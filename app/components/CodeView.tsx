import { useState } from 'react';

interface CodeViewProps {
  schema: Schema;
}

const CodeView = ({ schema }: CodeViewProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2)).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <div className="relative">
      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto border border-gray-200 text-sm">
        {JSON.stringify(
          (() => {
            const cleanSchema = JSON.parse(JSON.stringify(schema)); // Deep copy to avoid modifying original state
            cleanSchema.fields.forEach((field: any) => {
              delete field._internalId;
              delete field.originalName;
            });
            return cleanSchema;
          })(),
          null,
          2
        )}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded text-sm flex items-center"
      >
        {copySuccess ? (
          'Copied!'
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2.586a1 1 0 01.707 1.707l-4.586 4.586a1 1 0 01-1.707 0l-4.586-4.586A1 1 0 016.414 5H8z" /></svg>
        )}
        {!copySuccess && 'Copy'}
      </button>
    </div>
  );
};

export default CodeView;
