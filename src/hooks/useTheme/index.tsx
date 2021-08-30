/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext } from 'react';
import { IThemeCreate } from './interface';

export const ThemeChooseContext = createContext<IThemeCreate>({} as IThemeCreate);

export const useChooseTheme = (): IThemeCreate => {
    const context = useContext(ThemeChooseContext);
    const { currentTheme, setCurrentTheme, changeTheme } = context;
    return { currentTheme, setCurrentTheme, changeTheme };
};
