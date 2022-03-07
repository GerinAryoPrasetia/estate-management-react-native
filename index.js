/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import Firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {initializeApp} from 'firebase/app';
// import {getAnalytics} from 'firebase/analytics';

AppRegistry.registerComponent(appName, () => App);

console.log('index');
// Firebase.initializeApp();
const firebaseConfig = {
  apiKey: 'AIzaSyAlANStuGEUlu43d279m0LWThBH8d1dIPM',
  authDomain: 'estate-341821.firebaseapp.com',
  projectId: 'estate-341821',
  storageBucket: 'estate-341821.appspot.com',
  messagingSenderId: '994072585248',
  appId: '1:994072585248:web:94b6715702a151df394845',
  measurementId: 'G-3FP24RP9L0',
};

// Initialize Firebase
if (!Firebase.app.length) {
  Firebase.initializeApp(firebaseConfig);
} else {
  Firebase.app();
}
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
    const storeToken = async dToken => {
      try {
        await AsyncStorage.setItem('@device_token', dToken);
        console.log('token store' + dToken);
      } catch (e) {
        console.log(e);
      }
    };
    storeToken(token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
