import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert, Image, ScrollView, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class CommercialProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      userData:null,
      discountCode:null
    }
  }

  componentDidMount(){
    this.getUserData();
  }

  render() {
    let {userData,discountCode} = this.state;
    if(userData===null){
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#FFFDF4" barStyle='dark-content' />
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{textAlign:'center', fontSize:32}}>Carregando...</Text>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f9d79c" barStyle='dark-content' />
        <Header title='Perfil' logo={false} arrowBack={false}
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
          <ScrollView style={{flex:1}}>

            <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
            <View style={styles.profileHeader}>
              <Image source={{uri:userData.profilePic}} style={{width:150,height:150,borderRadius:150,margin:20}}/>
              <Text style={{fontSize:25,color:'#fff',textAlign:'center'}}>{userData.displayName}</Text>
              <Text style={{fontSize:15,color:'#fff',textAlign:'center',marginBottom:10}}>{userData.address}</Text>

              {this.renderFeedback(userData.feedback,userData.usersWithFeedback)}

              <Text style={{fontSize:25,color:'#fff',textAlign:'center',marginTop:40,marginLeft:40,marginRight:40}}>Tem um cliente com desconto do app?</Text>
              <TextInput
                style={styles.textInput}
                placeholder='Digite o código de ativação do desconto'
                placeholderTextColor="#fff"
                onChangeText={text => this.setState({discountCode:text})}
                value={discountCode}
              />
              <View style={{alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity
                  style={{...styles.button,backgroundColor:"#f7ca79",marginTop:20}}
                  onPress={()=>this.validateCupon(discountCode)}>
                  <Text style={{fontSize:25,color:'white'}}>Validar</Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>

            {this.renderPreferences(userData.preferences)}

            <View style={{flexDirection:'column',alignItems:'center',width:'100%',marginTop:10}}>
              <Text style={{fontSize:20,color:'gray'}}>Quer editar?</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>this.props.navigation.navigate("CommercialPreferences")}>
                <Text style={{fontSize:25,color:'white'}}>Editar</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection:'column',alignItems:'center',width:'100%',marginTop:60}}>
              <TouchableOpacity
                style={styles.button}>
                <Text style={{fontSize:25,color:'white'}}>Divulgar um evento</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection:'column',alignItems:'center',width:'100%',marginBottom:40}}>
              <TouchableOpacity
                style={styles.button} onPress={()=>this.signOut()}>
                <Text style={{fontSize:25,color:'white'}}>Sair</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      </View>
    )
  }

  validateCupon(discountCode){
    let {user,userData} = this.state;
    if(discountCode===null)discountCode=0;
    let cuponIndex = discountCode.slice(0, 5);
    firebase.database().ref('cupons/'+cuponIndex).once('value', snapshot => {
      if(snapshot.val()===null)
        alert("Cupom inválido")
      else{
        let valid = false;
        let currCupons = snapshot.val().cupons;
        currCupons.map(id => {
          if(id==discountCode.slice(5)){
            valid=true;
            let index = currCupons.indexOf(id);
            if (index > -1) {
              currCupons.splice(index, 1);
            }
          }
        })
        if(valid){
          firebase
          .database()
          .ref('/cupons/'+cuponIndex)
          .set({
            cupons: currCupons,
            displayName: snapshot.val().displayName
          })
          alert(`Cupom de R$5,00 para ${snapshot.val().displayName} validado com sucesso!`);
        }
        else
          alert("Cupom inválido")
      }
    });
  }

  renderFeedback(feedback, usersWithFeedback){
    let score = 0, result = [];
    if(usersWithFeedback!==0){
      score = Math.floor(feedback/usersWithFeedback)
    }
    for(let i = 0; i < score; i++){
      result.push(<Icon name='star' size={50} color='white' style={{marginRight:10}}/>)
    }
    for(let i = score; i < 3; i++){
      result.push(<Icon name='star' size={50} color='#f7ca79' style={{marginRight:10}}/>)
    }
    return (
      <View style={{flexDirection:'row'}}>
        {result}
      </View>
    )
  }

  renderPreferences(preferences){
    let result = []
    preferences.map((p,index) => {
      p!=='' ?
      result.push(<Text key={index} style={{fontSize:15,color:'#999',marginTop:5,marginLeft:25}}>{p}</Text>)
      :
      null
    })

    return (
      <View style={{flexDirection:'row',justifyContent:'center'}}>
      <View style={{alignSelf: 'flex-start'}}>
      <Text style={{fontSize:25,color:'#f6c267',marginTop:20,textAlign:'center'}}>Sobre seu estabelecimento</Text>
        {result}
      </View>
      </View>
    );
  }

  getUserData() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        firebase.database().ref('commercial-accounts/'+user.uid).on('value', snapshot => {
          this.setState({user:user, userData:snapshot.val()});
        });
      }
    });
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
  profileHeader: {
    flexDirection:'column',
    alignItems:'center',
    width:'100%',
    backgroundColor:'#f5b03a',
    borderBottomLeftRadius:80,
    borderBottomRightRadius:80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8
  },
  textInput: {
    height: 40,
    borderColor: 'grey',
    borderBottomWidth: 1,
    padding:10,
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
