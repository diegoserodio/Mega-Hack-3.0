import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Home'
import Undefined1 from './Undefined1'
import Undefined2 from './Undefined2'
import Explore from './Explore'
import Scanner from './Scanner'

const mainNavigation = createMaterialTopTabNavigator({
  Home: {
        screen: Home,
        navigationOptions: {
          tabBarLabel: '',
          title: '',
        },
      },
  Undefined1: {
        screen: Undefined1,
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
  Explore: {
        screen: Explore,
        navigationOptions: {
          tabBarLabel: '',
          title: '',
        },
      },
  Undefined2: {
        screen: Undefined2,
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
        if (routeName === 'Home') {
          iconName = `home`;
        }
        else if (routeName === 'Undefined1') {
          iconName = `interrogation`;
        }
        else if (routeName === 'Scanner') {
          iconName = `qrcode`;
          return (
            <View style={{width:60,height:60,borderRadius:30,backgroundColor:'#ff6666',justifyContent:'center',alignItems:'center'}}>
              <Icon name={'qrcode'} size={46} color={'white'}/>
            </View>
          )
        }
        else if (routeName === 'Explore') {
          iconName = `search`;
        }
        else if (routeName === 'Undefined2') {
          iconName = `interrogation`;
        }
        return (
          <View style={{width:60,height:60,justifyContent:'center',alignItems:'center'}}>
            <Icon name={iconName} size={30} color={tintColor}/>
          </View>
        );
      },
    }),
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#FF6666',
      inactiveTintColor: 'gray',
      style: {
        margin:0,
        padding:0,
        backgroundColor:'#fff',
        height: 75,
        justifyContent:'center',
      },
      indicatorStyle: {
        height: 0
      },
      showIcon: true,
    },
    initialRouteName: 'Home',
});

export default createAppContainer(mainNavigation);
