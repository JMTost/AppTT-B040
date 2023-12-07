import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView, Platform} from 'react-native';
import infoApp from '../../../infoApp.json';

const DietaPaciente = () => {
  if(infoApp.usuarioPaciente.dieta === 'No se encontro registros'){
    return (
      <View style={styles.container}>
          <Text>No se cuenta con una dieta que mostrar</Text>
          {/*<Text>{infoApp.usuarioPaciente.dieta}</Text>*/}
      </View>
  );
  }else{
    //console.log(infoApp.usuarioPaciente.dieta)
    const elementos = [];
    let IMGname = "";
    for(let i = 0; i < infoApp.usuarioPaciente.dieta.length; i++){
      //console.log(infoApp.usuarioPaciente.dieta[i]);

      for(let j = 0; j < infoApp.usuarioPaciente.dieta[i].comida.length; j++){
        //console.log(infoApp.usuarioPaciente.dieta[i].comida[0].duracion);
        const comidasfrutas = [], comidasgranos=  [], comidasproteinas = [], comidasLacteos = [], comidasVerduras = [];
        const cantidadesFrutas = [], cantidadesGranos = [], cantidadesproteinas = [], cantidadesLacteos = [], cantidadesverduras = [];
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


        if(infoApp.usuarioPaciente.dieta[i].tipoComida === "Desayuno."){
          elementos.push(
            <View key = {i} style={styles.imageContainer}>
              <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                <Image source={require('../../../Imagenes/desayuno.jpg')}
                  opacity={.3} style={styles.excerciseImage} />
                <Text style={styles.excerciseTitle}>{infoApp.usuarioPaciente.dieta[i].tipoComida}</Text>
                <Text style={styles.excerciseDescription}>{infoApp.usuarioPaciente.dieta[i].comida[0].duracion} semanas</Text>
                <TouchableOpacity style={styles.icon} onPress={() => descripcion({comidasproteinas, cantidadesproteinas, comidasVerduras, cantidadesverduras, comidasLacteos, cantidadesLacteos, comidasfrutas, cantidadesFrutas, comidasgranos, cantidadesGranos})}>
                  <Image source={require('../../../Imagenes/ojo.png')}
                  style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ); 
        }else if(infoApp.usuarioPaciente.dieta[i].tipoComida === "Comida."){
          elementos.push(
            <View key = {i} style={styles.imageContainer}>
              <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                <Image source={require('../../../Imagenes/comida.jpg')}
                  opacity={.3} style={styles.excerciseImage} />
                <Text style={styles.excerciseTitle}>{infoApp.usuarioPaciente.dieta[i].tipoComida}</Text>
                <Text style={styles.excerciseDescription}>{infoApp.usuarioPaciente.dieta[i].comida[0].duracion} semanas</Text>
                <TouchableOpacity style={styles.icon} onPress={() => descripcion({comidasproteinas, cantidadesproteinas, comidasVerduras, cantidadesverduras, comidasLacteos, cantidadesLacteos, comidasfrutas, cantidadesFrutas, comidasgranos, cantidadesGranos})}>
                  <Image source={require('../../../Imagenes/ojo.png')}
                  style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ); 
        }else if(infoApp.usuarioPaciente.dieta[i].tipoComida === "Cena."){
          elementos.push(
            <View key = {i} style={styles.imageContainer}>
              <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                <Image source={require('../../../Imagenes/cena.jpg')}
                  opacity={.3} style={styles.excerciseImage} />
                <Text style={styles.excerciseTitle}>{infoApp.usuarioPaciente.dieta[i].tipoComida}</Text>
                <Text style={styles.excerciseDescription}>{infoApp.usuarioPaciente.dieta[i].comida[0].duracion} semanas</Text>
                <TouchableOpacity style={styles.icon} onPress={() => descripcion({comidasproteinas, cantidadesproteinas, comidasVerduras, cantidadesverduras, comidasLacteos, cantidadesLacteos, comidasfrutas, cantidadesFrutas, comidasgranos, cantidadesGranos})}>
                  <Image source={require('../../../Imagenes/ojo.png')}
                  style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ); 
        }else if(infoApp.usuarioPaciente.dieta[i].tipoComida === "Colacion."){
          elementos.push(
            <View key = {i} style={styles.imageContainer}>
              <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                <Image source={require('../../../Imagenes/colacion1.jpg')}
                  opacity={.3} style={styles.excerciseImage} />
                <Text style={styles.excerciseTitle}>{infoApp.usuarioPaciente.dieta[i].tipoComida}</Text>
                <Text style={styles.excerciseDescription}>{infoApp.usuarioPaciente.dieta[i].comida[0].duracion} semanas</Text>
                <TouchableOpacity style={styles.icon} onPress={() => descripcion({comidasproteinas, cantidadesproteinas, comidasVerduras, cantidadesverduras, comidasLacteos, cantidadesLacteos, comidasfrutas, cantidadesFrutas, comidasgranos, cantidadesGranos})}>
                  <Image source={require('../../../Imagenes/ojo.png')}
                  style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ); 
        }

      }
      
    }
    return (
      <ScrollView style={styles.container}>
              {elementos}
      </ScrollView>
    );
  }
    
};

const descripcion = (texto) => {
  let cadena = "";
  console.log(texto)
  console.log(texto.comidasLacteos[0] === "0" )
  //console.log(texto.comidasproteinas[0])
  let proteinas = [], verduras = [], lacteos = [], frutas = [], granos = [];
  if(Platform.OS === 'android'){
  if(texto.comidasproteinas[0] != 'no aplica' && texto.comidasproteinas[0] !== '0'){
    cadena += "Proteinas: \n";
    if(texto.comidasproteinas[0].includes(',')){
      let alimentosProteinas = texto.comidasproteinas[0].split(',');
      if(alimentosProteinas.length > 1){//contamos con mas de un registro
        let cantidadesProteinas = texto.cantidadesproteinas[0].split(',');
        //console.log(alimentosProteinas, cantidadesProteinas);
        for(let i = 0; i < alimentosProteinas.length; i++){
          proteinas.push({"Alimento : ":alimentosProteinas[i], "Cantidades : " : cantidadesProteinas[i]});
          cadena += `\t\t${alimentosProteinas[i]} : ${cantidadesProteinas[i]}\n`;
        }
      }
    }else{//contamos con solo un registro
      proteinas.push({"Alimento : ":texto.comidasproteinas[0], "Cantidades : " : texto.cantidadesproteinas[0]});
      cadena += `\t\t${texto.comidasproteinas[0]} : ${texto.cantidadesproteinas[0]}\n`;
    }
  }else proteinas = "";

  if(texto.comidasVerduras[0] != 'no aplica' && texto.comidasVerduras[0] !== '0'){
    cadena += "Verduras: \n";
    if(texto.comidasVerduras[0].includes(',')){
      let alimentosVerduras = texto.comidasVerduras[0].split(',');
      if(alimentosVerduras.length > 1){    
        let cantidadesVerduras = texto.cantidadesverduras[0].split(',');
        for(let i = 0; i < alimentosVerduras.length; i++){
          verduras.push({"Alimento : ":alimentosVerduras[i], "Cantidades : " : cantidadesVerduras[i]});
          cadena += `\t\t${alimentosVerduras[i]} : ${cantidadesVerduras[i]}\n`;
        }
      }
    }else{
      verduras.push({"Alimento : ":texto.comidasVerduras[0], "Cantidades : " : texto.cantidadesverduras[0]});
      cadena += `\t\t${texto.comidasVerduras[0]} : ${texto.cantidadesverduras[0]}\n`;
    }
  }else verduras = "";

  if(texto.comidasLacteos[0] != 'no aplica' && texto.comidasLacteos[0] !== '0'){
    cadena += "Lacteos: \n";
    if(texto.comidasLacteos[0].includes(',')){
      let alimentosLacteos = texto.comidasLacteos[0].split(',');
      if(alimentosLacteos.length > 1){
        let cantidadesLacteos = texto.cantidadesLacteos[0].split(',');
        for(let i = 0; i < alimentosLacteos.length; i++){
          lacteos.push({"Alimento : ":alimentosLacteos[i], "Cantidades : " : cantidadesLacteos[i]});
          cadena += `\t\t${alimentosLacteos[i]} : ${cantidadesLacteos[i]}\n`;
        }
      }
    }else{
      lacteos.push({"Alimento : ":texto.comidasLacteos[0], "Cantidades : " : texto.cantidadesLacteos[0]});
      cadena += `\t\t${texto.comidasLacteos[0]} : ${texto.cantidadesLacteos[0]}\n`;
    }
  }else lacteos = "";

  if(texto.comidasfrutas[0] != 'no aplica' && texto.comidasfrutas[0] !== '0'){
    cadena += "Frutas: \n";
    if(texto.comidasfrutas[0].includes(',')){
      let alimentosFrutas = texto.comidasfrutas[0].split(',');
      if(alimentosFrutas.length > 1){
        let cantidadesFrutas = texto.cantidadesFrutas[0].split(',');
        for(let i = 0; i < alimentosFrutas.length; i++){
          frutas.push({"Alimento : ":alimentosFrutas[i], "Cantidades : " : cantidadesFrutas[i]});
          cadena += `\t\t${alimentosFrutas[i]} : ${cantidadesFrutas[i]}\n`;
        }
      }
    }else{
      frutas.push({"Alimento : ":texto.comidasfrutas[0], "Cantidades : " : texto.cantidadesFrutas[0]});
      cadena += `\t\t${texto.comidasfrutas[0]} : ${texto.cantidadesFrutas[0]}\n`;
    }
  }else frutas = "";

  if(texto.comidasgranos[0] != 'no aplica' && texto.comidasgranos[0] !== '0'){
    cadena += "Granos: \n";
    if(texto.comidasgranos[0].includes(',')){
      let alimentosGranos = texto.comidasgranos[0].split(',');
      if(alimentosGranos.length > 1){
        let cantidadesGranos = texto.cantidadesGranos[0].split(',');
        for(let i = 0; i < alimentosGranos.length; i++){
          granos.push({"Alimento : ":alimentosGranos[i], "Cantidades : " : cantidadesGranos[i]});
          cadena += `\t\t${alimentosGranos[i]} : ${cantidadesGranos[i]}\n`;
        }
      }
    }else{
      granos.push({"Alimento : ":texto.comidasgranos[0], "Cantidades : " : texto.cantidadesGranos[0]});
      cadena += `\t\t${texto.comidasgranos[0]} : ${texto.cantidadesGranos[0]}\n`;
    }
  }else granos = "";
    Alert.alert("Descripción.", cadena, [{text : 'Cerrar'}]);
  }else if(Platform.OS === 'ios'){
    if(texto.comidasproteinas[0] != 'no aplica' && texto.comidasproteinas[0] !== '0'){
      cadena += "Proteinas: \n";
      if(texto.comidasproteinas[0].includes(',')){
        console.log("data")
        let alimentosProteinas = texto.comidasproteinas[0].split(',');
        if(alimentosProteinas.length > 1){//contamos con mas de un registro
          let cantidadesProteinas = texto.cantidadesproteinas[0].split(',');
          //console.log(alimentosProteinas, cantidadesProteinas);
          for(let i = 0; i < alimentosProteinas.length; i++){
            proteinas.push({"Alimento : ":alimentosProteinas[i], "Cantidades : " : cantidadesProteinas[i]});
            cadena += `${alimentosProteinas[i]} : ${cantidadesProteinas[i]}\n`;
          }
        }
      }else{//contamos con solo un registro
        proteinas.push({"Alimento : ":texto.comidasproteinas[0], "Cantidades : " : texto.cantidadesproteinas[0]});
        cadena += `${texto.comidasproteinas[0]} : ${texto.cantidadesproteinas[0]}\n`;
      }
    }else proteinas = "";
  
    if(texto.comidasVerduras[0] != 'no aplica' && texto.comidasVerduras[0] !== '0'){
      cadena += "Verduras: \n";
      if(texto.comidasVerduras[0].includes(',')){
        let alimentosVerduras = texto.comidasVerduras[0].split(',');
        if(alimentosVerduras.length > 1){    
          let cantidadesVerduras = texto.cantidadesverduras[0].split(',');
          for(let i = 0; i < alimentosVerduras.length; i++){
            verduras.push({"Alimento : ":alimentosVerduras[i], "Cantidades : " : cantidadesVerduras[i]});
            cadena += `${alimentosVerduras[i]} : ${cantidadesVerduras[i]}\n`;
          }
        }
      }else{
        verduras.push({"Alimento : ":texto.comidasVerduras[0], "Cantidades : " : texto.cantidadesverduras[0]});
        cadena += `${texto.comidasVerduras[0]} : ${texto.cantidadesverduras[0]}\n`;
      }
    }else verduras = "";
  
    if(texto.comidasLacteos[0] != 'no aplica' && texto.comidasLacteos[0] !== '0'){
      cadena += "Lacteos: \n";
      if(texto.comidasLacteos[0].includes(',')){
        let alimentosLacteos = texto.comidasLacteos[0].split(',');
        if(alimentosLacteos.length > 1){
          let cantidadesLacteos = texto.cantidadesLacteos[0].split(',');
          for(let i = 0; i < alimentosLacteos.length; i++){
            lacteos.push({"Alimento : ":alimentosLacteos[i], "Cantidades : " : cantidadesLacteos[i]});
            cadena += `${alimentosLacteos[i]} : ${cantidadesLacteos[i]}\n`;
          }
        }
      }else{
        lacteos.push({"Alimento : ":texto.comidasLacteos[0], "Cantidades : " : texto.cantidadesLacteos[0]});
        cadena += `${texto.comidasLacteos[0]} : ${texto.cantidadesLacteos[0]}\n`;
      }
    }else lacteos = "";
  
    if(texto.comidasfrutas[0] != 'no aplica' && texto.comidasfrutas[0] !== '0'){
      cadena += "Frutas: \n";
      if(texto.comidasfrutas[0].includes(',')){
        let alimentosFrutas = texto.comidasfrutas[0].split(',');
        if(alimentosFrutas.length > 1){
          let cantidadesFrutas = texto.cantidadesFrutas[0].split(',');
          for(let i = 0; i < alimentosFrutas.length; i++){
            frutas.push({"Alimento : ":alimentosFrutas[i], "Cantidades : " : cantidadesFrutas[i]});
            cadena += `${alimentosFrutas[i]} : ${cantidadesFrutas[i]}\n`;
          }
        }
      }else{
        frutas.push({"Alimento : ":texto.comidasfrutas[0], "Cantidades : " : texto.cantidadesFrutas[0]});
        cadena += `${texto.comidasfrutas[0]} : ${texto.cantidadesFrutas[0]}\n`;
      }
    }else frutas = "";
  
    if(texto.comidasgranos[0] != 'no aplica' && texto.comidasgranos[0] !== '0'){
      cadena += "Granos: \n";
      if(texto.comidasgranos[0].includes(',')){
        let alimentosGranos = texto.comidasgranos[0].split(',');
        if(alimentosGranos.length > 1){
          let cantidadesGranos = texto.cantidadesGranos[0].split(',');
          for(let i = 0; i < alimentosGranos.length; i++){
            granos.push({"Alimento : ":alimentosGranos[i], "Cantidades : " : cantidadesGranos[i]});
            cadena += `${alimentosGranos[i]} : ${cantidadesGranos[i]}\n`;
          }
        }
      }else{
        granos.push({"Alimento : ":texto.comidasgranos[0], "Cantidades : " : texto.cantidadesGranos[0]});
        cadena += `${texto.comidasgranos[0]} : ${texto.cantidadesGranos[0]}\n`;
      }
    }else granos = "";
    Alert.alert("Descripción.", cadena, [{text : 'Cerrar'}], []);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
},
imageContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20,
    marginBottom: 10,
},
excerciseImage: {
    width: 410,
    height: 120,
    borderRadius: 15,
},
excerciseTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
},
excerciseDescription:{
    fontSize: 15,
    textAlign: "left",
    position: "absolute",
    marginRight: 160,
    top: 70,
    left: 10,
    zIndex: 10,
},
icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: "absolute",
    bottom: 5,
    right: 5,
    zIndex: 10,
},
});

export default DietaPaciente;