import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert, Image, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      userData:null
    }
  }

  componentDidMount(){
    this.getUserData();
  }

  render() {
    let {userData} = this.state;
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
              <Text style={{fontSize:15,color:'#fff',textAlign:'center',marginBottom:10}}>{userData.email}</Text>
            </View>
            </View>

            <Text style={{fontSize:25,color:'#f6c267',marginTop:20,textAlign:'center'}}>Você tem</Text>
            <View style={{flexDirection:'column',alignItems:'center',width:'100%'}}>
              <Text style={{fontSize:35,color:'#999'}}>{userData.points} pontos</Text>
            </View>
            <View style={{alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity
                style={{...styles.button,backgroundColor:"#f7ca79",marginTop:20}}
                onPress={()=>this.getCupons()}>
                <Text style={{fontSize:25,color:'white'}}>Resgatar</Text>
              </TouchableOpacity>
            </View>

            {this.renderPreferences(userData.preferences.products,userData.preferences.events,userData.preferences.places)}

            <View style={{flexDirection:'column',alignItems:'center',width:'100%',marginTop:10}}>
              <Text style={{fontSize:20,color:'gray'}}>Quer editar?</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>this.props.navigation.navigate("Preferences")}>
                <Text style={{fontSize:25,color:'white'}}>Editar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      </View>
    )
  }

  getCupons(){
    let {user,userData} = this.state;
    let cuponIndex = user.uid.substr(-5);
    firebase.database().ref('cupons/'+cuponIndex).once('value', snapshot => {
      if(snapshot.val()===null)
        this.generateCupons(cuponIndex, null);
      else
        this.generateCupons(cuponIndex, snapshot.val().cupons);
    });
  }

  generateCupons(cuponIndex, existingCupons=[]){
    let {user,userData} = this.state;
    if(!existingCupons)existingCupons=[];
    let currPoints = userData.points;
    let cuponsQtn = Math.floor(currPoints/100);
    let cuponsIds = existingCupons;
    for(let i = 0; i < cuponsQtn; i++){
      cuponsIds.push(Math.floor(Math.random() * 1000) + 1);
    }

    let message = '';
    cuponsIds.map((ids,index) => message+=`Cupom ${index+1}:${cuponIndex}${ids}\n`)
    alert(message)
    this.subPoints(cuponsQtn*100);
    firebase
    .database()
    .ref('/cupons/'+cuponIndex)
    .set({
      cupons: cuponsIds,
      displayName: userData.displayName
    })
  }

  subPoints(value){
    let {user,userData} = this.state;
    let currPoints = userData.points;
    currPoints -= value;
    if(currPoints<=0)currPoints=0;
    firebase
    .database()
    .ref('/users/'+user.uid)
    .update({
      points: currPoints
    })
  }

  renderPreferences(products,events,places){
    let prodList = [];
    let eveList = [];
    let plaList = [];
    products.map(prod => {
      prod!=='' ?
      prodList.push(<Text style={{fontSize:15,color:'#999',marginTop:5,marginLeft:25}}>{prod}</Text>)
      :
      null
    })
    events.map(e => {
      e!=='' ?
      eveList.push(<Text style={{fontSize:15,color:'#999',marginTop:5,marginLeft:25}}>{e}</Text>)
      :
      null
    })
    places.map(place => {
      place!=='' ?
      plaList.push(<Text style={{fontSize:15,color:'#999',marginTop:5,marginLeft:25}}>{place}</Text>)
      :
      null
    })

    return (
      <View style={{flexDirection:'row',justifyContent:'center'}}>
      <View style={{alignSelf: 'flex-start'}}>
      <Text style={{fontSize:25,color:'#f6c267',marginTop:20,textAlign:'center'}}>Você gosta de</Text>
        <Text style={{fontSize:20,color:'#f6c267',marginTop:15,marginLeft:15}}>Produtos...</Text>
        {prodList}
        <Text style={{fontSize:20,color:'#f6c267',marginTop:15,marginLeft:15}}>Eventos...</Text>
        {eveList}
        <Text style={{fontSize:20,color:'#f6c267',marginTop:15,marginLeft:15}}>Estabelecimentos...</Text>
        {plaList}
      </View>
      </View>
    );
  }

  getUserData() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        firebase.database().ref('users/'+user.uid).on('value', snapshot => {
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
  button: {
    paddingLeft:40,
    paddingRight:40,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"#f6ba53",
    borderRadius:20,
    marginBottom:40,
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
