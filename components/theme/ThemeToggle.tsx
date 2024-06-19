"use client";

import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { useLocalStorage } from "usehooks-ts";

const ThemeToggle = () => {


  const [darkMode, setDartMode] = useState<boolean | null>(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "true") setDartMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "false");
    }
  }, [darkMode]);

  return (
    <div
      className="relative w-16 h-7 flex items-center dark:bg-black bg-teal-500 cursor-pointer rounded-full p-1"
      onClick={() => setDartMode(!darkMode)}
    >
      <FaMoon
        className="text-white"
        size={18} />
      <div
        className="absolute bg-white dark:bg-medium w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
        style={darkMode ? { left: "2px" } : { right: "2px" }}
      ></div>
      <BsSunFill
        className="ml-auto text-yellow-400"
        size={18}
      />
    </div>
  )
};
export default ThemeToggle;