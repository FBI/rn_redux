import Types from '../types'
import { _projectModels } from '../actionUtil'
import FavoriteUtil from "../../utils/favoriteUtil";
import ProjectModel from "../../utils/projectModelUtil";


/**
 * 加载收藏的项目
 * @param flag 标识
 * @param isShowLoading 是否显示loading
 * @returns {function(*)}
 */
export function getFavoriteDataAction(flag, isShowLoading) {
    return dispatch => {
        if (isShowLoading) {
            dispatch({type: Types.FAVORITE_LOAD_DATA, labelName: flag});
        }
        new FavoriteUtil(flag).getAllItems()
            .then(items => {
                let resultData = [];
                for (let i = 0, len = items.length; i < len; i++) {
                    resultData.push(new ProjectModel(items[i], true));
                }
                dispatch({type: Types.FAVORITE_LOAD_SUCCESS, projectModels: resultData, labelName: flag});
            })
            .catch(e => {
                console.log(e);
                dispatch({type: Types.FAVORITE_LOAD_FAIL, error: e, labelName: flag});
            })

    }
}
