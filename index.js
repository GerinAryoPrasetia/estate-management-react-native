/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {initializeApp} from 'firebase/app';
// import {getAnalytics} from 'firebase/analytics';

AppRegistry.registerComponent(appName, () => App);
