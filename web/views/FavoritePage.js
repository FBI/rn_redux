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
const THEME_COLOR = 'hotpink'

export default class FavoritePage extends Component{
  constructor(props) {
    super(props)
  }
  createTopTabNavigator() {
    if(this.tabNav) return this.tabNav
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
            backgroundColor: 'turquoise'
          },
          indicatorStyle: styles.indicatorStyle
        }
      }
    )
    return this.tabNav = createAppContainer(tn)
  }
  render() {
    let statusBar = {
        backgroundColor: 'hotpink',
        barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
        title={'收藏'}
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

class FavoriteTab extends Component {
  constructor(props) {
    super(props) 
    const { flag } = this.props
    this.labelName = flag
    this.favoriteUtil = new FavoriteUtil(flag)
  }
  componentDidMount() {
    this.loadData(true)
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
  }
  createItem(data) {
    const { item } = data
    const FavoriteItem = this.labelName === 'popular' ? PopularItem : TrendingItem
    return <FavoriteItem
              projectModel={item}
              onSelect={callback =>  NavigationUtils.toTargetPage(
                  'DetailPage', {
                      item,
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
  favorite: state.favorite
})
const mapDispatchToProps =  dispatch => ({
  getFavoriteData(labelName, isShowLoading) {
    dispatch(actions.getFavoriteDataAction(labelName, isShowLoading))
  },
})
let FavoriteTabPage =  connect(mapStateToProps, mapDispatchToProps)(FavoriteTab)


