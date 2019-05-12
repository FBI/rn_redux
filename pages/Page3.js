/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class Page3 extends Component {
  render() {
    const { navigation } = this.props
    const { state, setParams } = navigation
    const { params } = state
    let showText = params && params.mode === 'edit' ? '正在编辑' : '编辑完成'
    return (
      <View style={styles.container}>
        <Text style={styles.desc}>Welcome to Page3</Text>
        <Text style={styles.desc}>{showText}</Text>
        <TextInput
          style={styles.inp} 
          onChangeText={text => {
            setParams({ title: text })
          }}
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
    fontSize: 40
  },
  inp: {
    width: 120,
    height: 40,
    borderWidth: 1,
    marginTop: 10,
    borderColor: 'black'
  }
});
