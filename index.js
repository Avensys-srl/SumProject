/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NavigationUpload from './NavigationUpload';
import Main from './Main';

AppRegistry.registerComponent(appName, () => NavigationUpload);
// AppRegistry.registerComponent(appName, () => Main);
