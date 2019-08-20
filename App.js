/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { MainNavigator } from './web/navigators/AppNavigators'
import store from './web/store'
//YellowBox.ignoreWarnings(['ViewPagerAndroid','PagerAndroid']);
const RootNavigatorContainer = createAppContainer(MainNavigator)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigatorContainer />
      </Provider>
    );
  }
}

