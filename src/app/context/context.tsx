"use client";
import { createContext, useState, ReactNode } from 'react';
import { FaMoon } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";

interface ThemeContextValue {
  mode: 'light' | 'dark';
  modes: {
    dark: {
      textColor: string;
      inputColor: string;
      bgColor: string;
      bgElements: string;
      icon: React.JSX.Element;
    };
    light: {
      textColor: string;
      inputColor: string;
      bgColor: string;
      bgElements: string;
      icon: React.JSX.Element;
    };
  };
  setTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const modes = {
    dark: {
      textColor: "text-White",
      inputColor: "text-Grey-950",
      bgColor: "bg-Blue-950",
      bgElements: "bg-Blue-900",
      icon: <FaMoon />,
    },
    light: {
      textColor: "text-Grey-950",
      inputColor: "text-Grey-400",
      bgColor: "bg-Green-100",
      bgElements: "bg-White",
      icon: <FaRegMoon />,
    },
  };

  const [mode, setMode] = useState<keyof typeof modes>("light");

  const setTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ mode, modes, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };

