// components/LoginScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import HomeScreen from './home';

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button
        title="Iniciar Sesión"
        onPress={() => navigation.navigate({HomeScreen})}
      />
    </View>
  );
};

export default LoginScreen;
