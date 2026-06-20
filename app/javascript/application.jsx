import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import TodosIndex from "./pages/Todos/Index.jsx";

const pages = {
  "Todos/Index": TodosIndex,
};

createInertiaApp({
  resolve: (name) => pages[name],
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
