import Types from '../types'
import ThemeUtil from '../../utils/themeUtil'

export function onThemeChange(theme) {
    return { type: Types.THEME_CHANGE, theme}
}
/**
 * 初始化主题
 * @returns {Function}
 */
export function onThemeInit() {
    return dispatch => {
        new ThemeUtil().getTheme().then((data) => {
            dispatch(onThemeChange(data))
        })
    }
}
/**
 * 显示自定义主题浮层
 * @param show
 * @returns {{type: *, customThemeViewVisible: *}}
 */
export function onShowCustomThemeView(show) {
    return {type: Types.SHOW_THEME_VIEW, customThemeViewVisible: show};
}