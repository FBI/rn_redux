import { FLAG_STORAGE } from '../asyncStorage/dataSource'

export default class FavoriteCheck {
    /**
     * 检查该Item是否被收藏
     * **/
    static checkFavorite(item, keys = []) {
        if (!keys) return false;
        for (let i = 0, len = keys.length; i < len; i++) {
            let id = item.id ? item.id : item.fullName;
            if (id.toString() === keys[i]) {
                return true;
            }
        }
        return false;
    }
    /**
     * 检查key是否存在于keys中
     * @param keys
     * @param key
     */
    static checkKeyIsExist(keys, key) {
        for (let i = 0, l = keys.length; i < l; i++) {
            if (key.toLowerCase() === keys[i].name.toLowerCase()) return true;
        }
        return false;
    }

    static onFavorite(favoriteUtil, item, isFavorite, flag) {
        const key = flag === FLAG_STORAGE.flag_trending ? item.fullName : item.id.toString();
        if (isFavorite) {
            favoriteUtil.saveFavoriteItem(key, JSON.stringify(item));
        } else {
            favoriteUtil.removeFavoriteItem(key);
        }
    }
}