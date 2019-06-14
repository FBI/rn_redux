import Types from '../../action/types'

const defaultState = {
    languages: [],
    labels: []
};
export default function onAction(state = defaultState, action) {
    const { type, flag, data } = action
    switch (type) {
        case Types.LANGUAGE_LABEL_LOAD_SUCCESS://获取数据成功
            if ('label' === flag) {
                return {
                    ...state,
                    labels: data
                }
            } else {
                return {
                    ...state,
                    languages: data
                }
            }
        default:
            return state;
    }

}