import React from 'react';
import { ThemeType } from 'src/@types/styled.theme';

export interface IThemeCreate {
    currentTheme: ThemeType;
    setCurrentTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
    changeTheme: () => void;
}
