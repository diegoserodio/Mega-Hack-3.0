import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class Settings extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f9d79c" barStyle='dark-content' />
        <Header title='Configurações' logo={false} arrowBack={true} navigation={this.props.navigation}/>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <View style={{flexDirection:'column',alignItems:'center',width:'100%',marginBottom:40}}>
            <TouchableOpacity
              style={styles.button} onPress={()=>this.signOut()}>
              <Text style={{fontSize:25,color:'white'}}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  signOut() {
    firebase.auth()
    .signOut()
    .then(() => {
      this.props.navigation.navigate("SignIn");
    })
    .catch(() => {
      alert("Um erro inesperado ocorreu");
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  button: {
    paddingLeft:40,
    paddingRight:40,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"#f6ba53",
    borderRadius:20,
    marginBottom:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8
  },
})
