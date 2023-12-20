import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import 'react-native-gesture-handler';
import RutinaPierna from "./componentesEjercicios/RutinaPierna";
import RutinaBrazo from "./componentesEjercicios/RutinaBrazo";
import RutinaEspalda from "./componentesEjercicios/RutinaEspalda";
import RutinaPecho from "./componentesEjercicios/RutinaPecho";
import RutinaHombro from "./componentesEjercicios/RutinaHombro";
import infoApp from '../../../infoApp.json';

const Tab = createMaterialTopTabNavigator();
const {width, height} = Dimensions.get('window');

const RutinaPaciente = () => {
  
  const gruposMusculos = {  //nos servirá para comprobar a que componente corresponde
    'Pectorales.': 'Pecho',
    'Dorsales.': 'Espalda',
    'Trapecio.': 'Espalda',
    'Cuádriceps.': 'Pierna',
    'Pantorrillas.': 'Pierna',
    'Isquiotibiales.': 'Pierna',
    'Glúteos.': 'Pierna',
    'Gluteos.': 'Pierna',
    'Deltoides.': 'Hombro',
    'Bíceps.': 'Brazo',
    'Biceps.': 'Brazo',
    'Abdominales.': 'Cadera',
    'Flexores de cadera.': 'Cadera',
  }
  //console.log(infoApp.usuarioPaciente);
  if(infoApp.usuarioPaciente.ejercicios.length > 0){
    //obtenemos la cantidad de ejercicios que se cuenta
    let elementos = [];
    const ejercicios = [], componente = [];
    for(let i = 0; i < infoApp.usuarioPaciente.ejercicios.length; i++){
      const musculo = infoApp.usuarioPaciente.ejercicios[i].musculo;
      //comprobamos a que grupo corresponse
      const grupoMuscular = gruposMusculos[musculo];
      //hara motramos el componente al que corresponde
      switch (grupoMuscular) {
        case 'Pecho' : 
          //console.log("Caso para el musculo: ", musculo, " Grupo: ", grupoMuscular);
          ejercicios.push({musculo : "Pecho", id : i});
          componente.push(infoApp.usuarioPaciente.ejercicios[i])
          break;
        case 'Espalda' : 
          //console.log("Caso para el musculo: ", musculo, " Grupo: ", grupoMuscular);
          ejercicios.push({musculo : "Espalda", id : i});
          componente.push(infoApp.usuarioPaciente.ejercicios[i])
          break;
        case 'Pierna' : 
          //console.log("Caso para el musculo: ", musculo, " Grupo: ", grupoMuscular);
          ejercicios.push({musculo : "Pierna", id : i});
          componente.push(infoApp.usuarioPaciente.ejercicios[i])
          break;
        case 'Hombro' : 
          //console.log("Caso para el musculo: ", musculo, " Grupo: ", grupoMuscular);
          ejercicios.push({musculo : "Hombro", id : i});
          componente.push(infoApp.usuarioPaciente.ejercicios[i])
          break;
        case 'Brazo' : 
          //console.log("Caso para el musculo: ", musculo, " Grupo: ", grupoMuscular);
          ejercicios.push({musculo : "Brazo", id : i});
          componente.push(infoApp.usuarioPaciente.ejercicios[i])
          break;
        case 'Cadera' : 
          //console.log("Caso para el musculo: ", musculo, " Grupo: ", grupoMuscular);
          ejercicios.push({musculo : "Cadera", id : i});
          componente.push(infoApp.usuarioPaciente.ejercicios[i])
          break;
        default : 
          //lógica por defecto
          console.log("Error, musculo no encontrado");
      }
    }
    const nuevaLista = ajustarListaDeEjercicios(ejercicios);
    elementos = generaElementosScreen(nuevaLista, componente)
    
    //console.log(elementos);
    
    return (
     
      <Tab.Navigator>
      {elementos}
      {
      /*    
        <Tab.Screen name="Día 1 Espalda" component={RutinaEspalda} />
        <Tab.Screen name="Día 2 Pecho" component={RutinaPecho} />
        <Tab.Screen name="Día 3 Pierna" component={RutinaPierna} />
        <Tab.Screen name="Día 4 Hombro" component={RutinaHombro} />
        <Tab.Screen name="Día 5 Brazo" component={RutinaBrazo}  />
      */
  }    
      </Tab.Navigator>
      
    );
  }else{
    return (
      <View style={{flex : 1, alignContent : 'center', justifyContent : 'center', alignItems : 'center'}}> 
        <Text style={styles.textTitulo}>No se cuentan con ejercicios que mostrar</Text>
      </View>
    );
  }
  
};

function ajustarListaDeEjercicios(ejercicios) {
  // Verificar si la cantidad de ejercicios es 1
  if (ejercicios.length === 1) {
    // Si es 1, duplicar los elementos 5 veces
    ejercicios = Array(5).fill(...ejercicios);
  } else {
    // Si es más de 1, intercalar los elementos
    const nuevaLista = [];
    const repeticiones = Math.ceil(5 / ejercicios.length); // Calcular cuántas veces se deben repetir los ejercicios para alcanzar 5

    // Crear la nueva lista intercalando los ejercicios
    for (let i = 0; i < repeticiones; i++) {
      for (let j = 0; j < ejercicios.length; j++) {
        nuevaLista.push(ejercicios[j]);
      }
    }

    // Recortar la lista para que tenga exactamente 5 elementos
    ejercicios = nuevaLista.slice(0, 5);
  }

  return ejercicios;
}

function generaElementosScreen(lista, dataEjercicio){
  const salida = [];
  for(let i = 0; i < lista.length; i++){
    //console.log(dataEjercicio[lista[i].id]);
    switch(lista[i].musculo){
        case 'Pecho':
          salida.push(
            <Tab.Screen key = {i} name={`Día ${i+1} ${'Pecho'}`} component={RutinaPecho} initialParams={dataEjercicio[lista[i].id]} />
          );
        break;
        case 'Espalda':
          salida.push(
            <Tab.Screen key = {i} name={`Día ${i+1} ${'Espalda'}`} component={RutinaEspalda} initialParams={dataEjercicio[lista[i].id]} />
          );
          break;
        case 'Pierna':
          salida.push(
            <Tab.Screen key = {i} name={`Día ${i+1} ${'Pierna'}`} component={RutinaPierna} initialParams={dataEjercicio[lista[i].id]} />
          );
          break;
        case 'Hombro':
          salida.push(
            <Tab.Screen key = {i} name={`Día ${i+1} ${'Hombro'}`} component={RutinaHombro} initialParams={dataEjercicio[lista[i].id]} />
          );
          break;
        case 'Brazo':
          salida.push(
            <Tab.Screen key = {i} name={`Día ${i+1} ${'Brazo'}`} component={RutinaBrazo} initialParams={dataEjercicio[lista[i].id]} />
          );
          break;
        case 'Cadera':
          //!crear el componente
          salida.push(
            <Tab.Screen key = {i} name={`Día ${i+1} ${'Cadera'}`} component={RutinaPecho} initialParams={dataEjercicio[lista[i].id]} />
          );
          break;
    }
  }
  return salida;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
  textTitulo : {
    fontSize : width * 0.05,
    paddingBottom : 10
},
});

export default RutinaPaciente;
