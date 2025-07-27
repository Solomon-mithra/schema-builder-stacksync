interface SchemaField {
  _internalId?: string;
  id: string;
  originalName?: string;
  type: string;
  label: string;
  description?: string;
  default?: any;
  ui_options?: { ui_widget: string };
  items?: { type: string; fields?: SchemaField[]; content?: any; };
  choices?: { values: Array<{ value: any; label: string }> };
  validation?: { required?: boolean };
  on_action?: { load_schema?: boolean };
}

interface Schema {
  metadata: {
    workflows_module_schema_version: string;
  };
  fields: SchemaField[];
  ui_options: { ui_order?: string[]; };
}

interface WidgetDefinition {
  name: string;
  type: string;
  ui_widget?: string;
  description?: string;
  default?: any;
  icon?: JSX.Element;
  items?: { type: string; fields?: SchemaField[]; content?: any; };
  choices?: { values: Array<{ value: any; label: string }> };
  allowed_app_types?: string[];
  allowed_connection_management_types?: string[];
}
