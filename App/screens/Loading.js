import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class Loading extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Main" : "SignUp")
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f9d79c" barStyle='dark-content' />
        <Header title='Indefinido' logo={false} arrowBack={false}/>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Text style={{textAlign:'center', fontSize:32}}>Quase lá...</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
})
