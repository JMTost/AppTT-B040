import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View, TouchableOpacity,Image, ScrollView} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import infoApp from '../../../infoApp.json';

const RutinaPaciente = ({navigation, route}) => {
    //!Hacer las vistas de modificacion y de video
    const {id} = route.params;
    console.log(id);

    const [dataApi, setDataApi] = useState(null);

    useEffect( () => {
        const fetchObtenRutinaPaciente = async () => {
            try {
                const respuesta = await fetch(`${infoApp.APIurl}/obtenEjercicioRutinaPaciente/${id}`);
                if(respuesta.ok){
                    const json = await respuesta.json();
                    setDataApi(json.data);
                }else if(respuesta.status === 404){
                    const json = await respuesta.json();
                    setDataApi(json);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchObtenRutinaPaciente();
    }, []);
    
    const ListaVacia = () => {
        return (
            <View style={{ alignItems: "center", flex: 1, marginTop: 320 }}>
                <Text style={{ fontWeight: "bold" }}>No existe rutina creada</Text>
                <TouchableOpacity style={styles.containerButton} onPress={() => navigation.navigate('Creación de Rutina')} >
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#9d9f89', '#bcbfa3']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                    >
                        <Text style={styles.text}>Crear Rutina</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    };
    
    

    if(dataApi != null){
        if(dataApi.hasOwnProperty('mensaje')){
            //No se cuenta con un dato que mostrar
            return(
                <View style={styles.container}>
                    <Text>{dataApi.mensaje}</Text>
                </View>
            );
        }else{
            const ejercicios = [];
            for(let i = 0; i < dataApi.length; i++){
                ejercicios.push({
                    "id_rutina": dataApi[i].id_rutina,
                    "nombreEjercicio": dataApi[i].nombreEjercicio,
                    "musculo": dataApi[i].musculo,
                    "cantidad": dataApi[i].cantidad,
                    "nombreVideo": dataApi[i].nombreVideo,
                    "vigencia": dataApi[i].vigencia,
                    "fechaI": dataApi[i].fechaI,
                    "fechaFin": dataApi[i].fechaFin,
                    "id_video": dataApi[i].id_video
                });
            }
            return(
                <SafeAreaView style={styles.container}>
                    <FlatList data={ejercicios} renderItem={({item}) =>
                        <ScrollView style={styles.containerScroll}>
                            <View style={styles.imageContainer}>
                                <View style={{alignItems : 'center', justifyContent : 'center'}}>
                                    <Image source={require("../../../Imagenes/Desplantes.jpg")}
                                        opacity={.3} style={styles.excerciseImage}/>
                                    <Text style={styles.excerciseTitle}>{item.nombreEjercicio}</Text>
                                    <Text style={styles.excerciseDescription}>Cantidad a realizar : {item.cantidad} Musculo : {item.musculo} {item.fechaI} al {item.fechaFin}</Text>
                                    <TouchableOpacity style={styles.icon} onPress={() => console.log("video")}>
                                        <Image source={require('./../../../Imagenes/video.png')} style={styles.icon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.iconEditar} onPress={() => console.log("Editar")}>
                                        <Image source={require('../../../Imagenes/edit.png')} style={styles.iconEditar} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                        } keyExtractor={(item) => item.id} ListEmptyComponent={ListaVacia} />
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

export default RutinaPaciente;