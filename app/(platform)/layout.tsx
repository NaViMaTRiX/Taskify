"use client";

import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";
import { dark, experimental__simple } from "@clerk/themes";

import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { useEffect, useState } from "react";

const PlatformLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {

  const theme = localStorage.getItem("theme");

  const [darkMode, setDartMode] = useState(false);

  useEffect(() => {
    if (theme === "dark") setDartMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <ClerkProvider
      localization={ruRU}
      appearance={{
        baseTheme: theme === 'dark' ? dark : experimental__simple,
        layout: {
          logoPlacement: "none",
          showOptionalFields: true,
        }
      }}
    >
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
