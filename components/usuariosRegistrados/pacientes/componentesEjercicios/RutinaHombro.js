import React, { useState } from "react";
import { StyleSheet, Text, View,Button, Image, TouchableOpacity, ScrollView} from "react-native";
//import { ScrollView } from "react-native-gesture-handler";

export default function RutinaHombro({navigation, route}) {
    return (
        <ScrollView style={styles.container}>
           <View style={styles.imageContainer}>
                <View style={{alignItems: "center", justifyContent: "center" }}>
                    <Image
                    source={require("../../../../Imagenes/pressMancuernas.jpg")}
                    opacity={.3}
                    style={styles.excerciseImage}                    
                    />
                <Text style={styles.excerciseTitle}>{route.params.nombreEjercicio}</Text>
                <Text style={styles.excerciseDescription}>Cantidad a realizar : {route.params.cantidad} Musculo : {route.params.musculo} {route.params.fechaInicio} al {route.params.fechaFin}</Text>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('VideoEjercicio', {id : route.params.idVideo})}>
                    <Image
                        source={require("../../../../Imagenes/video.png")}
                        style={styles.icon}
                    />    
                </TouchableOpacity>
                        
               </View>
            </View>
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 30,
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
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 15,
        position: "absolute",
        top: "auto",
        right: 10,
        zIndex: 10,
    },
});