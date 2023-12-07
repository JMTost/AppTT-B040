import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View, TouchableOpacity,Image, ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import infoApp from '../../../infoApp.json';


const VisualizaMedicionesPaciente = ({navigation, route}) => {
    const {id} = route.params;//obtenemos el id del paciente

    const [dataApi, setDataApi] = useState(null);

    useEffect( () => {
        const fetchObtenMediciones = async () => {
            try {
                const respuesta = await fetch(`${infoApp.APIurl}/busquedaMediciones/${id}`);
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
        fetchObtenMediciones();
    }, []);

    const ListaVacia = () => {
        return(
            <View style={{ alignItems: "center", flex: 1, marginTop: 320 }}>
                <Text style={{ fontWeight: "bold" }}>No existen mediciones </Text>
                <TouchableOpacity style={styles.containerButton} onPress={
                    //console.log("Creación de medición")
                    () => navigation.navigate('CrearMedicion', {id : id})
                } >
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#9d9f89', '#bcbfa3']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                    >
                        <Text style={styles.text}>Crear Medición</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    };

    if(dataApi != null){
        if(dataApi.hasOwnProperty('mensaje')){
            //No se cuenta con dato que mostrar
            return(
                <View style={{ alignItems: "center", flex: 1, marginTop: 320 }}>
                <Text style={{ fontWeight: "bold" }}>No existen mediciones </Text>
                <TouchableOpacity style={styles.containerButton} onPress={
                    //console.log("Creación de medición")
                    () => navigation.navigate('CrearMedicion', {id : id})
                } >
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#9d9f89', '#bcbfa3']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                    >
                        <Text style={styles.text}>Crear Medición</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            );
        }else{
            const mediciones = [];
            //console.log(dataApi)
            for(let i = 0; i < dataApi.abdominal.length; i++){
                mediciones.push({
                    "peso": dataApi.peso[i],
                    "axiliar": dataApi.axiliar[i],
                    "abdominal": dataApi.abdominal[i],
                    "bicipital": dataApi.bicipital[i],
                    "muslo": dataApi.muslo[i],
                    "suprailiaco": dataApi.suprailiaco[i],
                    "triceps": dataApi.triceps[i],
                    "subescapular": dataApi.subescapular[i],
                    "toracica": dataApi.toracica[i],
                    "pantorrilla": dataApi.pantorrilla[i],
                    "cintura": dataApi.cintura[i],
                    "fecha": dataApi.fecha[i]
                });
            }
            return(
                <SafeAreaView style={styles.container}>
                    <FlatList data={mediciones} renderItem={({item}) =>
                        <ScrollView style={styles.containerScroll}>
                                <View style={styles.imageContainer}>
                                    <View style={{alignItems : 'center', justifyContent : 'center'}}>
                                        <Image source={require("../../../Imagenes/medicionesPortada.jpg")}
                                            opacity={.3} style={styles.excerciseImage}/>
                                        <Text style={styles.excerciseTitle}>Medición del día {item.fecha}</Text>
                                        <Text style={styles.excerciseDescription}></Text>
                                        <TouchableOpacity style={styles.iconEditar} onPress={
                                            //() => console.log("editar")
                                            () => navigation.navigate('EditarMedicionPaciente', {idPaciente : id, idProfesional : infoApp.usuarioProfesional.idUsuario, infoMedicion : item})
                                            }>
                                            <Image source={require('../../../Imagenes/edit.png')} style={styles.iconEditar} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        </ScrollView>
                        
                        } keyExtractor={(item) => item.id} ListEmptyComponent={ListaVacia} />
                        <View style={{ alignItems: "center", marginTop: 50 }}>
                                <TouchableOpacity style={styles.containerButton} onPress={
                                    //() => console.log("crear medicion")
                                    () => navigation.navigate('CrearMedicion', {id : id})
                                    } >
                                    <LinearGradient
                                        // Button Linear Gradient
                                        colors={['#9d9f89', '#bcbfa3']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.button}
                                    >
                                        <Text style={styles.text}>Crear Medición</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                </SafeAreaView>
            );
        }
    }
};

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
        height: 150,
        borderRadius: 15,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 15,
        position: "absolute",
        top: 15,
        right: 10,
        zIndex: 10,
    },
    iconEditar: {
        width: 50,
        height: 50,
        borderRadius: 15,
        position: "absolute",
        top: 40,
        right: 5,
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
    excerciseDescription:{
        fontSize: 15,
        textAlign: "left",
        position: "absolute",
        marginRight: 160,
        top: 80,
        left: 10,
        zIndex: 10,
    }
    
});


export default VisualizaMedicionesPaciente;