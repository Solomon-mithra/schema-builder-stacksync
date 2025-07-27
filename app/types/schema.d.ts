interface SchemaField {
  _internalId?: string;
  id: string;
  originalName?: string;
  type: string;
  label: string;
  description?: string;
  default?: any;
  ui_options?: { ui_widget?: string; language?: string; refresh_on_click?: boolean; };
  items?: { type: string; fields?: SchemaField[]; content?: any; };
  choices?: { values: Array<{ value: any; label: string }> };
  validation?: { required?: boolean };
  on_action?: { load_schema?: boolean };
  content?: { type: string[]; content_objects: { id: string }[] };
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
  ui_options?: { language?: string; refresh_on_click?: boolean; };
  description?: string;
  default?: any;
  icon?: JSX.Element;
  items?: { type: string; fields?: SchemaField[]; content?: any; };
  choices?: { values: Array<{ value: any; label: string }> };
  content?: { type: string[]; content_objects: { id: string }[] };
  allowed_app_types?: string[];
  allowed_connection_management_types?: string[];
}
