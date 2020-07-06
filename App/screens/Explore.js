import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, SafeAreaView, FlatList, TextInput, ScrollView, Image, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class Explore extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
      keys:null,
      accounts:null,
      allAccounts:null,
      filter:'Para você'
    }
  }

  componentDidMount(){
    this.getAccountsData(this.state.filter)
  }

  render() {
    let { value, accounts } = this.state;

    if(accounts===null){
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
        <StatusBar backgroundColor="#f9d79c" barStyle='dark-content' />
        <Header title='Explorar' logo={false} arrowBack={false}/>

        <View style={{flex:1, alignItems:'center'}}>
          <View style={styles.searchContainer}>
            <TextInput
              style={{height: 40,padding:10}}
              placeholder='Procure bares, restaurantes ou produtos'
              onChangeText={text => this.setState({value:text})}
              value={value}
            />
            <TouchableOpacity onPress={()=>this.filterResultsBySearch()}>
              <Icon name='search' size={30} color='#999' />
            </TouchableOpacity>
          </View>

          {accounts.length>0 ?
            <FlatList
              data={accounts}
              renderItem={({ item, index }) => this.renderVCard(item,index)}
              keyExtractor={item => item.id}
              ListHeaderComponent={()=>this.renderHeaderList()}
              showsVerticalScrollIndicator={false}
              style={{height:'70%',width:'100%'}}
            />
            :
            <View>
              <Text style={{fontSize:25,color:'#f6c267',marginTop:10,textAlign:'left',marginLeft:'5%'}}>Categorias</Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {this.renderHCards()}
              </ScrollView>
              <View style={{height:'70%',width:'100%',padding:40}}>
              <Text style={{fontSize:25,color:'#f6c267',textAlign:'left',marginLeft:'5%'}}>Resultados - {this.state.filter}</Text>
              <Text style={{fontSize:25,color:'#999',textAlign:'center'}}>Não foi encontrado nenhum resultado para a pesquisa :c</Text>
              </View>
            </View>
            }
        </View>
      </View>
    )
  }

  filterResultsBySearch(){
    let { value, accounts } = this.state;
    accounts = accounts.filter(account => {
      if(account.eventTitle!==undefined) return account.eventTitle.includes(value)
      else if (account.displayName!==undefined) return account.displayName.includes(value)
    })
    this.setState({accounts:accounts})
  }

  renderHeaderList(){
    return (
      <View>
      <Text style={{fontSize:25,color:'#f6c267',marginTop:10,textAlign:'left',marginLeft:'5%'}}>Categorias</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {this.renderHCards()}
      </ScrollView>
      <Text style={{fontSize:25,color:'#f6c267',textAlign:'left',marginLeft:'5%'}}>Resultados - {this.state.filter}</Text>
      </View>
    );
  }

  getAccountsData(filter) {
    firebase
    .database()
    .ref('commercial-accounts/')
    .on('value', snapshot => {
      let accounts = Object.values(snapshot.val()).filter(account => {
        if(filter==='Para você'){
          return true
        }else if(filter==='Eventos'){
          return account.type=='event'
        }
        else if(filter==='Bares'){
          return account.type=='Bar'
        }
        else if(filter==='Supermercados'){
          return account.type=='Supermercado'
        }
        else if(filter==='Restaurantes'){
          return account.type=='Restaurante'
        }
      })
      let results = accounts.filter(res => res.boostPlan!==undefined).concat(accounts.filter(res => res.boostPlan===undefined))
      this.setState({keys: Object.keys(snapshot.val()),allAccounts:Object.values(snapshot.val()),accounts:results})
      console.log(results);
    });
  }

  renderHCards(item, index){
    const CATEGORIES = [
      {
        id: '0',
        title: 'Para você',
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
    let result = [];
    CATEGORIES.map((cat,index) => {
      result.push(
        <TouchableOpacity style={{margin:20,height:130,marginBottom:20}} onPress={()=>this.changeFilter(index)}>
          <View style={styles.horizontalCardBody}>
            <Text style={{fontSize:20,color:'white'}}>{cat.title}</Text>
          </View>
        </TouchableOpacity>
      )
    })
    return result
  }

  changeFilter(index){
    let filter;
    switch (index) {
      case 0:
        this.setState({filter:'Para você'})
        filter = 'Para você';
        break;
      case 1:
        this.setState({filter:'Bares'})
        filter = 'Bares';
        break;
      case 2:
        this.setState({filter:'Restaurantes'})
        filter = 'Restaurantes';
        break;
      case 3:
        this.setState({filter:'Supermercados'})
        filter = 'Supermercados';
        break;
      case 4:
        this.setState({filter:'Eventos'})
        filter = 'Eventos';
        break;
      default:
        break;
    }
    this.getAccountsData(filter);
  }

  renderVCard(item, index){
    if(item.type==="Bar"||item.type==="Supermercado"||item.type==="Restaurante"){
      if(item.boostPlan){
        return (
          <TouchableOpacity style={{marginLeft:'10%',marginRight:'10%',marginBottom:20}} onPress={()=>this.props.navigation.navigate("CommercialDisplay", {data:item, uid:this.state.keys[index]})}>
            <View style={{...styles.verticalCardBody,backgroundColor:'green'}}>
              <Text style={{fontSize:20,color:'white',textAlign:'center',marginTop:10,marginBottom:10}}>{item.displayName}</Text>
              <Image source={{uri:item.profilePic}} style={{height:150,borderBottomLeftRadius:50,borderBottomRightRadius:50}}/>
            </View>
          </TouchableOpacity>
        )
      }else{
        return (
          <TouchableOpacity style={{marginLeft:'10%',marginRight:'10%',marginBottom:20}} onPress={()=>this.props.navigation.navigate("CommercialDisplay", {data:item, uid:this.state.keys[index]})}>
            <View style={styles.verticalCardBody}>
              <Text style={{fontSize:20,color:'white',textAlign:'center',marginTop:10,marginBottom:10}}>{item.displayName}</Text>
              <Image source={{uri:item.profilePic}} style={{height:150,borderBottomLeftRadius:50,borderBottomRightRadius:50}}/>
            </View>
          </TouchableOpacity>
        )
      }
    }else if(item.type==="event"){
      return (
        <TouchableOpacity style={{marginLeft:'10%',marginRight:'10%',marginBottom:20}} onPress={()=>Alert.alert(item.eventTitle,item.eventDescription)}>
          <View style={{...styles.verticalCardBody,backgroundColor:'blue'}}>
            <Text style={{fontSize:20,color:'white',textAlign:'center',marginTop:10,marginBottom:10}}>{item.eventTitle}</Text>
            <Image source={{uri:item.profilePic}} style={{height:150,borderBottomLeftRadius:50,borderBottomRightRadius:50}}/>
          </View>
        </TouchableOpacity>
      )
    }
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
