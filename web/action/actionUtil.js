import ProjectModel from '../utils/projectModelUtil'
import favoriteCheck from '../utils/favoriteCheckUtil'

export async function _projectModels(showItems, favoriteDao, callback) {
    let keys = [];
    try {
        //获取收藏的key
        keys = await favoriteDao.getFavoriteKeys();
    } catch (e) {
        console.log(e);
    }
    let projectModels = [];
    for (let i = 0, len = showItems.length; i < len; i++) {
        projectModels.push(new ProjectModel(showItems[i], favoriteCheck.checkFavorite(showItems[i], keys)));
    }
    doCallBack(callback,projectModels);
}
export const doCallBack = (callBack, object) => {
    if (typeof callBack === 'function') {
        callBack(object);
    }
}; 
