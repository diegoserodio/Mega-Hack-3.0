import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, Button, alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Cam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code  with type ${type} and data ${data} has been scaneed!`);
  };

  if (hasPermission === null) {
    return <Text>Permissão para ativar a câmera</Text>
  }

  if (hasPermission === false) {
    return <Text>Você não pode acessar a câmera</Text>
  }

  return (
    <View style={styles.container}>
      <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}>
          <Text style={styles.description}>Código de Barras</Text>
          <Image
          style={styles.qr}
          source={require('../src/assets/img/QR.png')}
          />
        </BarCodeScanner>  

        {scanned && <Button title={'Toque para escanear novamente'} onPress={() => setScanned(false)} />}
      </View>
    </View>
  );
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
    color: 'white',
  },
});


