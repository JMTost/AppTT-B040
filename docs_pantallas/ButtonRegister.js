import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonGradient(){
    return(
        <TouchableOpacity style={styles.container} onPress={handleLogin} >
            <LinearGradient
                // Button Linear Gradient
                colors={['#9d9f89', '#bcbfa3']}   
                start={{x:0, y:0}}
                end={{x:1, y:1}} 
                style={styles.button}      
            >           
                <Text style={styles.text}>REGISTRARSE</Text>
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
      color: '#fff',  
      fontWeight: 'bold',
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