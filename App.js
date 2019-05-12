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
import { RootNavigator } from './web/navigators/AppNavigators'
import store from './web/store'
const RootNavigatorContainer = createAppContainer(RootNavigator)
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigatorContainer />
      </Provider>
    );
  }
}
