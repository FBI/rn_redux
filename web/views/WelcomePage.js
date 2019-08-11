/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing, ImageBackground } from 'react-native';
import navigationUtil from '../navigators/NavigationUtils'
import SplashScreen from 'react-native-splash-screen'

export default class WelcomePage extends Component{
  constructor(props) {
    super(props)
    console.disableYellowBox = true
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      SplashScreen.hide();
      navigationUtil.resetToHomePage(this.props)
    },200)
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }
  render() {
    return (
      <View >
        <FadeInView>
          <Text style={styles.desc}>Welcome!</Text>
        </FadeInView>
      </View>
      // <ImageBackground style={{flex:1}} source={require('../images/loading.gif')}>
      // <View >
      //   <FadeInView>
      //     <Text style={styles.desc}>Welcome!</Text>
      //   </FadeInView>
      // </View>
      // </ImageBackground>
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
      duration: 800
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
    //backgroundColor: '#F5FCFF',
  },
  desc: {
    color: 'brown',
    fontSize: 20
  }
});
