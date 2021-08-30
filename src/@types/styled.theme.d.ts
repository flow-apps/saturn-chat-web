import 'styled-components';
import ThemeModel from '../styles/themes/light';

export type ThemeType = typeof ThemeModel;

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}
