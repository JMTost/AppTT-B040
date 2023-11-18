import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//import Svg ,{Path, Defs, LinearGradient,Stop} from 'react-native-svg';
//const {width, height} = Dimension.get('window')
import ButtonGradient from './Button';

export default function IniciarSesion({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const recuperarContrasena = () => {
    // Aquí puedes agregar la lógica de inicio de sesión
    alert('Redireccinar a formulario para recuperar contraseña');
  };
  const registrarPaciente = () => {
    // Aquí puedes agregar la lógica de inicio de sesión
    alert('Redireccinar a formulario para registrar un usuario paciente');
  };
  const registrarProfesional = () => {
    // Aquí puedes agregar la lógica de inicio de sesión
    alert('Redireccinar a formulario para registrar a un usuario profesinal');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión con tu cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable onPress={() => navigation.navigate('Recuperar contraseña')}>
        <Text style={styles.forgotPasword}>¿Olvidaste tu contraseña?</Text>
      </Pressable>
      
      <ButtonGradient></ButtonGradient>

      <Pressable onPress={() => navigation.navigate('Registro de Paciente')}>
        <Text style={styles.btnregistraPaciente}>Registrate como paciente</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Registro de Profesional')}>
        <Text style={styles.btnregistraProfesional}>Registrate como profesional de la salud</Text>
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Color de fondo
    marginTop: 60,
  },

  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#000',
    marginRight:40,
  },

  subtitle:{
    fontSize: 20, 
    color: 'gray',
    marginRight:140,

  },

  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    marginTop: 30,
  },

  forgotPasword: {
    fontSize: 14,
    color: 'blue',
    marginTop: 20,
    marginStart: 190,
  },

  btnregistraPaciente: {
    fontSize: 15,
    color: 'blue',
    marginTop: 10,
    marginLeft: 190,
  },

  btnregistraProfesional: {
    fontSize: 15,
    color: 'blue',
    marginTop: 10,
    marginLeft: 110,
  }
});