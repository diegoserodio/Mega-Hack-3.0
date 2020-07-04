import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert, ScrollView, Image, TextInput} from 'react-native'
import {CheckBox} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class Preferences extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:null,
      noGluten: '',
      noLactose: '',
      noAlcoohol: '',
      vegetarianvegan: '',
      liveMusic: '',
      withFood: '',
      chill: '',
      accessible: '',
      withMusic: '',
      childrenSpace: '',
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
      noGluten,
      noLactose,
      noAlcoohol,
      vegetarianvegan,
      liveMusic,
      withFood,
      chill,
      accessible,
      withMusic,
      childrenSpace,
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
      <Text style={{fontSize:60,color:'#f6ba53',marginTop:20,marginLeft:'10%'}}>Olá!</Text>
      <Text style={{fontSize:30,color:'#f6ba53',marginTop:5,marginBottom:20,marginLeft:'11%'}}>Escolha suas preferências para te conhecermos melhor ;)</Text>

      <View style={{flexDirection:'column'}}>
        <Text style={{fontSize:25,color:'#f6c267',marginTop:15,marginLeft:15}}>Produtos</Text>
          <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('noGluten','Sem glúten')}>
            <CheckBox checked={noGluten!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('noGluten','Sem glúten')}/>
            <Text style={{fontSize:15,color:'#999'}}>Sem glúten</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('noLactose','Sem lactose')}>
            <CheckBox checked={noLactose!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('noLactose','Sem lactose')}/>
            <Text style={{fontSize:15,color:'#999'}}>Sem lactose</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('noAlcoohol','Sem álcool')}>
            <CheckBox checked={noAlcoohol!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('noAlcoohol','Sem álcool')}/>
            <Text style={{fontSize:15,color:'#999'}}>Sem álcool</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('vegetarianvegan','Vegetariano/Vegano')}>
            <CheckBox checked={vegetarianvegan!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('vegetarianvegan','Vegetariano/Vegano')}/>
            <Text style={{fontSize:15,color:'#999'}}>Vegetariano/Vegano</Text>
          </TouchableOpacity>

        <Text style={{fontSize:25,color:'#f6c267',marginTop:15,marginLeft:15}}>Eventos</Text>
        <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('liveMusic','Com música ao vivo')}>
          <CheckBox checked={liveMusic!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('liveMusic','Com música ao vivo')}/>
          <Text style={{fontSize:15,color:'#999'}}>Com música ao vivo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('withFood','Com comida')}>
          <CheckBox checked={withFood!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('withFood','Com comida')}/>
          <Text style={{fontSize:15,color:'#999'}}>Com comida</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('chill','Tranquilos')}>
          <CheckBox checked={chill!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('chill','Tranquilos')}/>
          <Text style={{fontSize:15,color:'#999'}}>Tranquilos</Text>
        </TouchableOpacity>

        <Text style={{fontSize:25,color:'#f6c267',marginTop:15,marginLeft:15}}>Estabelecimentos</Text>
        <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('accessible','Acessíveis')}>
          <CheckBox checked={accessible!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('accessible','Acessíveis')}/>
          <Text style={{fontSize:15,color:'#999'}}>Acessíveis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('withMusic','Com música')}>
          <CheckBox checked={withMusic!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('withMusic','Com música')}/>
          <Text style={{fontSize:15,color:'#999'}}>Com música</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={()=>this.toggle('childrenSpace','Com espaço para crianças')}>
          <CheckBox checked={childrenSpace!==''} style={{marginLeft:15,marginRight:20,borderColor:'#999'}} onPress={()=>this.toggle('childrenSpace','Com espaço para crianças')}/>
          <Text style={{fontSize:15,color:'#999'}}>Com espaço para crianças</Text>
        </TouchableOpacity>

      </View>

      <View style={{flexDirection:'column',alignItems:'flex-end',width:'100%',marginTop:40}}>
        <TouchableOpacity
          style={{...styles.button,marginRight:20,flexDirection:'row',alignItems:'center'}} onPress={()=>this.savePreferences()}>
          <Text style={{fontSize:25,color:'white'}}>Salvar</Text>
          <Icon name='arrow-right' size={20} color='white' style={{marginLeft:30}}/>
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
      noGluten,
      noLactose,
      noAlcoohol,
      vegetarianvegan,
      liveMusic,
      withFood,
      chill,
      accessible,
      withMusic,
      childrenSpace,
    } = this.state;
    firebase
    .database()
    .ref('/users/'+user.uid)
    .update({
      preferences: {
        products: [noGluten,noLactose,noAlcoohol,vegetarianvegan],
        events: [liveMusic,withFood,chill],
        places: [accessible,withMusic,childrenSpace]
      }
    })
    .then(()=>this.props.navigation.navigate("Main"))
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
