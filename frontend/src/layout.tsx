import React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { AppHeader } from "./components/header";

function Layout({ children }: { children: React.ReactNode }) {
  // const [theme, setTheme] = useState('dark');

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppHeader />
      <div>{children}</div>
    </ThemeProvider>
  );
}

export default Layout;
