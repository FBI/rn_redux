import { onThemeChange, onShowCustomThemeView, onThemeInit } from './theme'
import { getPopularListActon, PopularLoadMoreAction,onFlushPopularFavorite } from './popular'
import { getTrendingListActon, TrendingLoadMoreAction, onFlushTrendingFavorite } from './trending'
import { getFavoriteDataAction } from './favorite'
import { onLoadLanguageLabel } from './labels-languages'

export default {
    onThemeChange,
    onShowCustomThemeView,
    onThemeInit,
    getPopularListActon,
    PopularLoadMoreAction,
    getTrendingListActon,
    TrendingLoadMoreAction,
    getFavoriteDataAction,
    onFlushPopularFavorite,
    onFlushTrendingFavorite,
    onLoadLanguageLabel
}