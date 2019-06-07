import Types from '../types'
import DataSource from '../../asyncStorage/dataSource'
import { _projectModels } from '../actionUtil'

//  异步action获取最热模块列表数据
export function getTrendingListActon( url, labelName, pageSize, favoriteUtil ) {
    return dispatch => {
        dispatch({ type: Types.TRENDING_REFRESH, labelName })
        let dataSource = new DataSource();
        dataSource.fetchData( url, 'trending' ).then( res => {
            handleRefreshData(Types.TRENDING_REFRESH_SUCCESS, dispatch, labelName, res, pageSize, favoriteUtil)
        }).catch( error => {
            dispatch({
                type: Types.TRENDING_REFRESH_FAIL,
                labelName,
                error
            })
        })
    }
}

export function TrendingLoadMoreAction( labelName, pageIndex, pageSize, dataArray = [], favoriteUtil,callback ) {
    return dispatch => {
        setTimeout(() => {// 模拟网络请求
            if((pageIndex - 1) * pageSize >= dataArray.length) {// 没有更多数据
                typeof callback === 'function' && callback('已经到底了啊')
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    error: '没有更多数据...',
                    labelName,
                    pageIndex: --pageIndex,
                    projectModels: dataArray
                })
            }else {
                //计算本次可加载的最大数据量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                _projectModels(dataArray.slice(0, max),favoriteUtil,projectModels=>{
                    dispatch({
                        type: Types.TRENDING_LOAD_MORE_SUCCESS,
                        labelName,
                        pageIndex,
                        projectModels
                    })
                })
            }
            
        }, 500)
    }
}

// 处理下拉刷新数据
function handleRefreshData( actionType, dispatch, labelName, data, pageSize, favoriteUtil ) {
    let fixItems = []
    if(data && data.data && data.data) {
        fixItems = data.data
    }
    let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
    _projectModels(showItems,favoriteUtil,projectModels=>{
        dispatch({
            type: actionType,
            items: fixItems,
            projectModels: projectModels,
            pageIndex: 1,
            labelName
        })
    });
}
export function onFlushTrendingFavorite(labelName, pageIndex, pageSize, dataArray = [], favoriteUtil) {
    return dispatch=>{
        //本次和载入的最大数量
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
        _projectModels(dataArray.slice(0, max),favoriteUtil,data=>{
            dispatch({
                type: Types.FLUSH_TRENDING_FAVORITE,
                labelName,
                pageIndex,
                projectModels: data,
            })
        })
    }
}