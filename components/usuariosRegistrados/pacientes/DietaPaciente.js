import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import infoApp from '../../../infoApp.json';

const DietaPaciente = () => {
  if(infoApp.usuarioPaciente.dieta === 'No se encontro registros'){
    return (
      <View style={styles.container}>
          {
            //<Text style={styles.text}>DIETA PACIENTE</Text>
          }
          <Text>{infoApp.usuarioPaciente.dieta}</Text>
      </View>
  );
  }else{
    const elementos = [];
    const comidasfrutas = [], comidasgranos=  [], comidasproteinas = [], comidasLacteos = [], comidasVerduras = [];
    const cantidadesFrutas = [], cantidadesGranos = [], cantidadesproteinas = [], cantidadesLacteos = [], cantidadesverduras = [];
    for(let i = 0; i < infoApp.usuarioPaciente.dieta.length; i++){
      //console.log(infoApp.usuarioPaciente.dieta[i]);

      for(let j = 0; j < infoApp.usuarioPaciente.dieta[i].comida.length; j++){
        comidasproteinas.push(infoApp.usuarioPaciente.dieta[i].comida[j].proteinas);
        cantidadesproteinas.push(infoApp.usuarioPaciente.dieta[i].comida[j].cantidadesProteinas);
        comidasVerduras.push(infoApp.usuarioPaciente.dieta[i].comida[j].verduras);
        cantidadesverduras.push(infoApp.usuarioPaciente.dieta[i].comida[j].cantidadesVerduras);
        comidasLacteos.push(infoApp.usuarioPaciente.dieta[i].comida[j].lacteos);
        cantidadesLacteos.push(infoApp.usuarioPaciente.dieta[i].comida[j].cantidadesLacteos);
        comidasfrutas.push(infoApp.usuarioPaciente.dieta[i].comida[j].frutas);
        cantidadesFrutas.push(infoApp.usuarioPaciente.dieta[i].comida[j].cantidadesFrutas);
        comidasgranos.push(infoApp.usuarioPaciente.dieta[i].comida[j].granos);
        cantidadesGranos.push(infoApp.usuarioPaciente.dieta[i].comida[j].cantidadesGranos);
      }
      elementos.push(
        <View>
          <Text>{infoApp.usuarioPaciente.dieta[i].tipoComida}</Text>
          <Text>Descripción de la comida</Text>
          <Text>Proteinas: </Text>
          <Text>{comidasproteinas[i]} ; {cantidadesproteinas[i]}</Text>
        </View>
      ); 
    }
    return (
      <View>
              {elementos}
      </View>
    );
  }
    
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    text: {
      fontSize: 20,
    },
});

export default DietaPaciente;