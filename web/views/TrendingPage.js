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
import DataSource from '../asyncStorage/dataSource'
import actions from '../action'
import TrendingItem from '../commons/TrendingItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../commons/NavigationBar'
const URL = 'https://github.com/trending/';
const THEME_COLOR = 'hotpink'
const pageSize = 10

export default class TrendingPage extends Component{
  constructor(props) {
    super(props)
    this.dataSource = new DataSource
    this.tabs = ['JavaScript', 'HTML', 'CSS', 'C', 'C++', 'C#']
  }
  createTopTabs() {
    let tab = {}
    this.tabs.forEach((item,idx) => {
      tab[`tab${idx}`] = {
        screen: props => <TrendingTabPage {...props} labelName={item} />,
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
        title={'趋势'}
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

class TrendingTab extends Component {
  constructor(props) {
    super(props) 
  }
  getTrendingList(loadMore) {
    const { onGetTrendingList, onGetTrendingListMore, labelName } = this.props
    let store = this.handleStore()
    let url = this.generateFetchUrl(labelName)
    if(loadMore) {
      // onGetTrendingListMore(labelName, ++store.pageIndex, pageSize, store.items, callback => {
      //   this.refs.toast.show('没有更多了啊')
      // })
    }else {
      onGetTrendingList(url, labelName, pageSize)
    }
  }
  handleStore() {
    const { trending, labelName } = this.props
    let store = trending[labelName]
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
    return URL + labelName + '?since=daily'
  }
  createItem(data) {
    const item = data.TrendingRepoModel
    return <TrendingItem
              projectModel={item}
              onPress={() => {}}
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
    console.log('这回是真有数据了')
    console.log(store.projectModels)
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={store.projectModels}
          renderItem={data => this.createItem(data)}
          keyExtractor={data => '' + data.id}
          refreshControl={
            <RefreshControl
              title={'玩命加载中...'}
              titleColor={THEME_COLOR}
              refreshing={store.isLoading}
              color={[THEME_COLOR]}
              tintColor={THEME_COLOR}
              onRefresh={() => this.getTrendingList()}
            />
          }
          ListFooterComponent={() => this.getIndicator()}
          onEndReached={() => {
            // 列表滚动f到底部时加载更多数据
            if(this.canLoadMore) {
              setTimeout(() => {
                  if (this.canLoadMore) {
                      this.getTrendingList(true)
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
  trending: state.trending
})
const mapDispatchToProps =  dispatch => ({
  onGetTrendingList(url, labelName, pageSize) {
    dispatch(actions.getTrendingListActon(url, labelName, pageSize))
  },
  onGetTrendingListMore(labelName, pageIndex, pageSize, items, callback) {
    dispatch(actions.TrendingLoadMoreAction(labelName, pageIndex, pageSize, items, callback))
  }
})
let TrendingTabPage =  connect(mapStateToProps, mapDispatchToProps)(TrendingTab)


