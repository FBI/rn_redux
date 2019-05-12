/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Page2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.desc}>Welcome to Page2</Text>
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
  }
});
