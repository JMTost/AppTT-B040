import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import infoApp from '../../../infoApp.json';

const DietaPaciente = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>DIETA PACIENTE</Text>-
            <Text>{infoApp.usuarioPaciente.dieta[0]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    text: {
      fontSize: 20,
    },
});

export default DietaPaciente;