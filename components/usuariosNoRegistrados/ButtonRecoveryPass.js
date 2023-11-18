import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonGradient(){
    return(
        <TouchableOpacity style={styles.container} onPress={handleLogin} >
            <LinearGradient
                // Button Linear Gradient
                colors={['#326D6C', '#173C4C']}   
                start={{x:0, y:0}}
                end={{x:1, y:1}} 
                style={styles.button}      
            >           
                <Text style={styles.text}>ENVIAR CONTRASEÑA</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const handleLogin = () => {
    // Aquí puedes agregar la lógica de inicio de sesión
    alert('Iniciando sesión con email: ${email} y contraseña: ${password}');
  };


const styles = StyleSheet.create({
    container:{          
        alignItems: 'center', 
        width:250,
        marginTop: 60,
        margin: 60,
    },
   
    text: {
      fontSize: 14,
      color: '#c2ccc9',  
      fontWeight: 'bold',
    },
    input: {
      width: '80%',
      height: 50,
      backgroundColor: 'white', // Color de fondo del campo de entrada
      paddingStart: 30,
      borderRadius: 30,
      marginTop: 20
    },
    button:{
        width: '80%',
        height: 50,
        borderRadius: 25, 
        padding: 10,        
        alignItems: 'center', 
        justifyContent: 'center'
    }
  });