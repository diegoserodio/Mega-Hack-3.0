import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Profile from './Profile'
import Explore from './Explore'
import Scanner from './Scanner'

const mainNavigation = createBottomTabNavigator({
  Explore: {
        screen: Explore,
        navigationOptions: {
          tabBarLabel: '',
          title: '',
        },
      },
  Scanner: {
        screen: Scanner,
        navigationOptions: {
          tabBarLabel: '',
          title: '',
        },
      },
  Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: '',
          title: '',
        },
      },

},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Explore') {
          iconName = `home`;
        }
        else if (routeName === 'Profile') {
          iconName = `user`;
        }
        else if (routeName === 'Scanner') {
          iconName = `qrcode`;
          return (
            <View style={{
                width:80,
                height:80,
                borderRadius:40,
                backgroundColor:'#f5b03a',
                justifyContent:'center',
                alignItems:'center',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.30,
                shadowRadius: 4.65,
                elevation: 8}}>
              <Icon name={'barcode'} size={50} color={'white'}/>
            </View>
          )
        }
        return (
            <Icon style={{marginTop:20}} name={iconName} size={40} color={tintColor}/>
        );
      },
    }),
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#f5b03a',
      inactiveTintColor: 'white',
      style: {
        margin:0,
        padding:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:'#f7ca79',
        justifyContent:'center',
      },
      indicatorStyle: {
        height: 0
      },
      showIcon: true,
    },
    initialRouteName: 'Explore',
});

export default createAppContainer(mainNavigation);
