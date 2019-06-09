/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../commons/NavigationBar'
import navigationUtil from  '../navigators/NavigationUtils'
import moreMenuUtil from '../utils/moreMenuUtil'
import viewsUtil from '../utils/viewsUtil'
import globalStyle from '../styles/globalStyle'

export default class MyPage extends Component{
  onClick(menu) {
    let routeName = ''
    let params = {}
    switch(menu) {
      case moreMenuUtil.Tutorial: 
            routeName = 'WebViewPage';
            params.title = '教程';
            params.url = 'https://github.com/Solido/awesome-flutter';
            break;
      case moreMenuUtil.About:
            routeName = 'AboutPage';
            break;
      case moreMenuUtil.About_Author:
            routeName = 'AboutMePage';
            break;
      case moreMenuUtil.Feedback:
            const url = 'mailto://18311433156@163.com';
            Linking.canOpenURL(url)
                .then(support => {
                    if (!support) {
                      Alert.alert(
                        '你这个手机上没有安装该邮箱嘞',
                      )
                        console.log('Can\'t open email: ' + url);
                    } else {
                        Linking.openURL(url);
                    }
                }).catch(e => {
                    console.error('哈哈哈哈，打不开邮箱啊', e);
            });
            break;
    }
    if (routeName) {
      navigationUtil.toTargetPage(routeName, params);
    }
  }
  renderItem(menu) {
    return viewsUtil.getMenuItem(() => this.onClick(menu), menu, 'hotpink');
  }
  render() {
    let statusBar = {
        backgroundColor: 'hotpink',
        barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
        title={'我的'}
        statusBar={statusBar}
        style={{backgroundColor: 'turquoise'}}
    />;
    return (
      <View style={[globalStyle.root_container,styles['myPage-wrapper']]}>
        {navigationBar}
        <ScrollView>
          <TouchableOpacity 
            style={styles.item}
            underlayColor='transparent'
            onPress={() => this.onClick(moreMenuUtil.About)}
          >
            <View style={styles.about_left}>
              <Ionicons
                  name={moreMenuUtil.About.icon}
                  size={40}
                  style={{
                      marginRight: 10,
                      color: 'hotpink',
                  }}
              />
              <Text>GitHub Client</Text>
            </View>
            <Ionicons
              name={'ios-arrow-forward'}
              size={16}
              style={{
                  marginRight: 10,
                  alignSelf: 'center',
                  color: 'hotpink',
              }}
            />
          </TouchableOpacity>
          <View style={globalStyle.line} />
          {this.renderItem(moreMenuUtil.Tutorial)} 
          <Text style={styles.groupTitle}>趋势管理</Text>
          {this.renderItem(moreMenuUtil.Custom_Language)}
          <View style={globalStyle.line}/>
          {this.renderItem(moreMenuUtil.Sort_Language)}

          <Text style={styles.groupTitle}>最热管理</Text>
          {this.renderItem(moreMenuUtil.Custom_Key)}
          <View style={globalStyle.line}/>
          {this.renderItem(moreMenuUtil.Sort_Key)}
          <View style={globalStyle.line}/>
          {this.renderItem(moreMenuUtil.Remove_Key)}


          <Text style={styles.groupTitle}>设置</Text>
          {this.renderItem(moreMenuUtil.Custom_Theme)}
          <View style={globalStyle.line}/>
          {this.renderItem(moreMenuUtil.About_Author)}
          <View style={globalStyle.line}/>
          {this.renderItem(moreMenuUtil.Feedback)}
          <View style={globalStyle.line}/>
          {this.renderItem(moreMenuUtil.CodePush)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  'myPage-wrapper': {
    marginTop: 30,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  about_left: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray'
 }
});
