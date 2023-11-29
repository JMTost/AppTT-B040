import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView , Image} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import infoApp from '../../../infoApp.json';

const CitasProfesional = () => {
    //console.log(infoApp.usuarioProfesional.citas)
    if(infoApp.usuarioProfesional.citas === "Informacíón no encontrada"){
        return (
            <View style={{flex : 1, alignContent : 'center', alignItems : 'center', justifyContent : 'center'}}>
                <Text style={{fontSize : 20, fontWeight : 'bold'}}>{infoApp.usuarioProfesional.citas}</Text>
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
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    container:{
        paddingBottom : 10,
        //flex: 1,
        backgroundColor: "white",
    },
    containerCita : {
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
    textNombreProfesional : {
        fontSize: 15,
        textAlign: "left",
        position: "absolute",
        marginRight: 160,
        top: 15,
        left: 60,
        zIndex: 10,
    },
    textNombrePaciente : {
        fontSize: 15,
        textAlign: "left",
        position: "absolute",
        marginRight: 160,
        top: 53,
        left: 60,
        zIndex: 10,
    },
    textDataCita : {
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
        right: 40,
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
});

export default CitasProfesional;