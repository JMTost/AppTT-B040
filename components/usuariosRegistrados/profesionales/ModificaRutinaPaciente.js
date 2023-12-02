import React, {useState, useEffect} from "react";
import infoApp from '../../../infoApp.json';
import { ScrollView, View, Text, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Pressable} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';


const ModificaRutinaPaciente = ({navigation, route}) => {
    //!debemos obtener el id del paciente, del profesional
    const {idPaciente, idProfesional, idRutina, dataRutina} = route.params;
    /*
    console.log(idPaciente, idProfesional, idRutina)
    console.log(dataRutina);
    */
    //ESTADO DE LOS DATOS OBTENIDOS DE LA API
    const [apiMusculos, setApiMusculos] = useState(null);
    const [apiEjercicios, setApiEjercicios] = useState(null);
    const [apiVideos, setApiVideos] = useState(null);

    const [selectedValueMusculo, setSelectedValueMusculo] = useState(null);
    const [selectedValueEjercicio, setSelectedValueEjercicio] = useState(null);
    const [selectedValueVideo, setSelectedValueVideo] = useState(null);
    const [textRecomendaciones, setTextRecomendaciones] = useState('');
    const [repeticiones, setRepeticiones] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [inicioEjercicio, setInicioEjercicio] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker2, setShowPicker2] = useState(false);
    const [finEjercicio, setfinEjercicio] = useState('');
    const [date2, setDate2] = useState(new Date());
    const musculos = [];
    useEffect( () => {
        const fetchMusculos = async () => {
            try {
                const response = await fetch(`${infoApp.APIurl}/obtenMusculos`);
                const data = await response.json();
                setApiMusculos(data);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchEjercicios = async () => {
            try {
                const response = await fetch(`${infoApp.APIurl}/obtenEjercicios`);
                const data = await response.json();
                setApiEjercicios(data);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchVideos = async () => {
            try {
                const response = await fetch(`${infoApp.APIurl}/obtenListaVideoProfesional/${idProfesional}`);
                const data = await response.json();
                setApiVideos(data);
            } catch (error) {
                console.log(error);
            }
        };
        setRepeticiones(dataRutina.cantidad);
        
        setfinEjercicio(dataRutina.fechaFin);
        setInicioEjercicio(dataRutina.fechaI);
        
        let [diaI, mesI, anoI] = inicioEjercicio.split('-');
        const fechaI = new Date(+anoI, +mesI-1, +diaI);
        let [diaF, mesF, anoF] = finEjercicio.split('-');
        const fechaF = new Date(+anoF, +mesF-1, +diaF);
        //console.log(date, fechaI)
        //setDate(new Date(+anoI, +mesI-1, +diaI));
        //setDate2(new Date(+anoF, +mesF-1, +diaF));
        //console.log("date", date);
        /*
        setfinEjercicio(fechaF);
        setInicioEjercicio(fechaI);
        */
        
        setSelectedValueEjercicio(dataRutina.nombreEjercicio);
        setSelectedValueMusculo(dataRutina.musculo);
        setSelectedValueVideo(dataRutina.nombreVideo);
        fetchMusculos();
        fetchEjercicios();
        fetchVideos();
    }, []);

    //!

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            confirmDate();
        } else {
            toggleDatePicker();
        }
    };

    const confirmDate = () => {
        setInicioEjercicio(formatDate(date));
        toggleDatePicker();
    }
    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${year}/${month}/${day}`;

    }

    const toggleDatePicker2 = () => {
        setShowPicker2(!showPicker2);
    };

    const onChange2 = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate2(currentDate);
            confirmDate2();
        } else {
            toggleDatePicker2();
        }
    };

    const confirmDate2 = () => {
        setfinEjercicio(formatDate(date2));
        toggleDatePicker2();
    }
    //!

    const handleElimina = () => {
        const realizaEliminacion = async () => {
            const response = await fetch(`${infoApp.APIurl}/borra/EjercicioRutina`, {
                method : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json',
                }, body : JSON.stringify({idRutina : idRutina}),
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
        realizaEliminacion();
    };


    const handleModifica = () => {
        //console.log(idRutina);
        if(repeticiones === "" || repeticiones.length > 20){
            Alert.alert("Error", "Verifica los datos solicitados");
            //console.log(regexFechaNacimiento.match(inicioEjercicio) ,  regexFechaNacimiento.match(finEjercicio),  repeticiones === "", repeticiones.length > 20)
        }else{
            let ejercicios = [], videos = [];
            for(let i = 0; i < apiEjercicios.data.length; i++){
                ejercicios.push({
                    label : apiEjercicios.data[i].descripcion,
                    value : apiEjercicios.data[i].id
                });
            }
            videos.push({label : "Sin video", value : 0});
            for(let i = 0; i < apiVideos.data.length; i++){
                videos.push({
                    label : apiVideos.data[i].nombre,
                    value : apiVideos.data[i].id_video
                });
            }

            const objetoSeleccionadoEjercicios = ejercicios.find(item => item.value === selectedValueEjercicio || item.label === selectedValueEjercicio);
            const objetoSeleccionadoVideo = videos.find(item => item.value === selectedValueVideo || item.label === selectedValueVideo);

            const data = {
                "id_ER" : idRutina,
                "id_profesional" : idProfesional,
                "id_paciente" : idPaciente,
                "cantidad" : repeticiones,
                "id_video" : objetoSeleccionadoVideo.value,
                "id_ejercicio" : objetoSeleccionadoEjercicios.value,
                "fechaInicio" : inicioEjercicio.toString(),
                "fechaFin" : finEjercicio.toString()
            };
            const realizaModificacionAPI = async () => {
                const response = await fetch(`${infoApp.APIurl}/actualizaRutinaEjercicio`,{
                    method : 'PUT',
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
                }else{
                    let mensaje = await response.json();
                    console.log("info : error", mensaje);
                    Alert.alert("Error", response.statusText);
                }
            };
            realizaModificacionAPI();
        }
        
    };

    if(apiMusculos != null  && apiEjercicios != null  && apiVideos != null){
        
        let musculos = [], ejercicios=[], videos=[];
        //console.log("MUSCULOS: ", apiMusculos);
        for(let i = 0; i < apiMusculos.data.length; i++){
            musculos.push({
                label : apiMusculos.data[i].descripcion,
                value : apiMusculos.data[i].id
            });
        }
        //console.log("EJERCICIOS: ", apiEjercicios);
        for(let i = 0; i < apiEjercicios.data.length; i++){
            ejercicios.push({
                label : apiEjercicios.data[i].descripcion,
                value : apiEjercicios.data[i].id
            });
        }
        //console.log("VIDEOS: ", apiVideos);
        videos.push({label : "Sin video", value : 0});
        for(let i = 0; i < apiVideos.data.length; i++){
            videos.push({
                label : apiVideos.data[i].nombre,
                value : apiVideos.data[i].id_video
            });
        }

        const objetoSeleccionado = musculos.find(item => item.value === selectedValueMusculo || item.label === selectedValueMusculo);
        const objetoSeleccionadoEjercicios = ejercicios.find(item => item.value === selectedValueEjercicio || item.label === selectedValueEjercicio);
        const objetoSeleccionadoVideo = videos.find(item => item.value === selectedValueVideo || item.label === selectedValueVideo);

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.containerS}>
                        <Text style={styles.labelS}>Musculo:         </Text>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedValueMusculo(value)}
                            items={musculos}
                            value={selectedValueMusculo}
                            style={pickerSelectStyles}
                        />
                    </View>
    
                    <View style={styles.containerS}>
                        <Text style={styles.labelS}>Ejercicio:          </Text>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedValueEjercicio(value)}
                            items={ejercicios}
                            value={selectedValueEjercicio}
                            style={pickerSelectStyles}
                        />
                    </View>
    
                    <View style={styles.containerS}>
                        <Text style={styles.labelS}>Repeticiones:</Text>
                        <TextInput
                            style={styles.input}
                            value={repeticiones}
                            placeholder="Repeticiones"
                            onChangeText={(text) => setRepeticiones(text)}
                        />
                    </View>
    
                    <View style={styles.containerS}>
    
                        <Text style={styles.labelS}>Inicio:              </Text>
                        <View style={styles.containerFecha}>
                            {showPicker && (
                                <DateTimePicker
                                    mode="date"
                                    display="spinner"
                                    value={date}
                                    onChange={onChange}
                                    style={styles.datePicker}
                                    locale={'es'}>
    
                                </DateTimePicker>
                            )}
    
    
                            {!showPicker && (
                                <Pressable onPress={toggleDatePicker}>
                                    <TextInput
                                        style={styles.inputDate}
                                        placeholder="Fecha de Inicio de Ejercicio"
                                        value={inicioEjercicio}
                                        onChangeText={setInicioEjercicio}
                                        editable={false}
                                        onPressIn={toggleDatePicker}
                                    />
                                </Pressable>
                            )}
    
                            {showPicker && Platform.OS === "ios" && (
                                <View
                                    style={{ flexDirection: "row", justifyContent: "space-around" }}>
    
                                    <TouchableOpacity style={[styles.button, styles.pickerButton]}
                                        onPress={toggleDatePicker}>
                                        <Text>Cancelar</Text>
                                    </TouchableOpacity>
    
                                    <TouchableOpacity style={[styles.button, styles.pickerButton]}
                                        onPress={confirmDate}>
                                        <Text>Confirmar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
    
                    </View>
    
                    <View style={styles.containerS}>
    
                        <Text style={styles.labelS}>Fin:                  </Text>
    
                        <View style={styles.containerFecha}>
                            {showPicker2 && (
                                <DateTimePicker
                                    mode="date"
                                    display="spinner"
                                    value={date2}
                                    onChange={onChange2}
                                    style={styles.datePicker}
                                    locale={'es'}>
                                </DateTimePicker>
                            )}
    
    
                            {!showPicker2 && (
                                <Pressable onPress={toggleDatePicker2}>
                                    <TextInput
                                        style={styles.inputDate}
                                        placeholder="Fecha de Fin de Ejercicio"
                                        value={finEjercicio}
                                        onChangeText={setfinEjercicio}
                                        editable={false}
                                        onPressIn={toggleDatePicker2}
                                    />
                                </Pressable>
                            )}
    
                            {showPicker2 && Platform.OS === "ios" && (
                                <View
                                    style={{ flexDirection: "row", justifyContent: "space-around" }}>
    
                                    <TouchableOpacity style={[styles.button, styles.pickerButton]}
                                        onPress={toggleDatePicker2}>
                                        <Text>Cancelar</Text>
                                    </TouchableOpacity>
    
                                    <TouchableOpacity style={[styles.button, styles.pickerButton]}
                                        onPress={confirmDate2}>
                                        <Text>Confirmar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
    
                    </View>
    
    
    
                    <View style={styles.containerS}>
                        <Text style={styles.labelS}>Video:              </Text>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedValueVideo(value)}
                            items={videos}
                            value={selectedValueVideo}
                            style={pickerSelectStyles}
                        />
                    </View>
    
                    {
                        /*
                        <View style={styles.container2}>
                        <Text style={styles.labelR}>Recomendaciones:                </Text>
                        <TextInput
                            style={styles.inputDireccion}
                            keyboardDismissMode="on-drag"
                            numberOfLines={4} // Puedes ajustar la cantidad de líneas visibles
                            value={textRecomendaciones}
                            onChangeText={(newText) => setTextRecomendaciones(newText)}
                            placeholder="Escribe aquí tus recomendaciones..."
                        />
    
                    </View>
                    */
                    }
    
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
    
            </SafeAreaView>
        ); 
        
    }else{
        return (
            <ScrollView >
              <View style={styles.content}>
                <Text style={styles.title}>Error</Text>
                <Text style={styles.text}>La API no esta en línea o compruebe su conexión a internet</Text>
              </View>
            </ScrollView>
          );
    }
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignContent: "flex-end",
        width: 260,
        height: 50,
        backgroundColor: 'white', // Color de fondo del campo de entrada
        paddingStart: 30,
        borderRadius: 30,
        marginTop: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
    },
});

export default ModificaRutinaPaciente;