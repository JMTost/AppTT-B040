import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IniciarSesion from './IniciarSesion';
import RegistroPaciente from './RegistroPaciente';
import RegistroProfesional from './RegistroProfesional';
import recuperarContrasena from './RecuperarContrasena';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio de Sesion" component={IniciarSesion} />
        <Stack.Screen name="Registro de Paciente" component={RegistroPaciente} />
        <Stack.Screen name="Registro de Profesional" component={RegistroProfesional} />
        <Stack.Screen name="Recuperar contraseña" component={recuperarContrasena} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
