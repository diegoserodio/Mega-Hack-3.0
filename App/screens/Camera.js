import React from 'react';
import { Text, View, Image, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Camera extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hasPermission:null,
      scanned:false
    }
  }

  async componentDidMount(){
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({hasPermission:'granted'})
    if (this.state.hasPermission === null) {
      return <Text>Permissão para ativar a câmera</Text>
    }
    if (this.state.hasPermission === false) {
      return <Text>Você não pode acessar a câmera</Text>
    }
  }

  handleBarCodeScanned({ type, data }) {
    this.props.navigation.navigate("Product", {data:data});
  };

  render(){
    let {scanned} = this.state;
    return (
      <View style={styles.container}>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={({type, data}) => scanned ? undefined : this.handleBarCodeScanned({type, data})}
            style={StyleSheet.absoluteFillObject}>
            <Text style={styles.description}>Posicione o código de barras na marcação</Text>
            <Image
            style={styles.qr}
            source={require('../src/assets/img/QR.png')}
            tintColor='white'
            />
          </BarCodeScanner>

          {/*scanned && <Button title={'Toque para escanear novamente'} onPress={() => setScanned(false)} />*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#F5F5F5'
  },

  qr: {
      top: '25%',
      height: '30%',
      width: '100%'
  },

  description: {
    marginTop: '10%',
    textAlign: 'center',
    width: '100%',
    color: '#666',
    fontSize:15
  },
});
