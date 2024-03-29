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
import { connect } from 'react-redux'
import actions from '../action'
import NavigationBar from '../commons/NavigationBar'
import navigationUtil from  '../navigators/NavigationUtils'
import moreMenuUtil from '../utils/moreMenuUtil'
import viewsUtil from '../utils/viewsUtil'
import globalStyle from '../styles/globalStyle'

class MyPage extends Component{
  onClick(menu) {
    const { theme } = this.props
    let routeName, params = { theme }
    switch(menu) {
      case moreMenuUtil.Tutorial: 
            routeName = 'HotLibraries';
            params.title = '前端热门库';
           // params.theme = this.props.theme
            params.url = 'https://github.com/Solido/awesome-flutter';
            break;
      case moreMenuUtil.About:
            routeName = 'AboutPage';
            break;
      case moreMenuUtil.About_Author:
            routeName = 'AboutMePage';
            break;
      case moreMenuUtil.Custom_Key:
      case moreMenuUtil.Custom_Language:
      case moreMenuUtil.Remove_Key:
            routeName = 'CustomPage'
            params.isRemoveLabel = menu === moreMenuUtil.Remove_Key;
            params.flag = menu !== moreMenuUtil.Custom_Language ? 'label' : 'language';
            break;
      case moreMenuUtil.Sort_Key:
            routeName = 'SortPage';
            params.flag = 'label';
            break;
      case moreMenuUtil.Sort_Language:
            routeName = 'SortPage';
            params.flag = 'language';
            break;
      case moreMenuUtil.Custom_Theme:
        const { onShowCustomThemeView } = this.props;
        onShowCustomThemeView(true);
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
        case moreMenuUtil.CodePush:
           routeName = 'CodePushPage';
           break;
    }
    if (routeName) {
      navigationUtil.toTargetPage(routeName, params);
    }
  }
  renderItem(menu) {
   const { theme } = this.props
    return viewsUtil.getMenuItem(() => this.onClick(menu), menu, theme.themeColor);
  }
  render() {
    const { theme } = this.props
    let statusBar = {
        backgroundColor: theme.themeColor,
        barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
        title={'我的'}
        statusBar={statusBar}
        style={theme.styles.navBar}
    />;
    return (
      <View style={[globalStyle.root_container]}>
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
                      color: theme.themeColor,
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
                  color: theme.themeColor,
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
    //marginTop: 30,
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
const mapStateToProps = state => ({
  theme: state.theme.theme
})
const mapDispatchToProps = dispatch => ({
  onShowCustomThemeView(isShow) {
    dispatch(actions.onShowCustomThemeView(isShow))
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(MyPage)
