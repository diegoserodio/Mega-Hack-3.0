import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert, TextInput, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class PerfilChoice extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      email:'',
      password:'',
      password_confirmation:'',
      error: ''
    }
  }

  render() {
    let { name, email, password, password_confirmation, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fadca9" barStyle='dark-content' />
      <ScrollView>
      <View style={{width:'100%',backgroundColor:'#f5b03a'}}>
      <Text style={{fontSize:60,color:'#fff',marginTop:20,marginLeft:'10%'}}>Olá!</Text>
      <Text style={{fontSize:25,color:'#fff',marginTop:5,marginBottom:20,marginLeft:'11%'}}>Qual seu perfil? :)</Text>
      <Text style={{fontSize:25,color:'#fff',marginTop:5,marginBottom:20,marginLeft:'11%',marginTop:60}}>Sou consumidor(a)!</Text>

      <View style={{flexDirection:'row',justifyContent:'center',marginBottom:60}}>
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity
            style={{...styles.button,backgroundColor:"#fefae0"}}
            onPress={()=>this.props.navigation.navigate("SignIn")}>
            <Text style={{fontSize:20,color:'#f5b03a'}}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize:20,color:'#fff',marginLeft:10,marginRight:10}}>ou</Text>
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity
            style={{...styles.button,backgroundColor:"#fefae0"}}
            onPress={()=>this.props.navigation.navigate("SignUp")}>
            <Text style={{fontSize:20,color:'#f5b03a'}}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      </View>

      <Text style={{fontSize:25,color:'#f5b03a',marginTop:5,marginBottom:20,marginLeft:'11%',marginTop:60}}>Tenho um estabelecimento!</Text>
      <View style={{flexDirection:'row',justifyContent:'center',marginTop:40}}>
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity
            style={{...styles.button,backgroundColor:"#f5b03a"}}
            onPress={()=>this.props.navigation.navigate("SignIn")}>
            <Text style={{fontSize:20,color:'#fefae0'}}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize:20,color:'#f5b03a',marginLeft:10,marginRight:10}}>ou</Text>
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity
            style={{...styles.button,backgroundColor:"#f5b03a"}}
            onPress={()=>this.props.navigation.navigate("CommercialSignUp")}>
            <Text style={{fontSize:20,color:'#fefae0'}}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fefae0',
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: 'grey',
    borderBottomWidth: 1,
    padding:10,
    width:340
  },
  boxContainer: {
    alignItems:'center',
    backgroundColor:'#f3e9db',
    borderRadius:10
  },
  button: {
    paddingLeft:40,
    paddingRight:40,
    paddingTop:5,
    paddingBottom:5,
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
