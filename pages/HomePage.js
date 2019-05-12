/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';

export default class HomePage extends Component{
  static navigationOptions = {
    title: 'Home',
    headerBackTitle: '滚回去吧' // 定义返回此页面的返回按钮文案， 有长度限制
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.desc}>Welcome to HomePage</Text>
        <Button
          title={'To page1'}
          onPress={() => navigation.navigate('Page1', { name: '动态参数'})}
        />
        <Button
          title={'To page2'}
          onPress={() => navigation.navigate('Page2')} 
        />
        <Button
          title={'To page3'}
          onPress={() => navigation.navigate('Page3', {title: 'Charis-W'})}
        />
        <Button
          title={'To topNavigator'}
          onPress={() => navigation.navigate('TopNavigator')}
        />
        <Button
          title={'To bottomNavigator'}
          onPress={() => navigation.navigate('BottomNavigator')}
        />
        <Button 
          title={'to drawerNavigator'}
          onPress={() => navigation.navigate('drawerNavigator')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  desc: {
    color: 'brown',
    fontSize: 20
  }
});
