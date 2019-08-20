/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import navigationUtil from '../navigators/NavigationUtils'
import SplashScreen from 'react-native-splash-screen'

export default class WelcomePage extends Component{
  constructor(props) {
    super(props)
    console.disableYellowBox = true
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      SplashScreen.hide();
      navigationUtil.resetToHomePage(this.props)
    },200)
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }
  render() {
    return null
  }
}

