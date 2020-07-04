import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

export default class Settings extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f9d79c" barStyle='dark-content' />
        <Header title='Configurações' logo={false} arrowBack={true} navigation={this.props.navigation}/>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Text style={{textAlign:'center', fontSize:32}}>Settings page</Text>
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
