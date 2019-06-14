import Types from '../types'
import LabelLanguageUtil from '../../utils/labelLanguageUtil'
/**
 * 加载标签
 * @param flag
 * @returns {function(*)}
 */
export function onLoadLanguageLabel(flag) {
    return async dispatch => {
        try {
            let data = await new LabelLanguageUtil( flag ).fetch();
            dispatch({type: Types.LANGUAGE_LABEL_LOAD_SUCCESS, data, flag})
        } catch (e) {
            console.log(e)
        }
    }
}