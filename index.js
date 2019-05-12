/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
//import EntryNavigator from './web/navigators/AppNavigators'
import {name as appName} from './app.json';
//import { createAppContainer } from 'react-navigation'
//import { AppStackNavigator, AppSwitchNavigator } from './navigator-example/AppNavigators'
//const AppNavigatorContainer = createAppContainer(EntryNavigator)
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
AppRegistry.registerComponent(appName, () => App);

