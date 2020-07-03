import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDXK8iTakKWd4vsGRmtP8Vz--kt2z3bLdw",
  authDomain: "mega-hack-30.firebaseapp.com",
  databaseURL: "https://mega-hack-30.firebaseio.com",
  projectId: "mega-hack-30",
  storageBucket: "mega-hack-30.appspot.com",
  messagingSenderId: "621415254697",
  appId: "1:621415254697:web:0a790564edc12f446f77b8",
  measurementId: "G-P8JK574EET"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//IMPORT SCREENS
import Main from './screens/Main'
import Loading from './screens/Loading'
import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import Cam from './screens/Cam'
import Profile from './screens/Profile'
import Settings from './screens/Settings'

const AppNavigator = createStackNavigator(
  {
    Main: {
        screen: Main,
        navigationOptions: {
          headerShown: false,
        },
      },
    Cam: {
        screen: Cam,
        navigationOptions: {
          headerShown: false,
        },
      },
    Profile: {
        screen: Profile,
        navigationOptions: {
          headerShown: false,
        },
      },
    Settings: {
        screen: Settings,
        navigationOptions: {
          headerShown: false,
        },
      },
    Loading: {
        screen: Loading,
        navigationOptions: {
          headerShown: false,
        },
      },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
          headerShown: false,
        },
      },
    SignIn: {
        screen: SignIn,
        navigationOptions: {
          headerShown: false,
        },
      },
  },
  {
    initialRouteName: 'Loading',
  }
);

export default createAppContainer(AppNavigator);
