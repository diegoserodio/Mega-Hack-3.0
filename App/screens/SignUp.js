import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert, TextInput, ScrollView, Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      email:'',
      password:'',
      password_confirmation:'',
      imageUri:null,
      error: ''
    }
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  render() {
    let { name, email, imageUri, password, password_confirmation, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fadca9" barStyle='dark-content' />
      <ScrollView>
      <Text style={{fontSize:60,color:'#fff',marginTop:20,marginLeft:'10%'}}>Olá!</Text>
      <Text style={{fontSize:30,color:'#fff',marginTop:5,marginBottom:20,marginLeft:'11%'}}>Primeiro, vamos criar uma conta para você! :)</Text>
      <View style={{alignItems:'center'}}>

      <TouchableOpacity style={styles.photoPicker} onPress={()=>this.choosePicture()}>
        {this.state.imageUri===null ?
          <Text style={{fontSize:30,color:'#fff'}}>+</Text>
          :
          <Image source={{uri:this.state.imageUri}} style={{width:150,height:150,borderRadius:150}} />}
      </TouchableOpacity>

      <View style={styles.boxContainer}>
        <View style={{padding:20}}>
          <Text style={{fontSize:20,color:'#f6ba53'}}>Nome</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Digite seu nome'
            onChangeText={text => this.setState({name:text})}
            value={name}
          />
        </View>
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
            placeholder='Digite uma senha'
            secureTextEntry={true}
            onChangeText={text => this.setState({password:text})}
            value={password}
          />
        </View>
        <View style={{padding:20}}>
          <Text style={{fontSize:20,color:'#f6ba53'}}>Confirmar senha</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Digite novamente sua senha'
            secureTextEntry={true}
            onChangeText={text => this.setState({password_confirmation:text})}
            value={password_confirmation}
          />
        </View>

        <View style={{alignItems:'center',justifyContent:'center',marginBottom:20}}>
          <Text style={{fontSize:15, color:'red', textAlign:'center'}}>{error}</Text>
        </View>

        {this.renderRegisterButton()}

      </View>

          <Text style={{fontSize:15, color:'#fff',marginTop:20}}>Já possui uma conta?</Text>
          <View style={{flexDirection:'row',marginBottom:40}}>
          <Text style={{fontSize:15, color:'#fff'}}>Então faça </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("SignIn")}>
            <Text style={{fontSize:15, color:'#fff',textDecorationLine: 'underline'}}>login</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </View>
    )
  }

  async choosePicture(){
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.setState({imageUri:result.uri})
    }
  }

  async uploadImage(uri, imageName){
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("user-accounts/"+imageName);
    return ref.put(blob);
  }

  renderRegisterButton() {
    let { name, email, imageUri, password, password_confirmation, error } = this.state;
    let allAnswered = false;
    //Verifica se todos os campos foram respondidos
    if(name.length>0&&
       email.length>0&&
       imageUri!==null&&
       password.length>0&&
       password_confirmation.length>0){
         allAnswered = true;
    }

    if(allAnswered){
      return(
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity
            style={{...styles.button,backgroundColor:"#f6ba53"}} onPress={()=>this.register()}>
            <Text style={{fontSize:25,color:'white'}}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return(
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity
            style={{...styles.button,backgroundColor:"#ccc"}}>
            <Text style={{fontSize:25,color:'white'}}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  register() {
    let { name, email, imageUri, password, password_confirmation } = this.state;
    let register=false;
    //Verifica se as senhas são iguais
    if(password===password_confirmation){
      //Verifica se a senha tem no mínimo 8 caracteres
      if(password.length>=8)
       register = true;
      else
       this.setState({error:'A senha precisa ter no mínimo 8 caracteres'})
    }else
      this.setState({error:'As senhas não coincidem'})

    if(register){
      this.uploadImage(imageUri, Date.now())
        .then(() => {
          firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
            userCredentials.user.updateProfile({
              displayName:'costumer'
            });
            firebase
            .database()
            .ref('/users/'+userCredentials.user.uid)
            .set({
              displayName:name,
              profilePic:imageUri,
              email: email,
              points:0,
              preferences: {
                products: [],
                events: [],
                places: []
              }
            })
            .then(() => this.props.navigation.navigate("Preferences"))
          })
        })
        .catch(error => this.setState({error:error.message}))
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6ba53',
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
  photoPicker: {
    width:150,
    height:150,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ccc',
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius:125,
    marginBottom:40
  }
})
