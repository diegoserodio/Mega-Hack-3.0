import React from 'react'
import {View, StyleSheet, StatusBar, Text, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      error: ''
    }
  }

  render() {
    let { email, password, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fadca9" barStyle='dark-content' />
      <ScrollView>
      <Text style={{fontSize:60,color:'#fff',marginTop:20,marginLeft:'10%'}}>Olá!</Text>
      <Text style={{fontSize:30,color:'#fff',marginTop:5,marginBottom:20,marginLeft:'11%'}}>Bom te ver novamente! :)</Text>
      <View style={{alignItems:'center'}}>
      <View style={styles.boxContainer}>
        <View style={{padding:20}}>
          <Text style={{fontSize:20,color:'#f6ba53'}}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Digite seu email'
            onChangeText={text => this.setState({email:text})}
            value={email}
          />
        </View>
        <View style={{padding:20}}>
          <Text style={{fontSize:20,color:'#f6ba53'}}>Senha</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Digite sua senha'
            secureTextEntry={true}
            onChangeText={text => this.setState({password:text})}
            value={password}
          />
        </View>

        <View style={{alignItems:'center',justifyContent:'center',marginLeft:'10%'}}>
          <Text style={{fontSize:15, color:'red'}}>{error}</Text>
        </View>

        {this.renderLoginButton()}

      </View>

        <Text style={{fontSize:15, color:'#fff',marginTop:20}}>Ou</Text>
        <TouchableOpacity
          style={{
            alignItems:'center',
            justifyContent:'center',
            marginTop:20}}
          onPress={() => this.props.navigation.navigate("SignUp")}>
          <Text style={{fontSize:15, color:'#fff'}}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </View>
    )
  }

  renderLoginButton() {
    let { email, password } = this.state;
    let allAnswered = false;
    //Verifica se todos os campos foram respondidos
    if(email.length>0&&password.length>0)
      allAnswered = true;

    if(allAnswered){
      return(
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity
            style={{...styles.button,backgroundColor:"#f6ba53"}} onPress={()=>this.login()}>
            <Text style={{fontSize:25,color:'white'}}>Entrar</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return(
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity
            style={{...styles.button,backgroundColor:"#ccc"}}>
            <Text style={{fontSize:25,color:'white'}}>Entrar</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  login() {
    let { email, password } = this.state;
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => this.props.navigation.navigate("Main"))
    .catch(error => this.setState({error:error.message}))
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6ba53',
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
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
