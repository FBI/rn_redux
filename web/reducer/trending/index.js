import Types from "../../action/types";

let defaultState = {}
export default (state = defaultState, action) => {
    const { type, labelName, items, projectModels, pageIndex } = action
    switch(type) {
        case Types.TRENDING_REFRESH_SUCCESS: // 下拉刷新成功
            return { 
                ...state,
                [labelName]: {
                    ...state[labelName],
                    items, // 原始数据
                    pageIndex,
                    projectModels, // 本次要展示的数据
                    hideLoadingMore: false,
                    isLoading: false
                }
            }
        case Types.TRENDING_REFRESH_FAIL: 
            return { 
                ...state,
                [labelName]: {
                    ...state[labelName],
                    isLoading: false
                }
            }
        case Types.TRENDING_REFRESH:
            return {
                ...state,
                [labelName]: {
                    ...state[labelName],
                    isLoading: true,
                    hideLoadingMore: true
                }
            }
        case Types.TRENDING_LOAD_MORE_SUCCESS:// 上拉加载更多成功
            return { 
                ...state,
                [labelName]: {
                    ...state[labelName],
                    projectModels,
                    pageIndex,
                    hideLoadingMore: false
                }
            }
        case Types.TRENDING_LOAD_MORE_FAIL:// 卡拉加载更多失败
            return { 
                ...state,
                [labelName]: {
                    ...state[labelName],
                    pageIndex,
                    hideLoadingMore: true
                }
            }
        default: 
            return state
    }
}