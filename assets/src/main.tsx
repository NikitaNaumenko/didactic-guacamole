import axios from "axios";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import '@mantine/core/styles.css';


axios.defaults.xsrfHeaderName = "x-csrf-token";

createInertiaApp({
  resolve: async (name) => {
    return await import(`./pages/${name}.page.tsx`);
  },
  setup({ App, el, props }) {
    createRoot(el).render(
    <MantineProvider theme={theme}>
    <App {...props}>
    </App>

    </MantineProvider>
    );
  },
});
