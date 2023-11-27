import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import infoApp from '../../../infoApp.json';

const CitaPaciente = () => {
    const elementos = [];
    //console.log(infoApp.usuarioPaciente.citas);
    if(infoApp.usuarioPaciente.citas === "Sin información"){
        return(
            <View style={{flex : 1, alignContent : 'center', justifyContent : 'center', alignItems : 'center'}}>
                <Text style={styles.textTitulo}>{infoApp.usuarioPaciente.citas}</Text>
            </View>
        );
    }else{
        for(let i = 0; i < infoApp.usuarioPaciente.citas.length; i++){
            elementos.push(
                <View style={{paddingBottom : 10}}>
                    <LinearGradient key={i} colors={['#93ccc6', '#6cbdb5']} style={styles.containerCita}>
                        <Text key={i+"a"} style={styles.textTipoCita}>{infoApp.usuarioPaciente.citas[i].tipoCita}</Text>
                        <Text key={i+"b"} style={styles.textDataCita}>{infoApp.usuarioPaciente.citas[i].nombreProfesional}</Text>
                        <Text key={i+"c"} style={styles.textDataCita}>{infoApp.usuarioPaciente.citas[i].nombrePaciente}</Text>
                        <Text key={i+"d"} style={styles.textDataCita}>{infoApp.usuarioPaciente.citas[i].fecha} {infoApp.usuarioPaciente.citas[i].hora}</Text>
                    </LinearGradient>
                </View>
            )
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.textTitulo}>Tus próximas citas</Text>
                {elementos}
            </ScrollView>
        );   
    }
};

const styles = StyleSheet.create({
    container: {
        flex : 1, 
        backgroundColor : 'white', 
        padding : 30,
        alignItems : "center"
    },
    containerCita : {
        width : 300,
        height :125,
        borderRadius : 20,
        fontWeight : 'bold',
        padding : 5,
    },
    textTitulo : {
        fontSize : 25,
        paddingBottom : 10
    },
    textTipoCita: {
        fontWeight : 'bold',
        fontSize : 20
    },
    textDataCita : {
        fontSize : 15,
        paddingTop : 5
    }
});

export default CitaPaciente;
