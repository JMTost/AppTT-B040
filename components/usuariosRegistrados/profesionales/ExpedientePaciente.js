import React from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View } from "react-native";

const ExpedientePaciente = ({route, navigation}) => {
    //!agregar la funcionalidad de los expedientes, lo de los formularios para crearlos
    const {id} = route.params;
    console.log(id);
    return (
        <Text>Hols</Text>
    );
};

export default ExpedientePaciente;