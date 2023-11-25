import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const CitaPaciente = () => {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>CITA PACIENTE</Text>
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

export default CitaPaciente;
