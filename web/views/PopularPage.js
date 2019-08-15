/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import { connect } from 'react-redux'
import DataSource, { FLAG_STORAGE } from '../asyncStorage/dataSource'
import actions from '../action'
import PopularItem from '../commons/PopularItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../commons/NavigationBar'
import NavigationUtils from '../navigators/NavigationUtils'
import FavoriteUtil from '../utils/favoriteUtil'
import favoriteCheckUtil from '../utils/favoriteCheckUtil'
import EventBus from 'react-native-event-bus'
const URL = 'https:/api.github.com/search/repositories?q='
const QUERY_STR ='&sort=stars'
const pageSize = 10
const favoriteUtil = new FavoriteUtil(FLAG_STORAGE.flag_popular)

class PopularPage extends Component{
  constructor(props) {
    super(props)
    this.dataSource = new DataSource
  }
  componentDidMount() {
    const { onLoadLabel } = this.props
    onLoadLabel()
  }
  createTopTabs() {
    let tab = {}
    const { labels } = this.props
    labels.forEach((item,idx) => {
      if(item.checked) {
        tab[`tab${idx}`] = {
          screen: props => <PopularTabPage {...props} labelName={item.name} />,
          navigationOptions: {
            tabBarLabel: item.name
          }
        }
      }
    })
    return tab
  }
  createTopTabNavigator() {
    const { theme } = this.props
    let tn =  createMaterialTopTabNavigator(this.createTopTabs(), {
      lazy: true,
      tabBarOptions: {
        inactiveTintColor: 'white',
        tabStyle: styles.tabStyle,
        labelStyle: styles.labelStyle,
        upperCaseLabel: false,
        scrollEnabled: true,
        style: {
          backgroundColor: theme.themeColor
        },
        indicatorStyle: styles.indicatorStyle
      }
    })
    return createAppContainer(tn)
  }
  render() {
    const { theme } = this.props
    let statusBar = {
        backgroundColor: theme.themeColor,
        barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
        title={'最热'}
        statusBar={statusBar}
        style={theme.styles.navBar}
    />;
    let TopTab = this.props.labels.length ? this.createTopTabNavigator() : null
    return <View style={styles.container}>
            {navigationBar}
            { TopTab && <TopTab />}
           </View>
  }
}
const mapPopularPageStateToProps = state => ({
  labels: state.labelLanguage.labels,
  theme: state.theme.theme
})
const mapPopularPagDispatchToProps =  dispatch => ({
  onLoadLabel() {
    dispatch(actions.onLoadLanguageLabel('label'))
  },
})
export default connect(mapPopularPageStateToProps, mapPopularPagDispatchToProps)(PopularPage)




class PopularTab extends Component {
  constructor(props) {
    super(props) 
    this.isFavoriteChange = false
  }
  componentDidMount() {
    this.loadData()
    EventBus.getInstance().addListener('favorite_change_popular', this.favoriteListener = () => {
      this.isFavoriteChange = true
    })
    EventBus.getInstance().addListener('bottom_tab_change', this.selectListener = params => {
      params.to === 0 && this.isFavoriteChange && this.loadData(null, true)
    })
  }
  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.favoriteListener)
    EventBus.getInstance().removeListener(this.selectListener)
  }
  loadData(loadMore, refreshFavorite) {
    this.getPopularList(loadMore,refreshFavorite)
  }
  getPopularList(loadMore, refreshFavorite) {
    const { onGetPopularList, onGetPopularListMore, onFlushPopularFavorite, labelName } = this.props
    let store = this.handleStore()
    let url = this.generateFetchUrl(labelName)
    if(loadMore) {
      onGetPopularListMore(labelName, ++store.pageIndex, pageSize, store.items, favoriteUtil, callback => {
        this.refs.toast.show('没有更多了啊')
      })
    }else if(refreshFavorite) {
      onFlushPopularFavorite(labelName, store.pageIndex, pageSize, store.items, favoriteUtil);
    }else {
      onGetPopularList(url, labelName, pageSize, favoriteUtil)
    }
  }
  handleStore() {
    const { popular, labelName } = this.props
    let store = popular[labelName]
    if(!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [],
        hideLoadingMore: true //默认隐藏加载更多
      }
    }
    return store
  }
  generateFetchUrl(labelName) {
    return URL + labelName + QUERY_STR
  }
  createItem(data) {
    const { item } = data
    const { theme } = this.props
    return <PopularItem
              theme={theme}
              projectModel={item}
              onSelect={callback =>  NavigationUtils.toTargetPage(
                  'DetailPage', 
                  {item,theme,flag: FLAG_STORAGE.flag_popular,callback}
                )
              }
              onFavorite={(item, isFavorite) => favoriteCheckUtil.onFavorite(favoriteUtil, item.item, isFavorite, FLAG_STORAGE.flag_popular)}
           />
  }
  getIndicator() {
    const { theme } = this.props
    return this.handleStore().hideLoadingMore ? null :
          <View style={styles.indicatorContainer}>
            <ActivityIndicator
              color={theme.themeColor}
            />
            <Text style={{color: theme.themeColor}}>加载更多...</Text>
          </View>
  }
  render() {
    
    const { theme } = this.props
    let store = this.handleStore()
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={store.projectModels}
          renderItem={data => this.createItem(data)}
          keyExtractor={data => '' + data.item.id}
          refreshControl={
            <RefreshControl
              title={'玩命加载中...'}
              titleColor={theme.themeColor}
              refreshing={store.isLoading}
              color={[theme.themeColor]}
              tintColor={theme.themeColor}
              onRefresh={() => this.loadData()}
            />
          }
          ListFooterComponent={() => this.getIndicator()}
          onEndReached={() => {
            // 列表滚动f到底部时加载更多数据
            if(this.canLoadMore) {
              setTimeout(() => {
                  if (this.canLoadMore) {
                      this.loadData(true)
                      this.canLoadMore = false;
                  }
              }, 100);
            }
          }}
          onEndReachedThreshold={.5}
          onMomentumScrollBegin={() => {
              this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
          }}
        />
        <Toast
          ref={'toast'}
          position={'center'}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  popular: state.popular,
  theme: state.theme.theme
})
const mapDispatchToProps =  dispatch => ({
  onGetPopularList(url, labelName, pageSize, favoriteUtil) {
    dispatch(actions.getPopularListActon(url, labelName, pageSize, favoriteUtil))
  },
  onGetPopularListMore(labelName, pageIndex, pageSize, items,favoriteUtil, callback) {
    dispatch(actions.PopularLoadMoreAction(labelName, pageIndex, pageSize, items, favoriteUtil, callback))
  },
  onFlushPopularFavorite: (labelName, pageIndex, pageSize, items, favoriteUtil) => dispatch(actions.onFlushPopularFavorite(labelName, pageIndex, pageSize, items, favoriteUtil)),
})
let PopularTabPage =  connect(mapStateToProps, mapDispatchToProps)(PopularTab)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    minWidth: 10
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff'
  },
  labelStyle: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 6
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    margin: 10
  }
});


