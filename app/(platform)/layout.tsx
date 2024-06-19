"use client";

import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";
import { dark, experimental__simple } from "@clerk/themes";

import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { useEffect, useState } from "react";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

const PlatformLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {

  let darkModeValid;
  const [darkMode, setDartMode] = useState<boolean | null>(JSON.parse(localStorage.getItem("theme") || "false"));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem("theme");
      if (theme === "true") setDartMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode !== null) {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "true");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "false");
      }
    }
  }, [darkMode]);
  darkModeValid = darkMode;

  return (
    <PrimeReactProvider>
      <ClerkProvider
        localization={ruRU}
        appearance={{
          baseTheme: darkModeValid ? dark : experimental__simple,
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
    </PrimeReactProvider>
  );
};

export default PlatformLayout;
