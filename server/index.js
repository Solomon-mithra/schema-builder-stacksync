import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("link", {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const widgets = [
  {
    name: "Text Input",
    type: "string",
    ui_widget: "input",
    description: "A single line text input field.",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" }) })
  },
  {
    name: "Text Area",
    type: "string",
    ui_widget: "textarea",
    description: "A multi-line text input field.",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h7" }) })
  },
  {
    name: "Password",
    type: "string",
    ui_widget: "password",
    description: "A hidden text input field for sensitive information.",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) })
  },
  {
    name: "Number Input",
    type: "number",
    description: "A field for numeric input.",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14" }) })
  },
  {
    name: "Integer Input",
    type: "integer",
    description: "A field for whole number input.",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m-4-8h8" }) })
  },
  {
    name: "Checkbox",
    type: "boolean",
    ui_widget: "checkbox",
    description: "A checkbox for boolean values.",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) })
  },
  {
    name: "Select Dropdown",
    type: "object",
    ui_widget: "SelectWidget",
    description: "A dropdown for selecting from a list of choices.",
    choices: {
      values: [
        { "value": "default", "label": "Default" }
      ]
    },
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 9l4-4 4 4m0 6l-4 4-4-4" }) })
  },
  {
    name: "Code Block",
    type: "string",
    ui_widget: "CodeblockWidget",
    description: "A code editor for structured input.",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }) })
  },
  {
    name: "Connection",
    type: "connection",
    description: "A field for managing API connections.",
    allowed_app_types: ["hyperline"],
    allowed_connection_management_types: ["managed", "custom"],
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" }) })
  },
  {
    name: "String Array",
    type: "array",
    items: { type: "string", label: "Value" },
    description: "An array of string values.",
    dynamic: false,
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 10h16M4 14h16M4 18h16" }) })
  },
  {
    name: "Object Array",
    type: "array",
    items: { type: "object", fields: [
      {
        id: "default",
        type: "string",
        label: "Default"
      }
    ], label: "Item" },
    description: "An array of object values.",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
  },
  {
    name: "Dynamic Load Select",
    type: "string",
    label: "Dynamic_Select",
    description: "A dynamic dropdown for selecting from a list of choices after loading dynamic content.",
    ui_widget: "SelectWidget",
    choices: {
      values: []
    },
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) })
  }
];
const AddWidgetModal = ({ isOpen, onClose, onAddWidget }) => {
  const [searchTerm, setSearchTerm] = useState("");
  if (!isOpen) return null;
  const filteredWidgets = widgets.filter(
    (widget) => widget.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50",
      onClick: onClose,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 w-full max-w-lg",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4 text-gray-800", children: "Add Widget" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: "absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer",
                "aria-label": "Close Modal",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search widgets...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "w-full px-3 py-1 mb-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: filteredWidgets.map((widget) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center p-2 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200",
                onClick: () => {
                  onAddWidget(widget);
                  onClose();
                },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "mr-2 text-gray-600", children: widget.icon }),
                  /* @__PURE__ */ jsx("span", { className: "text-base text-gray-800", children: widget.name })
                ]
              },
              widget.name
            )) })
          ]
        }
      )
    }
  );
};
const WidgetBox = ({ field, onUpdateField, onDeleteField }) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const [localField, setLocalField] = useState(field);
  useEffect(() => {
    setLocalField(field);
  }, [field]);
  useEffect(() => {
    const oldId = field.id;
    const newId = localField.label.toLowerCase().replace(/\s+/g, "_");
    if (oldId !== newId || JSON.stringify(field) !== JSON.stringify(localField)) {
      onUpdateField(oldId, { ...localField, id: newId });
    }
  }, [localField, onUpdateField, field]);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;
    setLocalField((prev) => {
      if (name === "required") {
        const newValidation = checked ? { required: true } : void 0;
        return { ...prev, validation: newValidation };
      } else if (name === "choices") {
        try {
          const parsedChoices = JSON.parse(value);
          return { ...prev, choices: { values: parsedChoices } };
        } catch (error) {
          console.error("Invalid JSON for choices:", error);
          return prev;
        }
      } else if (name === "dynamic") {
        const newItems = checked ? {
          type: "string",
          label: "default",
          content: {
            type: ["managed"],
            content_objects: [{ id: "default_feild" }]
          }
        } : { type: "string", label: "Value" };
        return {
          ...prev,
          items: newItems
        };
      } else {
        return {
          ...prev,
          [name]: value
        };
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-white/50 to-white/10 backdrop-blur-2xl p-4 rounded-xl shadow-2xl shadow-gray-300/50 border border-white/30", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onDeleteField(field.id),
        className: "absolute top-4 right-3 text-red-400 hover:text-red-600 focus:outline-none group",
        "aria-label": "Delete Widget",
        children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5 stroke-current group-hover:fill-current", strokeWidth: 1.5 })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "font-bold text-lg mb-2 text-gray-800 flex items-center", children: [
      localField.label,
      /* @__PURE__ */ jsxs("span", { className: "ml-2 text-sm italic text-gray-600 font-normal", children: [
        "(",
        field.originalName,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: "Label" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "label",
            value: localField.label,
            onChange: handleChange,
            className: "mt-1 block w-full px-3 py-2 bg-white/30 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: "ID" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: localField.id,
            disabled: true,
            className: "mt-1 block w-full px-3 py-2 bg-gray-100/30 border border-gray-300 rounded-md shadow-sm sm:text-sm text-gray-600"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: "Description" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "description",
            value: localField.description || "",
            onChange: handleChange,
            className: "mt-1 block w-full px-3 py-2 bg-white/30 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              name: "required",
              checked: ((_a = localField.validation) == null ? void 0 : _a.required) || false,
              onChange: handleChange,
              className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "required", className: "ml-2 block text-sm text-gray-800", children: "Required" })
        ] }),
        localField.type === "array" && ((_b = localField.items) == null ? void 0 : _b.type) === "string" && /* @__PURE__ */ jsxs("div", { className: "flex items-center mt-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              name: "dynamic",
              checked: !!((_c = localField.items) == null ? void 0 : _c.content),
              onChange: handleChange,
              className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "dynamic", className: "ml-2 block text-sm text-gray-800", children: "Dynamic" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center mt-2", children: ((_d = localField.ui_options) == null ? void 0 : _d.ui_widget) === "SelectWidget" && localField.originalName !== "Dynamic Load Select" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              name: "load_schema",
              checked: ((_e = localField.on_action) == null ? void 0 : _e.load_schema) || false,
              onChange: (e) => {
                setLocalField((prev) => ({
                  ...prev,
                  on_action: e.target.checked ? { load_schema: true } : void 0
                }));
              },
              className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "load_schema", className: "ml-2 block text-sm text-gray-800", children: "Load Schema on Change" })
        ] }) })
      ] }),
      ((_f = localField.ui_options) == null ? void 0 : _f.ui_widget) === "SelectWidget" && localField.originalName !== "Dynamic Load Select" && /* @__PURE__ */ jsxs("div", { className: "col-span-full", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: "Choices (JSON Array)" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "choices",
            value: JSON.stringify(((_g = localField.choices) == null ? void 0 : _g.values) || [], null, 2),
            onChange: handleChange,
            rows: 6,
            className: "mt-1 block w-full px-3 py-2 bg-white/30 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800 font-mono"
          }
        )
      ] })
    ] })
  ] });
};
const BuilderView = ({ schema, setSchema }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addWidget = (widget) => {
    const newField = {
      _internalId: crypto.randomUUID(),
      id: widget.name.toLowerCase().replace(/\s+/g, "_"),
      originalName: widget.name,
      type: widget.type,
      label: widget.name,
      ...widget.description && { description: widget.description },
      ...widget.hasOwnProperty("default") && { default: widget.default },
      ...widget.ui_widget && { ui_options: { ui_widget: widget.ui_widget } },
      ...widget.items && { items: widget.items },
      ...widget.choices && { choices: widget.choices },
      ...widget.allowed_app_types && { allowed_app_types: widget.allowed_app_types },
      ...widget.allowed_connection_management_types && { allowed_connection_management_types: widget.allowed_connection_management_types }
    };
    setSchema((prevSchema) => {
      var _a;
      return {
        ...prevSchema,
        fields: [...prevSchema.fields, newField],
        ui_options: {
          ...prevSchema.ui_options,
          ui_order: [...((_a = prevSchema.ui_options) == null ? void 0 : _a.ui_order) || [], newField.id]
        }
      };
    });
  };
  const updateField = (oldId, updatedField) => {
    setSchema((prevSchema) => {
      var _a, _b;
      return {
        ...prevSchema,
        fields: prevSchema.fields.map(
          (field) => field.id === oldId ? updatedField : field
        ),
        ui_options: {
          ...prevSchema.ui_options,
          ui_order: (_b = (_a = prevSchema.ui_options) == null ? void 0 : _a.ui_order) == null ? void 0 : _b.map(
            (id) => id === oldId ? updatedField.id : id
          )
        }
      };
    });
  };
  const handleDeleteField = (fieldId) => {
    setSchema((prevSchema) => {
      var _a, _b;
      return {
        ...prevSchema,
        fields: prevSchema.fields.filter((field) => field.id !== fieldId),
        ui_options: {
          ...prevSchema.ui_options,
          ui_order: (_b = (_a = prevSchema.ui_options) == null ? void 0 : _a.ui_order) == null ? void 0 : _b.filter((id) => id !== fieldId)
        }
      };
    });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center",
        onClick: () => setIsModalOpen(true),
        children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
          "Add Widget"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      AddWidgetModal,
      {
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false),
        onAddWidget: addWidget
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-4", children: (() => {
      var _a;
      const orderedFields = [];
      const unorderedFields = [];
      const uiOrder = (_a = schema.ui_options) == null ? void 0 : _a.ui_order;
      if (uiOrder) {
        const fieldMap = new Map(schema.fields.map((field) => [field.id, field]));
        uiOrder.forEach((fieldId) => {
          const field = fieldMap.get(fieldId);
          if (field) {
            orderedFields.push(field);
            fieldMap.delete(fieldId);
          }
        });
        schema.fields.forEach((field) => {
          if (fieldMap.has(field.id)) {
            unorderedFields.push(field);
          }
        });
      } else {
        unorderedFields.push(...schema.fields);
      }
      const fieldsToRender = [...orderedFields, ...unorderedFields];
      return fieldsToRender.map((field) => /* @__PURE__ */ jsx(WidgetBox, { field, onUpdateField: updateField, onDeleteField: handleDeleteField }, field._internalId));
    })() })
  ] });
};
const CodeView = ({ schema }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2)).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2e3);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("pre", { className: "bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto border border-gray-200 text-sm", children: JSON.stringify(
      (() => {
        const cleanSchema = JSON.parse(JSON.stringify(schema));
        cleanSchema.fields.forEach((field) => {
          delete field._internalId;
          delete field.originalName;
        });
        return cleanSchema;
      })(),
      null,
      2
    ) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleCopy,
        className: "absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded text-sm flex items-center",
        children: [
          copySuccess ? "Copied!" : /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2.586a1 1 0 01.707 1.707l-4.586 4.586a1 1 0 01-1.707 0l-4.586-4.586A1 1 0 016.414 5H8z" }) }),
          !copySuccess && "Copy"
        ]
      }
    )
  ] });
};
function meta({}) {
  return [{
    title: "Schema Builder"
  }, {
    name: "description",
    content: "Build your schema visually"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  const [activeTab, setActiveTab] = useState("builder");
  const [schema, setSchema] = useState({
    metadata: {
      workflows_module_schema_version: "1.0.0"
    },
    fields: [],
    ui_options: {}
  });
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen text-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto p-4 pt-5",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-3xl font-bold mb-4",
        children: "Schema Builder"
      }), /* @__PURE__ */ jsx("p", {
        className: "mb-6 text-gray-600",
        children: "Use the Schema Builder to visually create and manage your schema for Connector Modules."
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex border-b border-gray-300 dark:border-gray-700",
        children: [/* @__PURE__ */ jsxs("button", {
          className: `px-4 py-2 text-lg font-medium flex items-center ${activeTab === "builder" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`,
          onClick: () => setActiveTab("builder"),
          children: [/* @__PURE__ */ jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-5 w-5 mr-2",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 00-1 1v1a2 2 0 11-4 0v-1a1 1 0 00-1-1H7a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 001-1V9a1 1 0 00-1-1H7a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1z"
            })
          }), "Builder"]
        }), /* @__PURE__ */ jsxs("button", {
          className: `px-4 py-2 text-lg font-medium flex items-center ${activeTab === "code" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`,
          onClick: () => setActiveTab("code"),
          children: [/* @__PURE__ */ jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-5 w-5 mr-2",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            })
          }), "Code"]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "pt-4",
        children: activeTab === "builder" ? /* @__PURE__ */ jsx(BuilderView, {
          schema,
          setSchema
        }) : /* @__PURE__ */ jsx(CodeView, {
          schema
        })
      })]
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/schema-builder-stacksyncassets/entry.client-DrPHaCgo.js", "imports": ["/schema-builder-stacksyncassets/chunk-C37GKA54-DbvhLxwn.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/schema-builder-stacksyncassets/root-Rnc3VDDL.js", "imports": ["/schema-builder-stacksyncassets/chunk-C37GKA54-DbvhLxwn.js"], "css": ["/schema-builder-stacksyncassets/root-BDbBfv91.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": "/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/schema-builder-stacksyncassets/home-yfGwfcuO.js", "imports": ["/schema-builder-stacksyncassets/chunk-C37GKA54-DbvhLxwn.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/schema-builder-stacksyncassets/manifest-18e0d9f1.js", "version": "18e0d9f1", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/schema-builder-stacksync";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: "/",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
