/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import NavigationUtils from '../navigators/NavigationUtils'
import DynamicTabNavigator from '../navigators/DynamicTabNavigator'
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux'

class HomePage extends Component{
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }
  // 处理安卓物理返回键
  onBackPress = () => {
    const { dispatch, nav } = this.props
    if(nav.routes[1].index === 0) return
    dispatch(NavigationActions.back())
    return true
  }
  render() {
    NavigationUtils.navigation = this.props.navigation
    return <View style={{flex: 1}}><DynamicTabNavigator /></View>
  }
}
const mapStateToProps = state => ({
  nav: state.nav
})
export default connect(mapStateToProps, null)(HomePage)