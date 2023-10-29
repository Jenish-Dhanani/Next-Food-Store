"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import { NextUIProvider, theme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function Providers({ children }) {
  return (
    <Provider store={store}>
      <NextThemesProvider defaultTheme="system" attribute="class">
        <NextUIProvider>{children}</NextUIProvider>
      </NextThemesProvider>
    </Provider>
  );
}

export default Providers;
