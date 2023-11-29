import React from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View, TouchableOpacity,Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";

const RutinaPaciente = ({navigation, route}) => {
    //!Hacer la visualización de los datos de la rutina del paciente
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