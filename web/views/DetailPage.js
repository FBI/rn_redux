/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, WebView, DeviceInfo } from 'react-native';
import NavigationBar from '../commons/NavigationBar'
import viewsUtil from '../utils/viewsUtil'
const TRENDING_URL = 'https://github.com/'

export default class DetailPage extends Component{
  constructor(props) {
    super(props) 
    const { fullName } = this.props.navigation.state.params
    this.url = TRENDING_URL + fullName
    this.title = fullName
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar 
          leftButton={viewsUtil.getLeftBackButton()}
          title={this.title}
        />
        <WebView
          source={{url: this.url}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
  }
});
