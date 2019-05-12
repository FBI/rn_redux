/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Page4 extends Component {
  render() {
    const { navigation } = this.props
    const { openDrawer, closeDrawer, toggleDrawer } = navigation
    return (
      <View style={styles.container}>
        <Text style={styles.desc}>Welcome to Page4</Text>
        <Button
          title={'openDrawer'}
          onPress={() => openDrawer()}
        />
        <Button
          title={'closeDrawer'}
          onPress={() => closeDrawer()}
        />
        <Button
          title={'toggleDrawer'}
          onPress={() => toggleDrawer()}
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
  }
});
