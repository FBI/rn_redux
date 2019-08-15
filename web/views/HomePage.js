/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import NavigationUtils from '../navigators/NavigationUtils'
import DynamicTabNavigator from '../navigators/DynamicTabNavigator'
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux'
import actions from '../action'
import CustomThemePage from './CustomThemePage'
import SafeAreaViewPlus from '../commons/SafeaAreaViewPlus'

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
  renderCustomThemeView() {
    const { customThemeViewVisible, onShowCustomThemeView } = this.props
    return (<CustomThemePage
              {...this.props}
              visible={customThemeViewVisible}
              onClose={() => onShowCustomThemeView(false)}
           />)
  }
  render() {
    NavigationUtils.navigation = this.props.navigation
    return <SafeAreaViewPlus topColor={this.props.theme.themeColor}>
              <DynamicTabNavigator />
              {this.renderCustomThemeView()}
           </SafeAreaViewPlus>
  }
}
const mapStateToProps = state => ({
  nav: state.nav,
  customThemeViewVisible: state.theme.customThemeViewVisible,
  theme: state.theme.theme
})
const mapDispatchToProps = dispatch => ({
  onShowCustomThemeView(isShow) {
    dispatch(actions.onShowCustomThemeView(isShow))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)