/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, DeviceInfo, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview'
import NavigationBar from '../commons/NavigationBar'
import NavigationUtils from '../navigators/NavigationUtils'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import viewsUtil from '../utils/viewsUtil';
import favoriteUtils from '../utils/favoriteUtil'
const TRENDING_URL = 'https://github.com/'

export default class DetailPage extends Component{
  constructor(props) {
    super(props) 
    const { item, flag } = this.props.navigation.state.params
    const { fullName, full_name, html_url } = item.item
    let url = html_url || (TRENDING_URL + fullName)
    let title = fullName || full_name
    console.log('有没有flag啊:' + flag)
    this.favoriteUtil = new favoriteUtils(flag)
    this.state = {
      canGoBack: false,
      url,
      title,
      isFavorite: item.isFavorite
    }

  }
  goBack() {
    this.state.canGoBack ? this.webView.goBack() : NavigationUtils.goBack(this.props.navigation)
  }
  handleNaviStateChange(evt) {
    this.setState({
      canGoBack: evt.canGoBack,
      url: evt.url
    })
  }
  handleFavorite() {
    const { item, callback } = this.props.navigation.state.params
    const isFavorite = item.isFavorite = !item.isFavorite
    callback(isFavorite)
    this.setState({ isFavorite })
    let key = item.item.fullName ? item.item.fullName : item.item.id.toString();
    if (item.isFavorite) {
        this.favoriteUtil.saveFavoriteItem(key, JSON.stringify(item.item));
    } else {
        this.favoriteUtil.removeFavoriteItem(key);
    }
  }
  renderRightButton() {
    return <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.handleFavorite()}
              >
                <FontAwesome
                    name={this.state.isFavorite ? 'star' : 'star-o'}
                    size={20}
                    style={{color: 'white', marginRight: 10}}
                />
              </TouchableOpacity>
              {
                viewsUtil.getShareButton()
              }
           </View>
  }
  render() {
    const { title, url } = this.state
    const titleLayoutStyle = title.length > 20 ? {paddingRight: 30} : null;
    return (
      <View style={styles.container}>
        <NavigationBar 
          leftButton={viewsUtil.getLeftBackButton(() => this.goBack())}
          rightButton={this.renderRightButton()}
          titleLayoutStyle={titleLayoutStyle}
          title={title}
        />
        <WebView
          source={{ url }}
          ref={val => this.webView = val}
          startInLoadingState={true}
          onNavigationStateChange={evt => this.handleNaviStateChange(evt)}
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
