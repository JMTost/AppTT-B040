import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import infoApp from '../../../infoApp.json';

const {width, height} = Dimensions.get('window');

export default function CambioContrasenaFormulario() {
    const navigation = useNavigation();
    const [currentContrasena, setCurrentContrasena] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const handleCambiaContrasena = () => {
      if(currentContrasena === "" || nuevaContrasena === ""){
        Alert.alert("Error", "Campos de entrada vacíos, compruebe los campos");
      }else if( (currentContrasena.length > 0 || currentContrasena < 16) || (nuevaContrasena.length > 0 || nuevaContrasena.length < 16) ){
        const dataEnvio = {
          "id" : infoApp.usuarioPaciente.idUsuario,
          "contraPasada" : currentContrasena,
          "contraNueva" : nuevaContrasena,
          "tipoUsuario" : infoApp.tipo
        };
        console.log(dataEnvio)
        const realizaActualizacionAPI = async () => {
          const response = await fetch(`${infoApp.APIurl}/cambioContra`, {
            method : 'PUT', headers : {
              'Content-Type' : "application/json"
            }, body : JSON.stringify(dataEnvio),
          });
          if(response.ok){
            const data = await response.json();
            Alert.alert("Exito", "Actualización de contraseña", [
              {
                text : 'OK',
                onPress : () => {navigation.navigate('PrincipalPaciente')}
              }
            ], {cancelable : false});
          }else{
            console.log("info : error", response.statusText);
            Alert.alert("Error", response.statusText);
          }
        };
        realizaActualizacionAPI();
      }
    };

    return (
        <View style={styles.container}>
        {/*<Text style={styles.title}>Cambio de Contraseña</Text>*/}
        <TextInput
          style={styles.input}
          placeholder="Contraseña Actual"
          secureTextEntry={true}
          onChangeText={(text) => setCurrentContrasena(text)}
          maxLength={16}
        />
        <TextInput
          style={styles.input}
          placeholder="Nueva Contraseña"
          secureTextEntry={true}
          onChangeText={(text) => setNuevaContrasena(text)}
          maxLength={16}
        />
        {/*<Button title="Cambiar Contraseña" onPress={handleCambiaContrasena} />*/}
        <TouchableOpacity style={styles.containerButton} onPress={handleCambiaContrasena} >
          <LinearGradient
              // Button Linear Gradient
              colors={['#255000', '#588100']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
          >
              <Text style={styles.text}>Cambiar Contraseña</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );

}

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop : 5,
      paddingBottom : 20
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: width * 0.6,//'80%',
      height: height*0.06,//40,
      backgroundColor : 'white',
      /*
      borderColor: 'white',
      borderWidth: 1,
      marginBottom: 20,
      paddingLeft: 10,
      */
      paddingStart: 30,
      borderRadius: 30,
      marginTop: height*0.01,//10,
    },
    containerButton: {
      alignItems: 'center',
      width: width * 0.5,
      marginTop: 20,
      margin: height * 0.009,
  },
  text: {
      fontSize: 14,
      color: '#fff',
      fontWeight: 'bold',
  },
  button: {
    width: '80%',
    height: 40,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
},
  });