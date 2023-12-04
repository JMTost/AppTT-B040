import React, {useState, useEffect} from "react";
import infoApp from '../../../infoApp.json';
import { ScrollView, View, Text, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Pressable} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const EditarMedicionPaciente = ({navigation, route}) => {
    const {idPaciente, idProfesional, infoMedicion} = route.params;
    //console.log(idPaciente, idProfesional, infoMedicion);

    //ESTADOS DE LOS DATOS OBTENIDOS DE LA PANTALLA ANTERIOR
    const [abdominal, setAdbominal] = useState('');
    const [axiliar, setAxiliar] = useState('');
    const [bicipital, setBicipital] = useState('');
    const [cintura, setCintura] = useState('');
    const [fecha, setFecha] = useState('');
    const [muslo, setMuslo] = useState('');
    const [pantorrilla, setPantorrilla] = useState('');
    const [peso, setPeso] = useState('');
    const [subescapular, setSubescapular] = useState('');
    const [suprailiaco, setSuprailiaco] = useState('');
    const [toracica, setToracica] = useState('');
    const [triceps, setTriceps] = useState('');
    
    useEffect( () => {
        setAdbominal(infoMedicion.abdominal.toString());
        setAxiliar(infoMedicion.axiliar.toString());
        setBicipital(infoMedicion.bicipital.toString());
        setCintura(infoMedicion.cintura.toString());
        setFecha(infoMedicion.fecha.toString());
        setMuslo(infoMedicion.muslo.toString());
        setPantorrilla(infoMedicion.pantorrilla.toString());
        setPeso(infoMedicion.peso.toString());
        setSubescapular(infoMedicion.subescapular.toString());
        setSuprailiaco(infoMedicion.suprailiaco.toString());
        setToracica(infoMedicion.toracica.toString());
        setTriceps(infoMedicion.triceps.toString());
    }, []);

    const handleModifica = () => {
        //console.log("Modifcacion");
        let regexNumero = /^[+-]?\d+(\.\d+)?$/;
        if(regexNumero.test(abdominal) === false || regexNumero.test(axiliar) === false || regexNumero.test(bicipital) === false || regexNumero.test(cintura) === false || regexNumero.test(muslo) === false || regexNumero.test(pantorrilla) === false || regexNumero.test(peso) === false || regexNumero.test(subescapular) === false || regexNumero.test(suprailiaco) === false || regexNumero.test(toracica) === false || regexNumero.test(triceps) === false){
            Alert.alert("Error", "Verifica los datos solicitados");
        }else{
            let fechaPartes = fecha.split('-');
            const data = {
                "id_profesional" : idProfesional,
                "id_paciente" : idPaciente,
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
                "fecha": fechaPartes[2].toString()+"-"+fechaPartes[1].toString()+"-"+fechaPartes[0].toString()
            }
            //console.log(data);
            const realizaModificacionAPI = async () => {
                //console.log("Entramos")
                const response = await fetch(`${infoApp.APIurl}/actualizaMedicion`,{
                    method : 'PUT',
                    headers : {
                        'Content-Type' : 'application/json',
                    }, body : JSON.stringify(data),
                });
                //console.log("response: ", response);
                if(response.ok){
                    const data = await response.text();
                    Alert.alert("Exito", data, [
                        {
                          text : 'OK',
                          onPress : () => navigation.navigate('PrincipalProfesional')
                        }
                      ], {cancelable : false});
                }else{
                    let mensaje = await response.json();
                    console.log("info : error", mensaje);
                    Alert.alert("Error", response.statusText);
                }
            };
            realizaModificacionAPI();
        }
    }

    const handleElimina = () => {
        Alert.alert("¿Seguro que desea eliminar la medición?", "Seleccione la opción",[
            {
                text : 'OK',
                onPress : () => {realizaEliminacion()}
            }, {
                text : "CANCELAR"
            }
        ] );
        const realizaEliminacion = async () => {
            let fechaPartes = fecha.split('-');
            const data = {
                "id" : idPaciente,
                "fecha": fechaPartes[2].toString()+"-"+fechaPartes[1].toString()+"-"+fechaPartes[0].toString()
            };
            const response = await fetch(`${infoApp.APIurl}/eliminarMedicion`, {
                method : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json',
                }, body : JSON.stringify(data),
            });
            if(response.ok){
                const data = await response.json();
                Alert.alert("Exito", data.mensaje, [
                    {
                        text : 'OK', 
                        onPress : () => navigation.navigate('PrincipalProfesional')
                    }
                ], {cancelable : false});
            }
        };
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                <View style={styles.containerS}>
                    <Text style={styles.labelS}>Fecha:</Text>
                    <TextInput
                        style={styles.input}
                        value={fecha}
                        placeholder="Abdominal"
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
                            <TouchableOpacity style={styles.containerButton} onPress={handleModifica}>
                                <LinearGradient
                                    // Button Linear Gradient
                                    colors={['#a87b05', '#efb810']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.button}
                                >
                                    <Text style={styles.text}>MODIFICAR</Text>
                                </LinearGradient>
                            </TouchableOpacity>
        
                            <TouchableOpacity style={styles.containerButton} onPress={handleElimina}>
                                <LinearGradient
                                    // Button Linear Gradient
                                    colors={['#670010', '#960018']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.button}
                                >
                                    <Text style={styles.text}>ELIMINAR</Text>
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
        width: 200,
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


export default EditarMedicionPaciente;