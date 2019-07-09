import Types from '../../action/types'
import ThemeFactory, { ThemeFlags } from "../../config/themeConfig";

const defaultState = {
    theme: ThemeFactory.createTheme(ThemeFlags.Default),
    onShowCustomThemeView: false,
};
export default function onAction(state = defaultState, action) {
    const { type, theme, customThemeViewVisible } = action
    switch (type) {
        case Types.THEME_CHANGE:
            return {
                ...state,
                theme,
            };
        case Types.SHOW_THEME_VIEW:
            return {
                ...state,
                customThemeViewVisible,
            };
        default:
            return state;
    }

}