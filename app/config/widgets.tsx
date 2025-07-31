
export const widgets = [
  {
    name: 'Text Input',
    type: 'string',
    description: 'A single line text input field.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>
    ),
  },
  {
    name: 'Text Area',
    type: 'string',
    ui_widget: 'textarea',
    description: 'A multi-line text input field.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
    ),
  },
  {
    name: 'Password',
    type: 'string',
    ui_widget: 'password',
    description: 'A hidden text input field for sensitive information.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    ),
  },
  {
    name: 'Number Input',
    type: 'number',
    description: 'A field for numeric input.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
    ),
  },
  {
    name: 'Integer Input',
    type: 'integer',
    description: 'A field for whole number input.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m-4-8h8" /></svg>
    ),
  },
  {
    name: 'Checkbox',
    type: 'boolean',
    description: 'A checkbox for boolean values.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
  {
    name: 'Select Dropdown',
    type: 'string',
    ui_widget: 'SelectWidget',
    description: 'A dropdown for selecting from a list of choices.',
    choices: {
      values: [
        { "value": "default", "label": "Default" }
      ]
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
    ),
  },
  
  {
    name: 'Code Block',
    type: 'string',
    ui_widget: 'CodeblockWidget',
    ui_options: {
      language: 'json'
    },
    description: 'A code editor for structured input.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    ),
  },
  {
    name: 'Connection',
    type: 'connection',
    description: 'A field for managing API connections.',
    allowed_app_types: ["hyperline"],
    allowed_connection_management_types: ["managed", "custom"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
    ),
  },
  {
    name: 'String Array',
    type: 'array',
    items: { type: 'string', label: 'Value' },
    description: 'An array of string values.',
    dynamic: false,
    content: {
      type: ["managed"],
      content_objects: [
        {
          id: "content_string_array_default"
        }
      ]
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
    ),
  },
  {
    name: 'Object Array',
    type: 'array',
    items: { type: 'object', fields: [
      {
        id: "default",
        type: "string",
        label: "Default"
      }
    ], label: 'Item' },
    description: 'An array of object values.',
    content: {
      type: ["managed"],
      content_objects: [
        {
          id: "content_object_array_default"
        }
      ]
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
    ),
  },
  {
    name: 'Dynamic Load Select',
    type: 'string',
    label: 'Dynamic Load Select',
    ui_widget: 'SelectWidget',
    ui_options: {
      refresh_on_click: true
    },
    description: 'A dynamic dropdown for selecting from a list of choices after loading dynamic content.',
    choices: {
      values: [
      ]
    },
    content: {
      type: ["managed"],
      content_objects: [
        {
          id: "content_load_id"
        }
      ]
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
  },
];
