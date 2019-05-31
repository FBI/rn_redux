import Types from '../types'
import DataSource from '../../asyncStorage/dataSource'

//  异步action获取最热模块列表数据
export function getTrendingListActon( url, labelName, pageSize ) {
    return dispatch => {
        dispatch({ type: Types.TRENDING_REFRESH, labelName })
        let dataSource = new DataSource();
        dataSource.fetchData( url, 'trending' ).then( res => {
            handleRefreshData(Types.TRENDING_REFRESH_SUCCESS, dispatch, labelName, res, pageSize)
        }).catch( error => {
            dispatch({
                type: Types.TRENDING_REFRESH_FAIL,
                labelName,
                error
            })
        })
    }
}

export function TrendingLoadMoreAction( labelName, pageIndex, pageSize, dataArray = [], callback ) {
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
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_SUCCESS,
                    labelName,
                    pageIndex,
                    projectModels: dataArray.slice(0, max)
                })
            }
            
        }, 500)
    }
}

// 处理下拉刷新数据
function handleRefreshData( actionType, dispatch, labelName, data, pageSize ) {
    let fixItems = []
    if(data && data.data && data.data) {
        fixItems = data.data
    }
    dispatch({
        type: actionType,
        items: fixItems,
        projectModels: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), // 第一次加载数据
        pageIndex: 1,
        labelName
        
    })
}
