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
          <TouchableOpacity
            style={{
              padding:20,
              borderColor:'white',
              borderWidth:1,
              borderRadius:10,
              backgroundColor:"#f6ba53"}}>
            <Text style={{fontSize:25,color:'white'}}>Cadastrar produto</Text>
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
