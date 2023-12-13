import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView , Image, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import infoApp from '../../../infoApp.json';

const CitasProfesional = ({navigation}) => {
    //console.log(infoApp.usuarioProfesional.citas)
    if(infoApp.usuarioProfesional.citas === "Informacíón no encontrada"){
        return (
            <View style={{flex : 1, alignContent : 'center', alignItems : 'center', justifyContent : 'center'}}>
                <Text style={{fontSize : 20, fontWeight : 'bold'}}>{infoApp.usuarioProfesional.citas}</Text>
                <TouchableOpacity style={styles.containerButton} onPress={() => navigation.navigate('CrearCitas' , {id : infoApp.usuarioProfesional.idUsuario})}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#c66900', '#e28000']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                    >
                        <Text style={styles.text}>NUEVA CITA</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }else{
        const elementos = [];
        for(let i = 0; i < infoApp.usuarioProfesional.citas.length; i++){
            elementos.push(
                <View style={styles.container} key={i}>
                    <Image
                        source={require("../../../Imagenes/calendario.png")}
                        style={styles.icon}
                    />    
                    <LinearGradient colors={['#93ccc6', '#6cbdb5']} style={styles.containerCita}>
                        <Text style={styles.textTipoCita}>{infoApp.usuarioProfesional.citas[i].tipoCita}</Text>
                        <Image
                            source={require("../../../Imagenes/doctor.png")}
                            style={styles.iconDoc}
                        />    
                        <Text style={styles.textNombreProfesional}>{infoApp.usuarioProfesional.citas[i].nombreProfesional}</Text>
                        <Image
                            source={require("../../../Imagenes/paciente.png")}
                            style={styles.iconPaciente}
                        />    
                        <Text style={styles.textNombrePaciente}>{infoApp.usuarioProfesional.citas[i].nombrePaciente}</Text>
                        <Image
                            source={require("../../../Imagenes/fecha.png")}
                            style={styles.iconFecha}
                        />    
                        <Text style={styles.textDataCita}>{infoApp.usuarioProfesional.citas[i].fecha} {infoApp.usuarioProfesional.citas[i].hora}</Text>
                    </LinearGradient>
                </View>
            )
        }
        return (
            <ScrollView contentContainerStyle={styles.fullContainer}>
                {elementos}
                <TouchableOpacity style={styles.containerButton} onPress={() => navigation.navigate('CrearCitas', {id : infoApp.usuarioProfesional.idUsuario})}> 
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#c66900', '#e28000']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                    >
                        <Text style={styles.text}>NUEVA CITA</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    fullContainer: {
        //flex: 1, //ASI FUNCIONA EL SCROLLVIEW
        backgroundColor: 'white',
        padding: 20,
    },
    container: {
        backgroundColor: "white",
        marginBottom: 15,

    },
    containerCita: {
        width: 370,
        height: 120,
        borderRadius: 15,
    },
    textTipoCita: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        position: "absolute",
        top: 10,
        right: 40,
        zIndex: 10,
    },
    textNombreProfesional: {
        fontSize: 15,
        textAlign: "left",
        position: "absolute",
        marginRight: 160,
        top: 15,
        left: 60,
        zIndex: 10,
    },
    textNombrePaciente: {
        fontSize: 15,
        textAlign: "left",
        position: "absolute",
        marginRight: 160,
        top: 53,
        left: 60,
        zIndex: 10,
    },
    textDataCita: {
        fontSize: 15,
        textAlign: "left",
        position: "absolute",
        marginRight: 160,
        top: 90,
        left: 60,
        zIndex: 10,
    },
    icon: {
        width: 70,
        height: 70,
        borderRadius: 15,
        position: "absolute",
        top: 30,
        right: 25,
        zIndex: 10,
    },
    iconDoc: {
        width: 30,
        height: 30,
        borderRadius: 15,
        position: "absolute",
        top: 10,
        left: 20,
        zIndex: 10,
    },
    iconPaciente: {
        width: 30,
        height: 30,
        borderRadius: 15,
        position: "absolute",
        top: 48,
        left: 20,
        zIndex: 10,
    },
    iconFecha: {
        width: 30,
        height: 30,
        borderRadius: 15,
        position: "absolute",
        top: 85,
        left: 20,
        zIndex: 10,
    },
    containerButton: {
        alignItems: 'center',
        width: 250,
        marginTop: 40,
        marginLeft: "auto",
        marginRight: "auto",
    },

    text: {
        fontSize: 14,
        color: 'white',
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
});

export default CitasProfesional;