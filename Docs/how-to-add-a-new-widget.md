# How to Add a New Widget

This guide explains how to add a new widget to the Schema Builder.

## 1. Add the Widget Definition

Open `schema-builder-stacksync/app/config/widgets.tsx` and add a new widget definition to the `widgets` array. The definition should include the following properties:

- `name`: The display name of the widget.
- `type`: The data type of the widget (e.g., `string`, `number`, `boolean`).
- `description`: A brief description of the widget.
- `icon`: A JSX element for the widget's icon.
- `ui_widget` (optional): The name of the UI widget to use for rendering.
- `ui_options` (optional): Additional options for the UI widget.
- `choices` (optional): An array of choices for dropdowns.
- `items` (optional): The definition for array items.
- `allowed_app_types` (optional): An array of allowed app types for connections.
- `allowed_connection_management_types` (optional): An array of allowed connection management types for connections.
- `content` (optional): The content definition for dynamic widgets.

## 2. Create a Custom Editor (if necessary)

If the new widget requires a custom UI for editing its properties, create a new component in the `schema-builder-stacksync/app/components/widget-editors` directory.

## 3. Update the WidgetBox Component (if necessary)

If you created a custom editor, open `schema-builder-stacksync/app/components/WidgetBox.tsx` and add the rendering logic for your custom editor using conditional statements (e.g., `if (field.type === 'your_new_type')`).