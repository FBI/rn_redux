/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { BottomTabBar } from 'react-navigation-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux'
import PopularPage from '../views/PopularPage'
import TrendingPage from '../views/TrendingPage'
import FavoritePage from '../views/FavoritePage'
import MyPage from '../views/MyPage'
import EventBus from 'react-native-event-bus'

const TABS = {
    PopularPage: {
      screen: PopularPage,
      navigationOptions: {
        tabBarLabel: '最热',
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons
            name={'whatshot'}
            size={26}
            style={{color: tintColor}}
          />
        )
      }
    },
    TrendingPage: {
      screen: TrendingPage,
      navigationOptions: {
        tabBarLabel: '趋势',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={'md-trending-up'}
            size={26}
            style={{color: tintColor}}
          />
        )
      }
    },
    FavoritePage: {
      screen: FavoritePage,
      navigationOptions: {
        tabBarLabel: '收藏',
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialIcons
            name={'favorite'}
            size={26}
            style={{color: tintColor}}
          />
        )
      }
    },
    MyPage: {
      screen: MyPage,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor, focused }) => (
          <Entypo
            name={'user'}
            size={26}
            style={{color: tintColor}}
          />
        )
      }
    }
}

class DynamicTabNavigator extends Component {
  constructor(props) {
      super(props)
      console.disableYellowBox = true
  }
  createBottomNavigator() {
    if(this.tabs) return this.tabs
    const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
    const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }
    
    let tn = createBottomTabNavigator(tabs,{
        tabBarComponent: props => <TabBarComponent {...props} theme={this.props.theme} />
    })
    return this.tabs = createAppContainer(tn)
  }
  render() {
    const BottomTabNavigator = this.createBottomNavigator()
    return <BottomTabNavigator 
              onNavigationStateChange={(prevState, nextState, action) =>{
                EventBus.getInstance().fireEvent('bottom_tab_change', {
                  from: prevState.index,
                  to: nextState.index
                })
              }} 
           />
  }
}
class TabBarComponent extends Component {
    constructor(props) {
        super(props) 
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        }
    }
    render() {
        return <BottomTabBar 
                    {...this.props}
                    activeTintColor={this.props.theme.themeColor}
               />
    }
}
const mapStateToProps = state => ({
  theme: state.theme.theme
})
export default connect(mapStateToProps)(DynamicTabNavigator)
