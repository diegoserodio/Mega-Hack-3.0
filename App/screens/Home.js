import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, SafeAreaView, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class Home extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const DATA = [
      {
        id: '0',
        title: '',
        body: ''
      },
      {
        id: '1',
        title: '',
        body: ''
      },
      {
        id: '2',
        title: '',
        body: ''
      },
    ];

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FF6666" barStyle='light-content' />
        <Header title='Home' logo={true} arrowBack={false}
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
            onPress={()=>this.props.navigation.navigate("Profile")}>
            <Icon name='user' size={30} color='white' />
          </TouchableOpacity>}/>

        <SafeAreaView style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => this.renderCard()}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    )
  }

  renderCard(){
    return (
      <View style={{flex:1}}>
        <View style={styles.cardTitle} />
        <View style={styles.cardBody} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  cardTitle: {
    width:'40%',
    height:20,
    backgroundColor:'#ccc',
    borderRadius:10,
    marginBottom:10,
    marginTop:30
  },
  cardBody: {
    width:350,
    height:200,
    borderRadius:10,
    backgroundColor:'#ccc'
  }
})
