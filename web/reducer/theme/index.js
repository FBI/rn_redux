import Types from "../../action/types";

const defaultState = {
    theme: '',
    onShowCustomThemeView: false,
};
export default function onAction(state = defaultState, action) {
    const { type, theme } = action
    switch (type) {
        case Types.THEME_CHANGE:
            return { ...state, theme };
        default:
            return state;
    }

}