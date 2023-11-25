import React, { useState } from "react";
import { StyleSheet, Text, View} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import RutinaPierna from "./RutinaPierna";
import RutinaBrazo from "./RutinaBrazo";
import RutinaEspalda from "./RutinaEspalda";
import RutinaPecho from "./RutinaPecho";
import RutinaHombro from "./RutinaHombro";

const RutinaPaciente = () => {
  const [tab, setTab] = useState("Inicio");

  const tabs = ["Inicio", "Perfil", "Configuración"];

  const navigateToTab = (tab) => {
    setTab(tab);
  };

  const Tab = createMaterialTopTabNavigator();

  return (
    
    <Tab.Navigator>
      <Tab.Screen name="Día 1   Espalda" component={RutinaEspalda} />
      <Tab.Screen name="Día 2   Pecho" component={RutinaPecho} />
      <Tab.Screen name="Día 3   Pierna" component={RutinaPierna} />
      <Tab.Screen name="Día 4   Hombro" component={RutinaHombro} />
      <Tab.Screen name="Día 5   Brazo" component={RutinaBrazo} />
    </Tab.Navigator>

  );
};

const InicioScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la pantalla de inicio</Text>
    </View>
  );
};

const PerfilScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la pantalla de perfil</Text>
    </View>
  );
};

const ConfiguraciónScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la pantalla de configuración</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default RutinaPaciente;
