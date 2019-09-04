/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
if (typeof GLOBAL !== 'undefined') {
    GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
    GLOBAL.Blob = GLOBAL.originalBlob || GLOBAL.Blob;
    GLOBAL.FileReader = GLOBAL.originalFileReader || GLOBAL.FileReader;
}

AppRegistry.registerComponent(appName, () => App);

