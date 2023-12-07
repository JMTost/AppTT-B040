import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Pressable, Platform, Touchable, TouchableOpacity, Image, picker, SafeAreaView, Alert, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import infoApp from '../../../infoApp.json';

const VerDietaPaciente = ({navigation, route}) => {
    const {id} = route.params;

    const [dataApi, setDataApi] = useState(null);

    useEffect( () => {
        const fetchObtenDieta = async () => {
            try {
                const respuesta = await fetch(`${infoApp.APIurl}/alimentodieta/busqueda/paciente/${id}`);
                if(respuesta.ok){
                    const json = await respuesta.json();
                    setDataApi(json.objeto);
                }else if(respuesta.status === 404){
                    const json = await respuesta.json();
                    setDataApi(json);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchObtenDieta();
    }, []);


    const myListEmpty = () => {
        return (
            <View style={{ alignItems: "center", flex: 1, marginTop: 320 }}>
                <Text style={{ fontWeight: "bold" }}>No existe dieta creada</Text>
                <TouchableOpacity style={styles.containerButton} onPress={() => navigation.navigate('CrearDieta')} >
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#9d9f89', '#bcbfa3']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                    >
                        <Text style={styles.text}>Crear Dieta</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    };

    if(dataApi != null){
        if(dataApi.hasOwnProperty('mensaje')){
            return( //caso de no terner una dieta
                <View style={{ alignItems: "center", flex: 1, marginTop: 320 }}>
                    <Text style={{ fontWeight: "bold" }}>No existe dieta creada</Text>
                    <TouchableOpacity style={styles.containerButton} onPress={() => navigation.navigate('CrearDieta', {id : id})} >
                        <LinearGradient
                            // Button Linear Gradient
                            colors={['#9d9f89', '#bcbfa3']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.button}
                        >
                            <Text style={styles.text}>Crear Dieta</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            );
        }else{
            let dieta = [];
            //console.log(dataApi);
            for(let i = 0; i < dataApi.comidas.length; i++){
                for(let j = 0; j < dataApi.comidas[i].comida.length; j++){
                    dieta.push({
                        tituloComida : dataApi.comidas[i].tipoComida,
                        idComida : dataApi.comidas[i].idTipo,
                        proteinas: dataApi.comidas[i].comida[j].proteinas,
                        cantidadesProteinas: dataApi.comidas[i].comida[j].cantidadesProteinas,
                        lacteos: dataApi.comidas[i].comida[j].lacteos,
                        cantidadesLacteos: dataApi.comidas[i].comida[j].cantidadesLacteos,
                        frutas: dataApi.comidas[i].comida[j].frutas,
                        cantidadesFrutas: dataApi.comidas[i].comida[j].cantidadesFrutas,
                        verduras: dataApi.comidas[i].comida[j].verduras,
                        cantidadesVerduras: dataApi.comidas[i].comida[j].cantidadesVerduras,
                        granos: dataApi.comidas[i].comida[j].granos,
                        cantidadesGranos: dataApi.comidas[i].comida[j].cantidadesGranos,
                        duracion: dataApi.comidas[i].comida[j].duracion,
                    });
                }
            }
            //console.log("info dieta", dieta)
            return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={dieta}
                        renderItem={({ item }) =>
                            <ScrollView style={styles.containerScroll}>
                                <View style={styles.imageContainer}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }} key={item.idComida}>
                                        <Image
                                            source={item.tituloComida === 'Desayuno.' ? require("../../../Imagenes/desayuno.jpg" )
                                            : item.tituloComida === 'Comida.' ? require("../../../Imagenes/comida.jpg")
                                            : item.tituloComida === 'Colacion.' ? require("../../../Imagenes/colacion1.jpg")
                                            : item.tituloComida === 'Cena.' ? require("../../../Imagenes/cena.jpg")
                                            : null}
                                            opacity={.3}
                                            style={styles.excerciseImage}
                                        />
                                        <Text style={styles.excerciseTitle}>{item.tituloComida}</Text>
                                        <Text style={styles.excerciseDescription}></Text>
                                        <TouchableOpacity style={styles.icon} onPress={() => descripcion({comidasproteinas : [item.proteinas], cantidadesproteinas : [item.cantidadesProteinas], comidasVerduras : [item.verduras], cantidadesverduras : [item.cantidadesVerduras], comidasLacteos : [item.lacteos], cantidadesLacteos: [item.cantidadesLacteos], comidasfrutas : [item.frutas], cantidadesFrutas : [item.cantidadesFrutas], comidasgranos : [item.granos], cantidadesGranos :  [item.cantidadesGranos]})}>
                                            <Image
                                                source={require("../../../Imagenes/ojo.png")}
                                                style={styles.icon}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.iconEditar} onPress={() => navigation.navigate('ModificarDieta', {dataDieta: {comidasproteinas : [item.proteinas], cantidadesproteinas : [item.cantidadesProteinas], comidasVerduras : [item.verduras], cantidadesverduras : [item.cantidadesVerduras], comidasLacteos : [item.lacteos], cantidadesLacteos: [item.cantidadesLacteos], comidasfrutas : [item.frutas], cantidadesFrutas : [item.cantidadesFrutas], comidasgranos : [item.granos], cantidadesGranos :  [item.cantidadesGranos], idComida : item.idComida, duracion : item.duracion, idpaciente : dataApi.id_paciente}})}>
                                            <Image
                                                source={require("../../../Imagenes/edit.png")}
                                                style={styles.iconEditar}
                                            />
                                        </TouchableOpacity>
        
                                    </View>
                                </View>
    
                            </ScrollView>
                        }
                        keyExtractor={(item) => item.id}
                        //ItemSeparatorComponent={myItemSeparator}
        
                        ListEmptyComponent={myListEmpty}
        
                    />
                    <View style={{ alignItems: "center", marginTop: 50 }}>
                      <TouchableOpacity style={styles.containerButton} onPress={() => navigation.navigate('CrearDieta', {id : id})} >
                          <LinearGradient
                              // Button Linear Gradient
                              colors={['#9d9f89', '#bcbfa3']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 1 }}
                              style={styles.button}
                          >
                              <Text style={styles.text}>Crear Dieta</Text>
                          </LinearGradient>
                      </TouchableOpacity>
                  </View>
                </SafeAreaView >
            );
        }
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
/*
const descripcion = (texto) => {
    //console.log("datos: ", texto)
    let cadena = "";
    //console.log(texto.comidasproteinas[0])
    let proteinas = [], verduras = [], lacteos = [], frutas = [], granos = [];
    if(Platform.OS === 'android'){
    if(texto.comidasproteinas[0] != 'no aplica'){
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
  
    if(texto.comidasVerduras[0] != 'no aplica'){
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
  
    if(texto.comidasLacteos[0] != 'no aplica'){
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
  
    if(texto.comidasfrutas[0] != 'no aplica'){
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
  
    if(texto.comidasgranos[0] != 'no aplica'){
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
      if(texto.comidasproteinas[0] != 'no aplica'){
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
    
      if(texto.comidasVerduras[0] != 'no aplica'){
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
    
      if(texto.comidasLacteos[0] != 'no aplica'){
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
    
      if(texto.comidasfrutas[0] != 'no aplica'){
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
    
      if(texto.comidasgranos[0] != 'no aplica'){
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
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 30,
    },
    item: {
        flex: 1,
        alignItems: "center",
        alignContent: "center",
        fontSize: 15,
    },
    containerButton: {
        alignItems: 'center',
        width: 250,
        marginTop: 10,
        margin: 60,
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerScroll: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
    },
    imageContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    excerciseImage: {
        width: 400,
        height: 120,
        borderRadius: 15,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 15,
        position: "absolute",
        top: 6,
        right: 10,
        zIndex: 10,
    },
    iconEditar: {
        width: 50,
        height: 50,
        borderRadius: 15,
        position: "absolute",
        top: 30,
        right: 6,
        zIndex: 10,
    },
    excerciseTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        position: "absolute",
        top: 20,
        left: 10,
        zIndex: 10,
    },
    excerciseDescription: {
        fontSize: 15,
        textAlign: "left",
        position: "absolute",
        marginRight: 160,
        top: 80,
        left: 10,
        zIndex: 10,
    }

});

export default VerDietaPaciente;