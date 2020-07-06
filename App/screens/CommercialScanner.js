import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

export default class CommercialScanner extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f9d79c" barStyle='dark-content' />
        <Header title='Cadastrar produto' logo={false} arrowBack={false}/>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:25,color:'#f6c267',marginTop:10,marginBottom:20,textAlign:'left'}}>Cadastrar código de barras?</Text>
          <TouchableOpacity
            style={{
              padding:20,
              borderColor:'white',
              borderWidth:1,
              borderRadius:10,
              backgroundColor:"#f6ba53"}}>
              <Text style={{fontSize:25,color:'white'}}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
})
