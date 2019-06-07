/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import NavigationUtils from '../navigators/NavigationUtils'
export default class WelcomePage extends Component{
  constructor(props) {
    super(props)
    console.disableYellowBox = true
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      NavigationUtils.resetToHomePage(this.props)
    },2000)
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }
  render() {
    return (
      <View style={styles.container}>
        <FadeInView>
          <Text style={styles.desc}>Welcome!</Text>
        </FadeInView>
      </View>
    );
  }
}

class FadeInView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnimation: new Animated.Value(0) 
    }
  }
  componentDidMount() {
    Animated.timing( this.state.fadeAnimation, {
      toValue: 1,
      easing: Easing.back(),
      duration: 1000
    }).start()
  }
  render() {
    const { fadeAnimation } = this.state
    return <Animated.View
              style={{...this.props.style}}
              opacity={fadeAnimation}
           >
            { this.props.children }
           </Animated.View>
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
