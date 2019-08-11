/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import { connect } from 'react-redux'
import actions from '../action'
import PopularItem from '../commons/PopularItem'
import TrendingItem from '../commons/TrendingItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../commons/NavigationBar'
import NavigationUtils from '../navigators/NavigationUtils'
import FavoriteUtil from '../utils/favoriteUtil'
import favoriteCheckUtil from '../utils/favoriteCheckUtil'
import EventBus from 'react-native-event-bus'
const THEME_COLOR = 'hotpink'

class FavoritePage extends Component{
  constructor(props) {
    super(props)
  }
  createTopTabNavigator() {
    const { theme } = this.props
    let tn =  createMaterialTopTabNavigator(
      {
        PopularPage: {
          screen: props => <FavoriteTabPage {...props} flag={'popular'} />,
          navigationOptions: {
            tabBarLabel: '最热'
          }
        },
        TrendingPage: {
          screen: props => <FavoriteTabPage {...props} flag={'trending'} />,
          navigationOptions: {
            tabBarLabel: '趋势'
          }
        }
      }, 
      {
        tabBarOptions: {
          inactiveTintColor: 'white',
          tabStyle: styles.tabStyle,
          labelStyle: styles.labelStyle,
          upperCaseLabel: false,
          style: {
            backgroundColor: theme.themeColor
          },
          indicatorStyle: styles.indicatorStyle
        }
      }
    )
    return createAppContainer(tn)
  }
  render() {
    const { theme } = this.props
    let statusBar = {
        backgroundColor: theme.themeColor,
        barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
        title={'收藏'}
        statusBar={statusBar}
        style={theme.styles.navBar}
    />;
    let TopTab = this.createTopTabNavigator()
    return <View style={styles.container}>
            {navigationBar}
            <TopTab />
           </View>
  }
}
const mapFavoriteStateToProps = state => ({
  theme: state.theme.theme
})
export default connect(mapFavoriteStateToProps, null)(FavoritePage)

class FavoriteTab extends Component {
  constructor(props) {
    super(props) 
    const { flag } = this.props
    this.labelName = flag
    this.favoriteUtil = new FavoriteUtil(flag)
  }
  componentDidMount() {
    this.loadData(true)
    EventBus.getInstance().addListener('bottom_tab_change', this.listener = params => {
      params.to === 2 && this.loadData(false)
    })
  }
  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener)
  }
  loadData(isShowLoading) {
    const { getFavoriteData } = this.props
    getFavoriteData(this.labelName, isShowLoading)
  }
  handleStore() {
    const { favorite } = this.props
    let store = favorite[this.labelName]
    if(!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [],
      }
    }
    return store
  }
  onFavorite(item, isFavorite) {
    favoriteCheckUtil.onFavorite(this.favoriteUtil, item.item, isFavorite, this.labelName)
    if(this.labelName === 'popular') {
      EventBus.getInstance().fireEvent('favorite_change_popular')
    }else {
      EventBus.getInstance().fireEvent('favorite_change_trending')
    }
  }
  createItem(data) {
    const { item } = data
    const { theme } = this.props
    const FavoriteItem = this.labelName === 'popular' ? PopularItem : TrendingItem
    return <FavoriteItem
              theme={theme}
              projectModel={item}
              onSelect={callback =>  NavigationUtils.toTargetPage(
                  'DetailPage', {
                      item,
                      theme,
                      flag: this.labelName,
                      callback
                  }
                )
              }
              onFavorite={(item, isFavorite) => this.onFavorite(item,isFavorite)}
           />
  }
  render() {
    let store = this.handleStore()
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={store.projectModels}
          renderItem={data => this.createItem(data)}
          keyExtractor={data => '' + data.item.id || (data.fullName+Math.random())}
          refreshControl={
            <RefreshControl
              title={'玩命加载中...'}
              titleColor={THEME_COLOR}
              refreshing={store.isLoading}
              color={[THEME_COLOR]}
              tintColor={THEME_COLOR}
              onRefresh={() => this.loadData(true)}
            />
          }
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
    flex: 1
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
  favorite: state.favorite,
  theme: state.theme.theme
})
const mapDispatchToProps =  dispatch => ({
  getFavoriteData(labelName, isShowLoading) {
    dispatch(actions.getFavoriteDataAction(labelName, isShowLoading))
  },
})
let FavoriteTabPage =  connect(mapStateToProps, mapDispatchToProps)(FavoriteTab)


