"use client";

import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDarkTheme, setDarkTheme] = useLocalStorage<boolean>("theme", false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  if (!mounted) {
    // Пока не смонтировалось, чтобы избежать "мигания"
    return null;
  }

  return (
    <div
      className="relative w-16 h-7 flex items-center dark:bg-black bg-teal-500 cursor-pointer rounded-full p-1"
      onClick={toggleTheme}
    >
      <FaMoon className="text-white" size={18} />
      <div
        className="absolute bg-white dark:bg-medium w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
        style={isDarkTheme ? { left: "2px" } : { right: "2px" }}
      ></div>
      <BsSunFill className="ml-auto text-yellow-400" size={18} />
    </div>
  );
};

export default ThemeToggle;





//Хочешь, я ещё дам пример, как сделать так, чтобы тема по умолчанию бралась из системных настроек ОС (prefers-color-scheme)?