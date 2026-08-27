/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { IThemeCreate } from "./interface";
import darkTheme from "@styles/themes/dark";
import lightTheme from "@styles/themes/light";
import { ThemeType } from "src/@types/styled.theme";

export const ThemeChooseContext = createContext<IThemeCreate>(
  {} as IThemeCreate,
);

export const useChooseTheme = (): IThemeCreate => {
  const context = useContext(ThemeChooseContext);
  const { currentTheme, setCurrentTheme, changeTheme } = context;
  return { currentTheme, setCurrentTheme, changeTheme };
};

const STORAGE_KEY = "@SaturnChat:theme";

const themesMap: Record<string, ThemeType> = {
  dark: darkTheme,
  light: lightTheme,
};

export const ThemeChooseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(darkTheme);

  useEffect(() => {
    const savedThemeName = localStorage.getItem(STORAGE_KEY);

    if (savedThemeName && themesMap[savedThemeName]) {
      setCurrentTheme(themesMap[savedThemeName]);
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      const defaultTheme = prefersDarkMode ? darkTheme : lightTheme;
      setCurrentTheme(defaultTheme);
    }
  }, []);

  const changeTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);

    const themeName = theme.title || (theme === darkTheme ? "dark" : "light");
    localStorage.setItem(STORAGE_KEY, themeName);
  };

  return (
    <ThemeChooseContext.Provider
      value={{ currentTheme, setCurrentTheme, changeTheme }}
    >
      {children}
    </ThemeChooseContext.Provider>
  );
};
