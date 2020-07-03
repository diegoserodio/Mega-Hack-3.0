import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, SafeAreaView, FlatList, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

export default class Explore extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
    }
  }

  render() {
    let { value } = this.state;

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
        <Header title='Explorar' logo={false} arrowBack={false}/>

        <View
          style={{
            flexDirection:'row',
            width:'100%',
            alignItems:'center',
            justifyContent:'space-between',
            padding:15}}>
        <TextInput
          style={styles.textInput}
          placeholder='Procure bares, restaurantes ou produtos'
          onChangeText={text => this.setState({value:text})}
          value={value}
        />
        <TouchableOpacity>
          <Icon name='search' size={30} color='#999' />
        </TouchableOpacity>
        </View>

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
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:10,
    padding:10,
    width:340
  }
})
