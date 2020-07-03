import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//IMPORT SCREENS
import Main from './screens/Main'
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
  },
  {
    initialRouteName: 'Main',
  }
);

export default createAppContainer(AppNavigator);
