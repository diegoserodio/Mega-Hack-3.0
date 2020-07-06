import React from 'react'
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert, Image, ScrollView, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './../Components/Header';

import * as firebase from 'firebase';

export default class CommercialDisplay extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userData:null,
      uid:null
    }
  }

  componentDidMount(){
    this.setState({userData: this.props.navigation.state.params.data, uid:this.props.navigation.state.params.uid});
  }

  render() {
    let {userData} = this.state;
    if(userData===null){
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
        <Header title='' logo={false} arrowBack={true} navigation={this.props.navigation}/>
          <ScrollView style={{flex:1}}>

            <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
            <View style={styles.profileHeader}>
              <Image source={{uri:userData.profilePic}} style={{width:150,height:150,borderRadius:150,margin:20}}/>
              <Text style={{fontSize:25,color:'#fff',textAlign:'center'}}>{userData.displayName}</Text>
              <Text style={{fontSize:15,color:'#fff',textAlign:'center',marginBottom:10}}>{userData.address}</Text>

              {this.renderFeedback(userData.feedback,userData.usersWithFeedback)}

            </View>
            </View>

            {this.renderPreferences(userData.preferences)}

            <View style={{flexDirection:'row',justifyContent:'center'}}>
            <View style={{alignSelf: 'flex-start'}}>
            <Text style={{fontSize:25,color:'#f6c267',marginTop:20,textAlign:'center'}}>Informações para contato</Text>
              <Text style={{fontSize:15,color:'#999',marginTop:20,textAlign:'center'}}>Telefone: {userData.phone}</Text>
              <Text style={{fontSize:15,color:'#999',marginTop:20,textAlign:'center'}}>Email: {userData.email}</Text>
            </View>
            </View>

            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <View style={{alignSelf: 'flex-start'}}>
              <Text style={{fontSize:25,color:'#f6c267',marginTop:20,textAlign:'center'}}>Avalie este local</Text>
              <View style={{flexDirection:'row',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>this.setFeedback(1)}>
                  <Icon name='star' size={50} color='#f7ca79' style={{marginRight:10}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setFeedback(2)}>
                  <Icon name='star' size={50} color='#f7ca79' style={{marginRight:10}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setFeedback(3)}>
                  <Icon name='star' size={50} color='#f7ca79' style={{marginRight:10}}/>
                </TouchableOpacity>
              </View>
              </View>
            </View>


          </ScrollView>
      </View>
    )
  }

  setFeedback(value){
    let {uid,userData} = this.state;
    let usersWithFeedback = userData.usersWithFeedback+1;
    firebase
    .database()
    .ref('/commercial-accounts/'+uid)
    .update({
      feedback: userData.feedback+value,
      usersWithFeedback: usersWithFeedback
    })
    .then(() => {
      alert("Obrigado pela avaliação!");
    })
    .catch(e => alert(e))
  }

  renderFeedback(feedback, usersWithFeedback){
    let score = 0, result = [];
    if(usersWithFeedback!==0){
      score = Math.floor(feedback/usersWithFeedback)
    }
    for(let i = 0; i < score; i++){
      result.push(<Icon name='star' size={50} color='white' style={{marginRight:10}}/>)
    }
    for(let i = score; i < 3; i++){
      result.push(<Icon name='star' size={50} color='#f7ca79' style={{marginRight:10}}/>)
    }
    return (
      <View style={{flexDirection:'row'}}>
        {result}
      </View>
    )
  }

  renderPreferences(preferences){
    let result = []
    preferences.map((p,index) => {
      p!=='' ?
      result.push(<Text key={index} style={{fontSize:15,color:'#999',marginTop:5,marginLeft:25}}>{p}</Text>)
      :
      null
    })

    return (
      <View style={{flexDirection:'row',justifyContent:'center'}}>
      <View style={{alignSelf: 'flex-start'}}>
      <Text style={{fontSize:25,color:'#f6c267',marginTop:20,textAlign:'center'}}>Sobre seu estabelecimento</Text>
        {result}
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  profileHeader: {
    flexDirection:'column',
    alignItems:'center',
    width:'100%',
    backgroundColor:'#f5b03a',
    borderBottomLeftRadius:80,
    borderBottomRightRadius:80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8
  },
  textInput: {
    height: 40,
    borderColor: 'grey',
    borderBottomWidth: 1,
    padding:10,
  },
  button: {
    paddingLeft:40,
    paddingRight:40,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"#f6ba53",
    borderRadius:20,
    marginBottom:20,
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
