// import "@/styles/globals.css"
// import { Metadata, Viewport } from "next"

// import { siteConfig } from "@/config/site"
// import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils";
import React from "react";
// import { Analytics } from "@/components/analytics"
// import { ThemeProvider } from "@/components/providers"
// import { TailwindIndicator } from "@/components/tailwind-indicator"
// import { ThemeSwitcher } from "@/components/theme-switcher"
// import { Toaster as DefaultToaster } from "@/registry/default/ui/toaster"
// import { Toaster as NewYorkSonner } from "@/registry/new-york/ui/sonner"
// import { Toaster as NewYorkToaster } from "@/registry/new-york/ui/toaster"

// import ThemeContext from "./ThemeContext";
// import { ThemeToggle } from "./components/custom/ThemeToggle";

import { ThemeProvider } from "@/components/theme-provider";
import { AppHeader } from "./components/header";

function Layout({ children }: { children: React.ReactNode }) {
  // const [theme, setTheme] = useState('dark');

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppHeader />
      <div
      // className={cn(
      //   "bg-background font-sans antialiased",
      //   "font-geist",
      // )}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}

export default Layout;
