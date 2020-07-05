import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert, ScrollView, Image, TextInput} from 'react-native'
import {CheckBox} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class CommercialPreferences extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:null,
      familyEnvironment:'',
      withFood:'',
      chill:'',
      childrenSpace:'',
      withMusic:'',
      accessible:'',
      type:''
    }
  }

  componentDidMount(){
    this.getUserData();
  }

  toggle(item,value){
    let property = this.state[item];
    if(property==='')
      this.setState({[item]:value})
    else
      this.setState({[item]:''})
  }

  render() {
    let {
      user,
      familyEnvironment,
      withFood,
      chill,
      childrenSpace,
      withMusic,
      accessible,
      type
    } = this.state;
    if(user===null){
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
      <StatusBar backgroundColor="#FFFDF4" barStyle='dark-content' />
      <ScrollView>
      <Text style={{fontSize:30,color:'#f6ba53',marginTop:40,marginBottom:20,marginLeft:'11%'}}>Selecione aqui tudo sobre seu estabelecimento! :)</Text>

      <Text style={{fontSize:20,color:'#f6ba53',marginTop:40,marginBottom:20,marginLeft:'11%'}}>Escolha um</Text>

      <View style={{flexDirection:'column'}}>
      <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.setState({type:'Bar'})}>
        <CheckBox checked={type==='Bar'} style={{marginLeft:15,marginRight:20,borderRadius:20,borderColor:'#999'}} onPress={()=>this.setState({type:'Bar'})}/>
        <Text style={{fontSize:15,color:'#999'}}>Bar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.setState({type:'Restaurante'})}>
        <CheckBox checked={type==='Restaurante'} style={{marginLeft:15,marginRight:20,borderRadius:20,borderColor:'#999'}} onPress={()=>this.setState({type:'Restaurante'})}/>
        <Text style={{fontSize:15,color:'#999'}}>Restaurante</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.setState({type:'Supermercado'})}>
        <CheckBox checked={type==='Supermercado'} style={{marginLeft:15,marginRight:20,borderRadius:20,borderColor:'#999'}} onPress={()=>this.setState({type:'Supermercado'})}/>
        <Text style={{fontSize:15,color:'#999'}}>Supermercado</Text>
      </TouchableOpacity>
      </View>

      <Text style={{fontSize:20,color:'#f6ba53',marginTop:40,marginBottom:20,marginLeft:'11%'}}>Como as pessoas o descrevem?</Text>

      <View style={{flexDirection:'column'}}>
          <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('familyEnvironment','Ambiente mais “família”')}>
            <CheckBox checked={familyEnvironment!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('familyEnvironment','Ambiente mais “família”')}/>
            <Text style={{fontSize:15,color:'#999'}}>Ambiente mais “família”</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('withFood','Com comida')}>
            <CheckBox checked={withFood!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('withFood','Com comida')}/>
            <Text style={{fontSize:15,color:'#999'}}>Com comida</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('chill','Mais tranquilo')}>
            <CheckBox checked={chill!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('chill','Mais tranquilo')}/>
            <Text style={{fontSize:15,color:'#999'}}>Mais tranquilo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('childrenSpace','Com espaço para crianças')}>
            <CheckBox checked={childrenSpace!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('childrenSpace','Com espaço para crianças')}/>
            <Text style={{fontSize:15,color:'#999'}}>Com espaço para crianças</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('withMusic','Com música')}>
            <CheckBox checked={withMusic!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('withMusic','Com música')}/>
            <Text style={{fontSize:15,color:'#999'}}>Com música</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('accessible','Preços acessíveis')}>
            <CheckBox checked={accessible!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('accessible','Preços acessíveis')}/>
            <Text style={{fontSize:15,color:'#999'}}>Preços acessíveis</Text>
          </TouchableOpacity>

      </View>

      <View style={{flexDirection:'column',alignItems:'flex-end',width:'100%',marginTop:40}}>
        <TouchableOpacity
          style={{...styles.button,marginRight:20,flexDirection:'row',alignItems:'center'}} onPress={()=>this.savePreferences()}>
          <Text style={{fontSize:25,color:'white'}}>Salvar</Text>
        </TouchableOpacity>
      </View>

      </ScrollView>
      </View>
    )
  }

  getUserData() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({user:user})
      }
    });
  }

  savePreferences(){
    let {
      user,
      familyEnvironment,
      withFood,
      chill,
      childrenSpace,
      withMusic,
      accessible,
      type
    } = this.state;
    firebase
    .database()
    .ref('/commercial-accounts/'+user.uid)
    .update({
      preferences: [
        familyEnvironment,
        withFood,
        chill,
        childrenSpace,
        withMusic,
        accessible,
      ],
      type: type
    })
    .then(()=>this.props.navigation.navigate("CommercialMain"))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF4',
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
