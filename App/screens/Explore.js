import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, SafeAreaView, FlatList, TextInput, ScrollView} from 'react-native'
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

    const CATEGORIES = [
      {
        id: '0',
        title: 'Destaques',
        body: ''
      },
      {
        id: '1',
        title: 'Bares',
        body: ''
      },
      {
        id: '2',
        title: 'Restaurantes',
        body: ''
      },
      {
        id: '3',
        title: 'Supermercados',
        body: ''
      },
      {
        id: '4',
        title: 'Eventos',
        body: ''
      },
    ];

    const DATA = [
      {
        id: '0',
        title: 'Restaurante do Zé',
        body: ''
      },
      {
        id: '1',
        title: 'Bar do Bola',
        body: ''
      },
      {
        id: '2',
        title: 'Pão de açúcar',
        body: ''
      },
    ];

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f9d79c" barStyle='dark-content' />
        <Header title='Explorar' logo={false} arrowBack={false}/>

        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <View style={styles.searchContainer}>
            <TextInput
              style={{height: 40,padding:10}}
              placeholder='Procure bares, restaurantes ou produtos'
              onChangeText={text => this.setState({value:text})}
              value={value}
            />
            <TouchableOpacity>
              <Icon name='search' size={30} color='#999' />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize:25,color:'#f6c267',marginTop:10,textAlign:'left'}}>Categorias</Text>
          <FlatList
            data={CATEGORIES}
            horizontal={true}
            renderItem={({ item }) => this.renderHCard(item)}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />

          <Text style={{fontSize:25,color:'#f6c267',textAlign:'left'}}>Recomendações</Text>
          <FlatList
            data={DATA}
            renderItem={({ item }) => this.renderVCard(item)}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    )
  }

  renderHCard(item){
    return (
      <TouchableOpacity style={{margin:20}}>
        <View style={styles.horizontalCardBody}>
          <Text style={{fontSize:20,color:'white'}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderVCard(item){
    return (
      <TouchableOpacity style={{margin:20}}>
        <View style={styles.verticalCardBody}>
          <Text style={{fontSize:20,color:'white'}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffdf4',
    flex: 1,
  },
  horizontalCardBody: {
    padding:50,
    borderRadius:50,
    backgroundColor:'#f7ca79',
  },
  verticalCardBody: {
    padding:10,
    borderRadius:50,
    backgroundColor:'#f7ca79'
  },
  searchContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#fffdf4',
    padding:10,
    marginLeft:20,
    marginRight:20,
    marginTop:20,
    borderColor:'black',
    borderWidth:1,
    borderRadius:50
  }
})
