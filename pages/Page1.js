/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class Page1 extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Button
          title={'Go back'}
          onPress={() => navigation.goBack()}
        />
        <Button
          title={'To Page4'}
          onPress={() => navigation.navigate('Page4')}
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
  }
});
