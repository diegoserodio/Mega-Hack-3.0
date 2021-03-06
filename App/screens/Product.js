import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert, ScrollView, Image, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class Product extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id:null,
      user:null,
      userData:null,
      prodInfo:null,
      collapsed: true,
      validationCode:null
    }
  }

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  componentDidMount(){
    let barcode = this.props.navigation.state.params.data;
    this.setState({id:barcode.substr(barcode.length - 6)});
    this.getProductData(barcode.substr(barcode.length - 6));
    this.getUserData();
  }

  render() {
    let { prodInfo, validationCode } = this.state;
    if(prodInfo===null){
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
        <TouchableOpacity
          style={{marginLeft:30,marginTop:30}}
          onPress={()=>this.props.navigation.goBack()}>
          <Icon name='arrow-left' size={30} color='#f6ba53' />
        </TouchableOpacity>
        <Text style={{textAlign:'center',fontSize:32,color:'#f6ba53'}}>{prodInfo.name}</Text>

        <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:30}}>
          <Image source={{uri:prodInfo.thumb}} style={{width:150,height:250}} />
          <View style={{flexDirection:'column',justifyContent:'flex-end'}}>
            {!prodInfo.allergen.includes("Cevada") ?
              <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image source={require('./../assets/gluten-free.png')} style={{width:70,height:70}} />
                  <Text style={{fontSize:15,color:'#999'}}>Não contém cevada</Text>
              </View>
              :
              <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image source={require('./../assets/gluten.png')} style={{width:70,height:70}} />
                  <Text style={{fontSize:15,color:'#999'}}>Contém cevada</Text>
              </View>}
            {!prodInfo.allergen.includes("Glúten") ?
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('./../assets/gluten-free.png')} style={{width:70,height:70}} />
                <Text style={{fontSize:15,color:'#999'}}>Não contém glúten</Text>
              </View>
              :
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('./../assets/gluten.png')} style={{width:70,height:70}} />
                <Text style={{fontSize:15,color:'#999'}}>Contém glúten</Text>
              </View>}
            {!prodInfo.allergen.includes("Lactose") ?
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('./../assets/milk-free.png')} style={{width:70,height:70}} />
                <Text style={{fontSize:15,color:'#999'}}>Não contém lactose</Text>
              </View>
              :
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('./../assets/milk.png')} style={{width:70,height:70}} />
                <Text style={{fontSize:15,color:'#999'}}>Contém lactose</Text>
              </View>}
          </View>
        </View>

        <TouchableOpacity onPress={this.toggleExpanded}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownText}>Ingredientes</Text>
            <Icon name='arrow-down' size={20} color='white' />
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.ingredients}>
            <Text style={{color:'#666'}}>{prodInfo.ingredients}</Text>
          </View>
        </Collapsible>

        <View style={{flexDirection:'column',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>this.rescuePoints(this.state.validationCode,prodInfo.validation)}>
          <Text style={{textAlign:'center',fontSize:32,color:'#f6ba53',marginTop:20}}>Ganhar +{prodInfo.points} pontos</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder='Digite o código de validação do produto'
          onChangeText={text => this.setState({validationCode:text})}
          value={validationCode}
        />
        </View>

        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>Harmonização</Text>
        </View>
        <View
          style={{
            padding: 20,
            backgroundColor: '#FFFDF4',
            marginLeft:60,
            marginRight:60}}>
          <Text style={{color:'#666'}}>{prodInfo.harmonization}</Text>
        </View>


      </ScrollView>
      </View>
    )
  }

  rescuePoints(validationCode, validation){
    let {id,prodInfo} = this.state;
    validation = validation.split(',');
    if(validation.includes(validationCode)){
      let index = validation.indexOf(validationCode);
      if (index > -1) {
        validation.splice(index, 1);
      }
      let newValidation='';
      validation.map(code => newValidation+=code+',');
      newValidation = newValidation.substring(0, newValidation.length - 1)
      firebase
      .database()
      .ref('/products/'+id)
      .update({
        validation: newValidation
      })
      .then(()=>{
        this.addPoints(prodInfo.points)
      })
    }else{
      alert("Código inválido, tente novamente")
    }
  }

  addPoints(value){
    let {user,userData} = this.state;
    firebase
    .database()
    .ref('/users/'+user.uid)
    .update({
      points: userData.points+value
    })
    .then(() => {
      alert(value+" pontos creditados! Agradecemos por comprar os produtos Ambev");
      this.props.navigation.navigate("Profile");
    })
  }

  getProductData(id) {
    firebase
    .database()
    .ref('products/')
    .on('value', snapshot => this.setState({prodInfo:snapshot.val()[id]}));
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF4',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#f5b03a',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding: 10,
    paddingLeft:20,
    paddingRight:20,
    marginTop:20,
    marginLeft:40,
    marginRight:40,
    borderRadius:20
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '500',
    color:'white',
  },
  ingredients: {
    padding: 20,
    backgroundColor: '#fdf5da',
    marginLeft:60,
    marginRight:60,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  },
  textInput: {
    height: 40,
    borderColor: 'grey',
    borderBottomWidth: 1,
    padding:10,
  },
})
