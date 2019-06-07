import onThemeChange from './theme'
import { getPopularListActon, PopularLoadMoreAction,onFlushPopularFavorite } from './popular'
import { getTrendingListActon, TrendingLoadMoreAction, onFlushTrendingFavorite } from './trending'
import { getFavoriteDataAction } from './favorite'

export default {
    onThemeChange,
    getPopularListActon,
    PopularLoadMoreAction,
    getTrendingListActon,
    TrendingLoadMoreAction,
    getFavoriteDataAction,
    onFlushPopularFavorite,
    onFlushTrendingFavorite
}