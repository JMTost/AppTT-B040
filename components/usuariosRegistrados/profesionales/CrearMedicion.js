import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Pressable, Platform, Touchable, TouchableOpacity, Image, picker, SafeAreaView, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import infoApp from '../../../infoApp.json';

const CrearMedicion = ({navigation, route}) => {
    //!TERMINAR FUNCIONALIDAD Y PROBARLA 
    const {id} = route.params;
    //console.log("ID; ", id);
    //ESTADOS DE LOS DATOS OBTENIDOS DE LA PANTALLA ANTERIOR
    const [abdominal, setAdbominal] = useState('');
    const [axiliar, setAxiliar] = useState('');
    const [bicipital, setBicipital] = useState('');
    const [cintura, setCintura] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [muslo, setMuslo] = useState('');
    const [pantorrilla, setPantorrilla] = useState('');
    const [peso, setPeso] = useState('');
    const [subescapular, setSubescapular] = useState('');
    const [suprailiaco, setSuprailiaco] = useState('');
    const [toracica, setToracica] = useState('');
    const [triceps, setTriceps] = useState('');

    const handleCargaAPI = () => {
        let regexNumero = /^[+-]?\d+(\.\d+)?$/;
        if(abdominal === "" || regexNumero.test(abdominal) === false || axiliar === "" || regexNumero.test(axiliar) === false || bicipital === "" || regexNumero.test(bicipital) === false  || cintura === "" || regexNumero.test(cintura) === false || muslo === ""  || regexNumero.test(muslo) === false || pantorrilla === "" || regexNumero.test(pantorrilla) === false || peso === "" || regexNumero.test(peso) === false || subescapular === "" || regexNumero.test(subescapular) === false || suprailiaco === "" || regexNumero.test(suprailiaco) === false || toracica === "" || regexNumero.test(toracica) === false || triceps === "" || regexNumero.test(triceps) === false){
            Alert.alert("Error", "Comprueba los campos de entrada");
        }else{
            const data = {
                "id_profesional" : infoApp.usuarioProfesional.idUsuario,
                "id_paciente" : id,
                "peso": peso,
                "axiliar_media": axiliar,
                "abdominal": abdominal,
                "bicipital": bicipital,
                "muslo": muslo,
                "suprailiaco": suprailiaco,
                "triceps": triceps,
                "subescapular": subescapular,
                "toracica": toracica,
                "pantorrilla_medial": pantorrilla,
                "cintura": cintura,
                "fecha": fecha.getFullYear()+"/"+(fecha.getMonth()+1)+"/"+fecha.getDate()
            };
            const realizaCarga = async () => {
                const response = await fetch(`${infoApp.APIurl}/altaMedicion`, {
                    method : 'POST',
                    headers : {
                        "Content-Type": "application/json"
                    }, body : JSON.stringify(data),
                });
                if(response.ok){
                    const respuesta = await response.json();
                    Alert.alert("Exito", respuesta.mensaje, [
                        {
                            text : 'OK',
                            onPress : () => navigation.navigate('PrincipalProfesional')
                        }
                    ], {cancelable : false});
                }else{
                    const data = await response.json();
                    Alert.alert("Error", data);
                }
            };
            realizaCarga();
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Fecha:</Text>
                    <TextInput
                        style={styles.input}
                        value={fecha.getFullYear()+"/"+(fecha.getMonth()+1)+"/"+fecha.getDate()}
                        placeholder="fecha"
                        onChangeText={(text) => setAdbominal(text)}
                        keyboardType="numeric"
                        editable = {false}
                    />
                </View>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Abdominal:</Text>
                    <TextInput
                        style={styles.input}
                        value={abdominal}
                        placeholder="Abdominal"
                        onChangeText={(text) => setAdbominal(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Axiliar:</Text>
                    <TextInput
                        style={styles.input}
                        value={axiliar}
                        placeholder="Axiliar"
                        onChangeText={(text) => setAxiliar(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Bicipital:</Text>
                    <TextInput
                        style={styles.input}
                        value={bicipital}
                        placeholder="Bicipital"
                        onChangeText={(text) => setBicipital(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Cintura:</Text>
                    <TextInput
                        style={styles.input}
                        value={cintura}
                        placeholder="Cintura"
                        onChangeText={(text) => setCintura(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Muslo:</Text>
                    <TextInput
                        style={styles.input}
                        value={muslo}
                        placeholder="Muslo"
                        onChangeText={(text) => setMuslo(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Pantorrilla:</Text>
                    <TextInput
                        style={styles.input}
                        value={pantorrilla}
                        placeholder="Pantorrilla"
                        onChangeText={(text) => setPantorrilla(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Peso:</Text>
                    <TextInput
                        style={styles.input}
                        value={peso}
                        placeholder="Peso"
                        onChangeText={(text) => setPeso(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Subescapular:</Text>
                    <TextInput
                        style={styles.input}
                        value={subescapular}
                        placeholder="Subescapular"
                        onChangeText={(text) => setSubescapular(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Suprailiaco:</Text>
                    <TextInput
                        style={styles.input}
                        value={suprailiaco}
                        placeholder="Suprailiaco"
                        onChangeText={(text) => setSuprailiaco(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Toracica:</Text>
                    <TextInput
                        style={styles.input}
                        value={toracica}
                        placeholder="Toracica"
                        onChangeText={(text) => setToracica(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Triceps:</Text>
                    <TextInput
                        style={styles.input}
                        value={triceps}
                        placeholder="Triceps"
                        onChangeText={(text) => setTriceps(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.containerS}>
                        <TouchableOpacity style={styles.containerButton} onPress={handleCargaAPI}>
                            <LinearGradient
                                // Button Linear Gradient
                                colors={['#255000', '#588100']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.button}
                            >
                                <Text style={styles.text}>AGREGAR MEDICIÓN</Text>
                            </LinearGradient>
                        </TouchableOpacity>
    
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#93ccc6',
        alignContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        fontWeight: 'bold',
    },
    containerS: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 5,

    },
    containerFecha: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 5,

    },
    container2: {
        alignContent: "flex-end",
        padding: 5,

    },
    labelS: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 10,
        justifyContent: "flex-start",
        marginRight: 15,
    },
    labelR: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 40,
        justifyContent: "flex-start",
        marginLeft: 5,
        marginBottom: 5,
    },
    inputDireccion: {
        width: 360,
        height: 80,
        backgroundColor: 'white', // Color de fondo del campo de entrada
        paddingStart: 30,
        borderRadius: 30,
        marginTop: 10,
        marginRight: "auto",
    },
    input: {
        width: 260,
        height: 50,
        backgroundColor: 'white', // Color de fondo del campo de entrada
        paddingStart: 30,
        borderRadius: 30,
        marginTop: 10,
    },
    containerButton: {
        alignItems: 'center',
        width: 250,
        marginTop: 40,
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
    datePicker: {
        height: 120,
        width: 260,
        marginTop: -10,
    },
    inputDate: {
        width: 260,
        height: 50,
        backgroundColor: 'white', // Color de fondo del campo de entrada
        paddingStart: 30,
        borderRadius: 30,
        marginTop: 10,
    },
    button: {
        width: '80%',
        height: 35,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerButton: {
        paddingHorizontal: 20,
        width: 100,
    },


});

export default CrearMedicion;