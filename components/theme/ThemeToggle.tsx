"use client";

import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { useLocalStorage } from "usehooks-ts";

const ThemeToggle = () => {

  // const [isDarkTheme, setDarkTheme] = useState<boolean | null>(null);

  // useEffect(() => {
  //   const theme = localStorage.getItem("theme");
  //   if (theme === "true") setDarkTheme(true);
  // }, []);

  // useEffect(() => {
  //   if (isDarkTheme) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "true");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "false");
  //   }
  // }, [isDarkTheme]);

  const [isDarkTheme, setDarkTheme] = useLocalStorage<boolean>("theme", false);

  const toggleTheme = () => {
    setDarkTheme((prevValue: boolean) => !prevValue);
    if (!isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      className="relative w-16 h-7 flex items-center dark:bg-black bg-teal-500 cursor-pointer rounded-full p-1"
      onClick={toggleTheme}
    >
      <FaMoon
        className="text-white"
        size={18} />
      <div
        className="absolute bg-white dark:bg-medium w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
        style={isDarkTheme ? { left: "2px" } : { right: "2px" }}
      ></div>
      <BsSunFill
        className="ml-auto text-yellow-400"
        size={18}
      />
    </div>
  )
};
export default ThemeToggle;