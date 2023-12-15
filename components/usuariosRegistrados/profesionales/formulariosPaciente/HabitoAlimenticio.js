import React, {useState, useEffect} from "react";
import infoApp from '../../../../infoApp.json';
import { ScrollView, View, Text, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {Dropdown} from 'react-native-element-dropdown';
import {ExpandableView} from '@pietile-native-kit/expandable-view';

const HabitoAlimenticio = ({navigation, route}) => {
    const {id} = route.params;

    const [dataApi, setDataApi] = useState(null);//variable de la respuesta de la api

    const [alimentosMconsumidos, setAlimentoMconsumidos] = useState('');
    const [alimentosAlergia, setAlimentosAlegia] = useState('');
    const [cantidadAgua, setCantidadAgua] = useState('');
    const [cantidadComidas, setCantidadComidas] = useState('');
    const [cantidadColaciones, setCantidadColaciones] = useState('');
    const [horaDesayuno, setHoraDesayuno] = useState('');
    const [horaComida, setHoraComida] = useState('');
    const [horaCena, setHoraCena] = useState('');

    useEffect( () => {
        const fetchObtenHabitoAlimenticio = async () => {
            const respuesta = await fetch(`${infoApp.APIurl}/habitoAlimenticio/obten/${id}`);
            if(respuesta.ok){
                const json = await respuesta.json();
                setDataApi("actualiza");
                //console.log(json);
                //obtenemos los datos y se almacenan en un dato directo
                setAlimentoMconsumidos(json.obj.masConsumidos);
                setAlimentosAlegia(json.obj.alimentos_alergia);
                setCantidadAgua(json.obj.cantidad_agua.toString());
                setCantidadComidas(json.obj.cantidad_comidas.toString());
                setCantidadColaciones(json.obj.cantidad_colaciones.toString());
                let hdesayuno = json.obj.horaDesayuno.split(':');
                let hcomida = json.obj.horaComida.split(':');
                let hcena = json.obj.horaCena.split(':');
                setHoraDesayuno(hdesayuno[0]+":"+hdesayuno[1]);
                setHoraComida(hcomida[0]+":"+hcomida[1]);
                setHoraCena(hcena[0]+":"+hcena[1]);
            }else if(respuesta.status === 404){
                const json = await respuesta.json();
                setDataApi(json.mensaje);
                console.log(dataApi)
            }
        };
        fetchObtenHabitoAlimenticio();
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
        if(dataApi === 'actualiza'){
            console.log("info: ", dataApi);
            let regexHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if(alimentosMconsumidos === '' || alimentosMconsumidos.length > 200 || alimentosAlergia === '' || alimentosAlergia.length > 200 || cantidadAgua < 0  || cantidadAgua === "" || cantidadComidas < 0 || cantidadComidas === '' || cantidadColaciones < 0 || cantidadColaciones === '' || !regexHora.test(horaDesayuno.toString())  || regexHora.test(horaComida.toString()) || regexHora.test(horaCena.toString())){
                Alert.alert("Error", "Verifica los datos de los campos solicitados.\nEn caso de no colocar información en un campo, coloque no aplica, excepto en los campo de hora.");
                console.log(regexHora.test(horaD.toString), regexHora.test(horaS.toString), TextdescFisica === "", TextdescFisica.length > 100, TextdescRutina === "", TextdescRutina.length > 100)   
            }else{
                console.log("NO HAY ERROR");
                const data = {
                    "id" : id,
                    "masConsumidos" : alimentosMconsumidos, 
                    "alimentos_alergia" : alimentosAlergia, 
                    "cantidad_agua" : cantidadAgua,
                    "cantidad_comidas" : cantidadComidas,
                    "cantidad_colaciones" : cantidadColaciones,
                    "horaDesayuno" : horaDesayuno,
                    "horaComida" : horaComida,
                    "horaCena" : horaCena
                };
                const realizaCargaAPI = async () => {
                    const response = await fetch(`${infoApp.APIurl}/habitoAlimenticio/actualiza`, {
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
                        console.log("info : error ", mensaje);
                        Alert.alert("Error", mensaje.mensaje);
                    }
                };
                realizaCargaAPI();
            }
        }else{
            //console.log("info: ", dataApi);
            let regexHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if((alimentosMconsumidos === '' || alimentosMconsumidos.length > 200) || (alimentosAlergia === '' || alimentosAlergia.length > 200) || (cantidadAgua < 0  || cantidadAgua === "") || (cantidadComidas < 0 || cantidadComidas === '') || (cantidadColaciones < 0 || cantidadColaciones === '' )|| regexHora.test(horaDesayuno.toString()) === false || regexHora.test(horaComida.toString()) === false || regexHora.test(horaCena.toString()) === false){
                Alert.alert("Error", "Verifica los datos de los campos solicitados.\nEn caso de no colocar información en un campo, coloque no aplica, excepto en los campo de hora.");
            }else{
                console.log("NO HAY ERROR");
                const dataPOST = {
                    "id" : id,
                    "masConsumidos" : alimentosMconsumidos, 
                    "alimentos_alergia" : alimentosAlergia, 
                    "cantidad_agua" : cantidadAgua,
                    "cantidad_comidas" : cantidadComidas,
                    "cantidad_colaciones" : cantidadColaciones,
                    "horaDesayuno" : horaDesayuno,
                    "horaComida" : horaComida,
                    "horaCena" : horaCena
                };
                const realizaCargaAPI = async () => {
                    const response = await fetch(`${infoApp.APIurl}/habitoAlimenticio/alta`, {
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json',
                        }, body : JSON.stringify(dataPOST),
                    });
                    if(response.ok){
                        Alert.alert("Exito", "Creación correcta de información", [
                            {
                                text : 'OK',
                                onPress : () => navigation.navigate('PrincipalProfesional')
                            }
                        ], {cancelable : false});
                    }else if(response.status === 404){
                        let mensaje = await response.json();
                        console.log("info : error ", mensaje);
                        Alert.alert("Error", mensaje.mensaje);
                    }
                };
                realizaCargaAPI();
            }
        }
    };
    
    if(dataApi === "actualiza"){
        return(
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.subtitle}>Datos para crear el hábito alimenticio del paciente</Text>
                    <Text style={styles.textoCampo}>Alimentos que más consuma: </Text>
                    <TextInput style={styles.input} value={alimentosMconsumidos} onChangeText={text => setAlimentoMconsumidos(text)} maxLength={200}  keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Alimentos a los que es alergico: </Text>
                    <TextInput style={styles.input} value={alimentosAlergia} onChangeText={text => setAlimentosAlegia(text)} maxLength={200} keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Cantidad de agua que consume: </Text>
                    <TextInput style={styles.input} value={cantidadAgua} onChangeText={text => setCantidadAgua(text)}  keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Cantidad de comidas que realiza: </Text>
                    <TextInput style={styles.input} value={cantidadComidas} onChangeText={text => setCantidadComidas(text)}  keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Cantidad de colaciones que realiza: </Text>
                    <TextInput style={styles.input} value={cantidadColaciones} onChangeText={text => setCantidadColaciones(text)}  keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Hora en la que realiza el desayuno: </Text>
                    <TextInput style={styles.input} value={horaDesayuno} onChangeText={text => setHoraDesayuno(text)} keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Hora en la que realiza la comida: </Text>
                    <TextInput style={styles.input} value={horaComida} onChangeText={text => setHoraComida(text)}  keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Hora en la que realiza la cena: </Text>
                    <TextInput style={styles.input} value={horaCena}  onChangeText={text => setHoraCena(text)} keyboardType="default"/>

                    <ButtonGradient titulo={"Actualizar información"}></ButtonGradient>
                </View>
        </ScrollView>
        );
    }else{//caso de no tener información
        return(
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.subtitle}>Datos para crear el hábito alimenticio del paciente</Text>
                    <Text style={styles.textoCampo}>Alimentos que más consuma: </Text>
                    <TextInput style={styles.input} value={alimentosMconsumidos} onChangeText={text => setAlimentoMconsumidos(text)} maxLength={200}  keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Alimentos a los que es alergico: </Text>
                    <TextInput style={styles.input} value={alimentosAlergia} onChangeText={text => setAlimentosAlegia(text)} maxLength={200} keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Cantidad de agua que consume: </Text>
                    <TextInput style={styles.input} value={cantidadAgua} onChangeText={text => setCantidadAgua(text)}  keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Cantidad de comidas que realiza: </Text>
                    <TextInput style={styles.input} value={cantidadComidas} onChangeText={text => setCantidadComidas(text)}  keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Cantidad de colaciones que realiza: </Text>
                    <TextInput style={styles.input} value={cantidadColaciones} onChangeText={text => setCantidadColaciones(text)}  keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Hora en la que realiza el desayuno: </Text>
                    <TextInput style={styles.input} value={horaDesayuno} onChangeText={text => setHoraDesayuno(text)} keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Hora en la que realiza la comida: </Text>
                    <TextInput style={styles.input} value={horaComida} onChangeText={text => setHoraComida(text)}  keyboardType="default"/>
                    
                    <Text style={styles.textoCampo}>Hora en la que realiza la cena: </Text>
                    <TextInput style={styles.input} value={horaCena}  onChangeText={text => setHoraCena(text)} keyboardType="default"/>

                    <ButtonGradient titulo={"Carga de información"}></ButtonGradient>
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


export default HabitoAlimenticio;