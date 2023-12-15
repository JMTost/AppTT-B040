import React, {useState, useEffect} from "react";
import infoApp from '../../../../infoApp.json';
import { ScrollView, View, Text, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {Dropdown} from 'react-native-element-dropdown';
import {ExpandableView} from '@pietile-native-kit/expandable-view';


const HabitoPersonal = ({navigation, route}) => {
    const {id} = route.params;

    const [dataApi, setDataApi] = useState(null);//variable de la respuesta de la api

    const [horaD, setHoraD] = useState('');
    const [horaS, setHoraS] = useState('');
    const [TextdescFisica, setTextdescFisica] = useState('');
    const [TextdescRutina, setTextdescRutina] = useState('');

    useEffect( () => {
        const fetchObtenInfoHabitoPersonal = async () => {
            try {
                const respuesta = await fetch(`${infoApp.APIurl}/habitoPersonal/busqueda/${id}`);
                if(respuesta.ok){//caso donde existe el registro
                    const json = await respuesta.json();
                    let datosd = json.horaD.split(':');
                    let datos = json.horaS.split(':');
                    setDataApi("actualiza");
                    setHoraD(datosd[0]+":"+datosd[1]);
                    setHoraS(datos[0]+":"+datos[1]);
                    setTextdescFisica(json.desc_fisica);
                    setTextdescRutina(json.rutinaDia);
                }else if(respuesta.status === 404){
                    const json = await respuesta.json();
                    console.log("data 404: ", json);
                    setDataApi(json.mensaje)
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchObtenInfoHabitoPersonal();
    }, []);

    const ButtonGradient = ({titulo : titulo}) => {
        return(
            <TouchableOpacity style={styles.containerBUTTON} onPress={handleCargaAPI} >
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#6cbdb5', '#93ccc6']}   
                    start={{x:0, y:0}}
                    end={{x:1, y:1}} 
                    style={styles.button}      
                >           
                    <Text style={styles.textBUTTON}>{titulo}</Text>
                </LinearGradient>
            </TouchableOpacity>
          );
    };

    const handleCargaAPI = () => {
        if(dataApi === "Información no encontrada"){
            console.log("Alta info");
            let regexHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if(regexHora.test(horaD.toString()) === false  || regexHora.test(horaS.toString()) === false || (TextdescFisica === "" || TextdescFisica.length > 100) || (TextdescRutina === "" || TextdescRutina.length > 100)){
              Alert.alert("Error", "Verifica los datos de los campos solicitados.\nEn caso de no colocar información en un campo, coloque no aplica, excepto en los campo de hora.");
              console.log(regexHora.test(horaD.toString), regexHora.test(horaS.toString), TextdescFisica === "", TextdescFisica.length > 100, TextdescRutina === "", TextdescRutina.length > 100)
          }else{
            const data = {
              "id" : id,
              "horaD": horaD,
              "horaS": horaS,
              "descFisica": TextdescFisica,
              "rutinaDia": TextdescRutina
            };
            const realizaCargaAPIsubida = async () => {
              const response = await fetch(`${infoApp.APIurl}/habitoPersonal/alta`, {
                method : 'POST',
                headers : {
                  'Content-Type' : 'application/json',
                }, body : JSON.stringify(data),
              });
              if(response.ok){
                Alert.alert("Exito", "Creación correcta de información", [
                  {
                    text : 'OK',
                    onPress : () => navigation.navigate("PrincipalProfesional")
                  }
                ], {cancelable : false});
              }else{
                let mensaje = await response.json();
                console.log("Info : error ", mensaje);
                Alert.alert("Error", mensaje);
              }
            };
            realizaCargaAPIsubida();
          }
        }else if(dataApi === "actualiza"){
            let regexHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if(regexHora.test(horaD.toString()) === false  || regexHora.test(horaS.toString()) === false || (TextdescFisica === "" || TextdescFisica.length > 100) || (TextdescRutina === "" || TextdescRutina.length > 100)){
                Alert.alert("Error", "Verifica los datos de los campos solicitados.\nEn caso de no colocar información en un campo, coloque no aplica, excepto en los campos de hora.");
                console.log(regexHora.test(horaD.toString), regexHora.test(horaS.toString), TextdescFisica === "", TextdescFisica.length > 100, TextdescRutina === "", TextdescRutina.length > 100)
            }else{
                const data = {
                    "id" : id,
                    "horaD": horaD,
                    "horaS": horaS,
                    "descFisica": TextdescFisica,
                    "rutinaDia": TextdescRutina
                };
                const realizaCargaActualizacionAPI = async () => {
                  const response = await fetch(`${infoApp.APIurl}/habitoPersonal/actualiza`, {
                    method : 'PUT',
                    headers : {
                      'Content-Type' : 'application/json',
                    }, body : JSON.stringify(data),
                  });
                  if(response.ok){
                    Alert.alert("Exito", "Actualización correcta de información", [
                      {
                        text : 'OK',
                        onPress : () => navigation.navigate('PrincipalProfesional')
                      }
                    ], {cancelable : false});
                  }else if(response.status === 404){
                    let mensaje = await response.json();
                    console.log("Info : error ", mensaje);
                    Alert.alert("Error", mensaje.mensaje);
                  }
                };
                realizaCargaActualizacionAPI();
            }
        }
    };

    if(dataApi === "Información no encontrada"){//caso de mostrar el formulario vacio
        return (
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.subtitle}>Datos para crear el hábito personal del paciente</Text>
                        <Text style={styles.textoCampo}>Hora en la que despierta</Text>
                        <TextInput style={styles.input} value={horaD} onChangeText={text => setHoraD(text)} keyboardType="numbers-and-punctuation" placeholder="Coloca la hora en formato de 24 hrs"/>
                        <Text style={styles.textoCampo}>Hora en la que duerme</Text>
                        <TextInput style={styles.input} value={horaS} onChangeText={text => setHoraS(text)} keyboardType="numbers-and-punctuation" placeholder="Coloca la hora en formato de 24 hrs"/>
                        <Text style={styles.textoCampo}>Descripción física</Text>
                        <TextInput
                            style={styles.desc}
                            multiline={true}
                            numberOfLines={3} // Puedes ajustar la cantidad de líneas visibles
                            value={TextdescFisica}
                            placeholder="Escribe aquí la descripción física"
                            onChangeText={(text) => setTextdescFisica(text)}
                        />
                        <Text style={styles.textoCampo}>Rutina del día que tiene</Text>
                        <TextInput
                            style={styles.desc}
                            multiline={true}
                            numberOfLines={3} // Puedes ajustar la cantidad de líneas visibles
                            value={TextdescRutina}
                            placeholder="Escribe aquí la rutina del día"
                            onChangeText={(text) => setTextdescRutina(text)}
                        />
                        
                        <ButtonGradient titulo={"Carga de información"} />

                </View>
            </ScrollView>
        );
    }else if(dataApi === "actualiza"){
        return(
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.subtitle}>Datos para crear el hábito personal del paciente</Text>
                        <Text style={styles.textoCampo}>Hora en la que despierta</Text>
                        <TextInput style={styles.input} value={horaD} onChangeText={text => setHoraD(text)} keyboardType="numbers-and-punctuation" placeholder="Coloca la hora en formato de 24 hrs"/>
                        <Text style={styles.textoCampo}>Hora en la que duerme</Text>
                        <TextInput style={styles.input} value={horaS} onChangeText={text => setHoraS(text)} keyboardType="numbers-and-punctuation" placeholder="Coloca la hora en formato de 24 hrs"/>
                        <Text style={styles.textoCampo}>Descripción física</Text>
                        <TextInput
                            style={styles.desc}
                            multiline={true}
                            numberOfLines={3} // Puedes ajustar la cantidad de líneas visibles
                            value={TextdescFisica}
                            placeholder="Escribe aquí la descripción física"
                            onChangeText={(text) => setTextdescFisica(text)}
                        />
                        <Text style={styles.textoCampo}>Rutina del día que tiene</Text>
                        <TextInput
                            style={styles.desc}
                            multiline={true}
                            numberOfLines={3} // Puedes ajustar la cantidad de líneas visibles
                            value={TextdescRutina}
                            placeholder="Escribe aquí la rutina del día"
                            onChangeText={(text) => setTextdescRutina(text)}
                        />
                        
                        <ButtonGradient titulo={"Actualización"} />

                </View>
            </ScrollView>
        );
    }

};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      //marginTop: 60,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        paddingTop : 30
    },
    title: {
      fontSize: 70,
      fontWeight: 'bold',
      color: '#000',
      marginRight:40,
    },
  
    subtitle:{
      fontSize: 20, 
      color: 'black',
      paddingBottom : 10
      //marginRight:140,
  
    },
  
    input: {
      width: '80%',
      height: 50,
      backgroundColor: 'white', // Color de fondo del campo de entrada
      //paddingStart: 30,
      borderRadius: 30,
      paddingLeft : 10
      //textAlign : 'center',
      //marginTop: 30,
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
    },
  
      //ESTILOS DEL BOTON
      containerBUTTON:{          
        alignItems: 'center', 
        width:250,
        marginTop: 60,
        margin: 60,
      },
  
      textBUTTON: {
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
      },
    //
      //estilos Dropdown
      containerDrop:{
        borderRadius:30,
        flex: 1,
        backgroundColor: '#93ccc6',
      },
    
      dropdown: {
        height: 50,
        width: 330,
        backgroundColor: 'white', // Color de fondo del campo de entrada
        paddingStart: 30,
        borderRadius: 30,
        paddingHorizontal: 20,
        marginTop:10,
      },
    
      placeholderStyle: {
        fontSize: 16,
        color: 'gray',
        borderRadius: 30,
      },
    
      selectedTextStyle: {
        fontSize: 16,
      },
    
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderRadius: 30,
      }, 
      textoCampo : {
        alignSelf : 'baseline', 
        paddingLeft : 20, 
        paddingBottom : 5,
        paddingTop : 5
      },
      contenedorDesplegable : {
        alignSelf : 'baseline',
        paddingLeft : 20,
      },
      textoDesplegable: {
        alignSelf : 'baseline', 
        paddingLeft : 20,
        paddingTop : 5,
        color : 'black'
        //fontSize : 15
      },
      textoCampoBoton : {
        alignSelf : 'baseline', 
        paddingLeft : 20, 
        paddingBottom : 5,
        paddingTop : 5,
        fontSize : 15,
        fontWeight : 'bold'
      },
      desc : {
        width: '80%',
        height: 80,
        paddingStart: 30,
        borderRadius: 30,
        marginTop: 10,
        backgroundColor : 'white'
      },
      //ESTILOS DEL BOTON
    containerBUTTON:{          
        alignItems: 'center', 
        width:250,
        marginTop: 30,
        margin: 30,
      },
  
      textBUTTON: {
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
      },
    //
});


export default HabitoPersonal;