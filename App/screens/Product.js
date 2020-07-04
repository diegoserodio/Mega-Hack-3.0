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
      prodInfo:null,
      collapsed: true,
      validationCode:null
    }
  }

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  componentDidMount(){
    this.getProductData('aaaaa');
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
      <ScrollView>
        <StatusBar backgroundColor="#FFFDF4" barStyle='dark-content' />
        <TouchableOpacity
          style={{marginLeft:30,marginTop:30}}
          onPress={()=>this.props.navigation.goBack()}>
          <Icon name='arrow-left' size={30} color='#f6ba53' />
        </TouchableOpacity>
        <Text style={{textAlign:'center',fontSize:32,color:'#f6ba53'}}>{prodInfo.name}</Text>

        <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:30}}>
          <Image source={{uri:prodInfo.thumb}} style={{width:150,height:250}} />
          <View style={{flexDirection:'column',justifyContent:'flex-end'}}>
            {!prodInfo.allergen.includes("cevada")&&
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('./../assets/gluten-free.png')} style={{width:70,height:70}} />
                <Text style={{fontSize:15,color:'#999'}}>Não contém cevada</Text>
            </View>}
            {!prodInfo.allergen.includes("gluten")&&
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={require('./../assets/gluten-free.png')} style={{width:70,height:70}} />
              <Text style={{fontSize:15,color:'#999'}}>Não contém glúten</Text>
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
        <Text style={{textAlign:'center',fontSize:32,color:'#f6ba53',marginTop:20}}>Ganhar +{prodInfo.points} pontos</Text>
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

  getProductData(id) {
    firebase.database().ref('products/').on('value', snapshot => this.setState({prodInfo:snapshot.val()[id]}));
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
