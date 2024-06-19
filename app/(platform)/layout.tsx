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

  localStorage.setItem("theme", "true");
  const [darkMode, setDartMode] = useState<boolean>(JSON.parse(localStorage.getItem("theme") || "false"));

  // interface DarkModeProps {
  //   storageKey?: string;
  // };

  // const DarkMode = ({
  //   storageKey = "theme",
  // }: DarkModeProps) => {
  //   const [darkMode, setDartMode] = useLocalStorage<Record<string, boolean>>( // создание переменной для 
  //     storageKey,
  //     {}
  //   );


  // const [darkMode, setDartMode] = useState<boolean | null>();


  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "true") setDartMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");

    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "false");
    }
  }, [darkMode]);

  return (
    <PrimeReactProvider>
      <ClerkProvider
        localization={ruRU}
        appearance={{
          baseTheme: darkMode ? dark : experimental__simple,
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
