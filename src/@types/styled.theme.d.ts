import 'styled-components';
import ThemeModel from '../styles/themes/light';

type Theme = typeof ThemeModel;

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
