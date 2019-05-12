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
if (typeof GLOBAL !== 'undefined') {
    // Route network requests through Chrome's native XMLHttpRequest
    GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
    
    // Use native Blob for native XMLHttpRequest set above
    GLOBAL.Blob = GLOBAL.originalBlob || GLOBAL.Blob;
    
    // Use native FileReader to read native Blob set above
    GLOBAL.FileReader = GLOBAL.originalFileReader || GLOBAL.FileReader;
}
AppRegistry.registerComponent(appName, () => App);

