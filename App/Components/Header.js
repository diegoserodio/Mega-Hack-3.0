import React,{Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from 'expo-constants';

export default class Header extends React.Component {
  render() {
    return (
      <View style={{flexDirection:'row'}}>
        <View style={styles.headerContainer}>
          {this.props.arrowBack &&
          <TouchableOpacity style={{marginLeft:20}} onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-left' size={30} color='white' />
          </TouchableOpacity>}
          {this.props.logo &&
          <Text style={{fontSize:20, fontWeight:'600', color:'white', margin:10}}>Nome do App</Text>}
          {!this.props.logo && <Text style={{fontSize:20, fontWeight:'600', color:'white', margin:10}}>{this.props.title}</Text>}
          {this.props.rheader}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width:'100%',
    height:60,
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: '#f5b03a',
    flexDirection: 'row',
  },
  back: {
    justifyContent: 'center',
    alignItems: 'center',
    width:80,
    height:60,
    margin:10
  },
})
