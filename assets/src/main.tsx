import { StrictMode } from "react";
import "./index.css";
import axios from "axios";
import Root from "@/components/Root";
import type { ReactNode } from "react";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

axios.defaults.xsrfHeaderName = "x-csrf-token";

type ResolvedComponent = {
  default: ReactNode;
  layout?: (page: ReactNode) => ReactNode;
};
createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob<ResolvedComponent>("./pages/**/*.tsx");
    return pages[`./pages/${name}.tsx`]();
    // return import(`./pages/${name}.tsx`);
  },
  setup({ App, el, props }) {
    createRoot(el).render(
      <StrictMode>
        <Root {...props}>
          <App {...props} />
        </Root>
      </StrictMode>,
    );
  },
});
