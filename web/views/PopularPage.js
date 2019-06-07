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
const URL = 'https:/api.github.com/search/repositories?q='
const QUERY_STR ='&sort=stars'
const THEME_COLOR = 'hotpink'
const pageSize = 10
const favoriteUtil = new FavoriteUtil(FLAG_STORAGE.flag_popular)

export default class PopularPage extends Component{
  constructor(props) {
    super(props)
    this.dataSource = new DataSource
    this.tabs = ['Flutter', 'React Native', 'Weex', 'Ionic', 'React', 'Vue', 'Angular']
  }
  createTopTabs() {
    let tab = {}
    this.tabs.forEach((item,idx) => {
      tab[`tab${idx}`] = {
        screen: props => <PopularTabPage {...props} labelName={item} />,
        navigationOptions: {
          tabBarLabel: item
        }
      }
    })
    return tab
  }
  createTopTabNavigator() {
    if(this.tabNav) return this.tabNav
    let tn =  createMaterialTopTabNavigator(this.createTopTabs(), {
      tabBarOptions: {
        inactiveTintColor: 'white',
        tabStyle: styles.tabStyle,
        labelStyle: styles.labelStyle,
        upperCaseLabel: false,
        scrollEnabled: true,
        style: {
          backgroundColor: 'turquoise'
        },
        indicatorStyle: styles.indicatorStyle
      }
    })
    return this.tabNav = createAppContainer(tn)
  }
  render() {
    let statusBar = {
        backgroundColor: 'hotpink',
        barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
        title={'最热'}
        statusBar={statusBar}
        style={{backgroundColor: 'turquoise'}}
    />;
    let TopTab = this.createTopTabNavigator()
    return <View style={styles.container}>
            {navigationBar}
            <TopTab />
           </View>
  }
}

class PopularTab extends Component {
  constructor(props) {
    super(props) 
  }
  componentDidMount() {
    this.loadData()
  }
  loadData(loadMore) {
    this.getPopularList(loadMore)
  }
  getPopularList(loadMore) {
    const { onGetPopularList, onGetPopularListMore, labelName } = this.props
    let store = this.handleStore()
    let url = this.generateFetchUrl(labelName)
    if(loadMore) {
      onGetPopularListMore(labelName, ++store.pageIndex, pageSize, store.items, favoriteUtil, callback => {
        this.refs.toast.show('没有更多了啊')
      })
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
    return <PopularItem
              projectModel={item}
              onSelect={callback =>  NavigationUtils.toTargetPage(
                'DetailPage', {item:item,flag: FLAG_STORAGE.flag_popular,callback})
              }
              onFavorite={(item, isFavorite) => favoriteCheckUtil.onFavorite(favoriteUtil, item.item, isFavorite, FLAG_STORAGE.flag_popular)}
           />
  }
  getIndicator() {
    return this.handleStore().hideLoadingMore ? null :
          <View style={styles.indicatorContainer}>
            <ActivityIndicator
              style={styles.indicator}
            />
            <Text>加载更多...</Text>
          </View>
  }
  render() {
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
              titleColor={THEME_COLOR}
              refreshing={store.isLoading}
              color={[THEME_COLOR]}
              tintColor={THEME_COLOR}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
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
    color: 'hotpink',
    margin: 10
  }
});

const mapStateToProps = state => ({
  popular: state.popular
})
const mapDispatchToProps =  dispatch => ({
  onGetPopularList(url, labelName, pageSize, favoriteUtil) {
    dispatch(actions.getPopularListActon(url, labelName, pageSize, favoriteUtil))
  },
  onGetPopularListMore(labelName, pageIndex, pageSize, items,favoriteUtil, callback) {
    dispatch(actions.PopularLoadMoreAction(labelName, pageIndex, pageSize, items, favoriteUtil, callback))
  }
})
let PopularTabPage =  connect(mapStateToProps, mapDispatchToProps)(PopularTab)


