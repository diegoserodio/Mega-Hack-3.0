import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class Profile extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FF6666" barStyle='light-content' />
        <Header title='Perfil' logo={false} arrowBack={true} navigation={this.props.navigation}
        rheader={
          <TouchableOpacity
            style={{
              width:40,
              height:40,
              marginRight:20,
              borderRadius:20,
              borderWidth:1,
              borderColor:'white',
              backgroundColor:'ff6666',
              alignItems:'center',
              justifyContent:'center'}}
            onPress={()=>this.props.navigation.navigate("Settings")}>
            <Icon name='gear' size={30} color='white' />
          </TouchableOpacity>}/>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity
              style={{
                padding:20,
                borderColor:'white',
                borderWidth:1,
                borderRadius:10,
                backgroundColor:"#ff6666"}} onPress={()=>this.signOut()}>
              <Text style={{fontSize:25,color:'white'}}>Sair</Text>
            </TouchableOpacity>
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
})
