/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { 
  StyleSheet, Text, View, FlatList, RefreshControl, DeviceEventEmitter,
  ActivityIndicator, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import Toast from 'react-native-easy-toast'
import TrendingItem from '../commons/TrendingItem'
import NavigationBar from '../commons/NavigationBar'
import NavigationUtils from '../navigators/NavigationUtils'
import TrendingDialog, { TimeSpans } from '../commons/TrendingDialog'
import FavoriteUtil from '../utils/favoriteUtil'
import favoriteCheckUtil from '../utils/favoriteCheckUtil'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import DataSource, { FLAG_STORAGE } from '../asyncStorage/dataSource'
import actions from '../action'
import EventBus from 'react-native-event-bus'
const URL = 'https://github.com/trending/';
const THEME_COLOR = 'hotpink'
const pageSize = 10
const favoriteUtil = new FavoriteUtil(FLAG_STORAGE.flag_trending)

export default class TrendingPage extends Component{
  constructor(props) {
    super(props)
    this.state = {
        timeSpan: TimeSpans[0],
    };
    this.dataSource = new DataSource
    this.tabs = ['JavaScript', 'HTML', 'CSS', 'C', 'C++', 'C#']
  }
  createTopTabs() {
    let tab = {}
    this.tabs.forEach((item,idx) => {
      tab[`tab${idx}`] = {
        screen: props => <TrendingTabPage {...props} labelName={item} timeSpan={this.state.timeSpan} />,
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
  renderTitleView() {
    return <View>
              <TouchableOpacity
                  underlayColor='transparent'
                  onPress={() => this.dialog.showModal()}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text 
                        style={{
                            fontSize: 16,
                            color: '#FFFFFF',
                            fontWeight: '400'
                        }}
                      >
                        趋势 {this.state.timeSpan.showText}
                      </Text>
                      <MaterialIcons
                          name={'arrow-drop-down'}
                          size={22}
                          style={{color: 'white'}}
                      />
                  </View>
              </TouchableOpacity>
          </View>
  }
  renderTrendingDialog() {
    return <TrendingDialog
              ref={dialog => this.dialog = dialog}
              onSelect={tab => this.onSelectTimeSpan(tab)}
           />
  }
  onSelectTimeSpan(timeSpan) {
    this.dialog.dismissModal();
    this.setState({ timeSpan })
    DeviceEventEmitter.emit('select_timespan', timeSpan)
  }
  render() {
    let statusBar = {
        backgroundColor: 'hotpink',
        barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
            titleView={this.renderTitleView()}
            statusBar={statusBar}
            style={{backgroundColor: 'turquoise'}}
        />;
    let TopTab = this.createTopTabNavigator()
    return <View style={styles.container}>
            {navigationBar}
            <TopTab />
            {this.renderTrendingDialog()}
           </View>
  }
}

class TrendingTab extends Component {
  constructor(props) {
    super(props) 
    this.timeSpan = this.props.timeSpan
    this.isFavoriteChange = false
  }
  componentDidMount() {
    this.loadData()
    EventBus.getInstance().addListener('favorite_change_trending', this.favoriteListener = () => {
      this.isFavoriteChange = true
    })
    EventBus.getInstance().addListener('bottom_tab_change', this.selectListener = params => {
      params.to === 1 && this.isFavoriteChange && this.loadData(false,true)
    })
    this.timeSpanChangeListener = DeviceEventEmitter.addListener('select_timespan', timeSpan => {
      this.timeSpan = timeSpan
      this.loadData()
    })
  }
  componentWillUnmount() {
    if(this.timeSpanChangeListener)this.timeSpanChangeListenerremove()
    EventBus.getInstance().removeListener(this.favoriteListener)
    EventBus.getInstance().removeListener(this.selectListener)
  }
  loadData(loadMore,refreshFavorite) {
    this.getTrendingList(loadMore,refreshFavorite)
  }
  getTrendingList(loadMore,refreshFavorite) {
    const { onGetTrendingList, onGetTrendingListMore, onFlushTrendingFavorite, labelName } = this.props
    let store = this.handleStore()
    let url = this.generateFetchUrl(labelName)
    if(loadMore) {
      onGetTrendingListMore(labelName, ++store.pageIndex, pageSize, store.items, favoriteUtil, callback => {
        this.refs.toast.show('没有更多了啊')
      })
    }else if(refreshFavorite) {
      onFlushTrendingFavorite(labelName, store.pageIndex, pageSize, store.items, favoriteUtil)
    }else {
      onGetTrendingList(url, labelName, pageSize, favoriteUtil)
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
    return `${URL}${labelName}?${this.timeSpan.searchText}`
  }
  createItem(data) {
    const { item } = data
    return <TrendingItem
              projectModel={item}
              onSelect={callback => NavigationUtils.toTargetPage('DetailPage', {item, flag: FLAG_STORAGE.flag_trending,callback})}
              onFavorite={(item, isFavorite) => favoriteCheckUtil.onFavorite(favoriteUtil, item.item, isFavorite, FLAG_STORAGE.flag_trending)}
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
          keyExtractor={data => '' + data.fullName+Math.random()}
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
  trending: state.trending
})
const mapDispatchToProps =  dispatch => ({
  onGetTrendingList(url, labelName, pageSize, favoriteUtil) {
    dispatch(actions.getTrendingListActon(url, labelName, pageSize, favoriteUtil))
  },
  onGetTrendingListMore(labelName, pageIndex, pageSize, items, callback) {
    dispatch(actions.TrendingLoadMoreAction(labelName, pageIndex, pageSize, items, favoriteUtil, callback))
  },
  onFlushTrendingFavorite(labelName, pageIndex, pageSize, items, favoriteUtil) {dispatch(actions.onFlushTrendingFavorite(labelName, pageIndex, pageSize, items, favoriteUtil))},
})
let TrendingTabPage =  connect(mapStateToProps, mapDispatchToProps)(TrendingTab)


