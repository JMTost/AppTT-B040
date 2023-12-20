import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Pressable, Platform, Touchable, TouchableOpacity, Image, picker, SafeAreaView, Alert, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import infoApp from '../../../infoApp.json';

const {width, height} = Dimensions.get('window');

const CrearCita = ({navigation, route}) => {
    const {id} = route.params;
    //console.log(infoApp.usuarioProfesional.idUsuario);
    //const id = infoApp.usuarioProfesional.idUsuario;

    const [DataApi, setDataApi] = useState(null);
    const [DataApiTiposCita, setDataApiTiposCita] = useState(null);
    
    const [selectedValueTipoCita, setSelectedValueTipoCita] = useState(null);
    const [selectedValuePaciente, setSelectedValuePaciente] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [fecha, setFecha] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPickerTime, setShowPickerTime] = useState(false);
    const [horaCita, setHoraCita] = useState('');
    const [hora, setHora] = useState(new Date());


    //obtener tipos de cita, pacientes
    
    useEffect( () => {
        const fetchObtenPacientes = async () => {
            try {
                const respuesta = await fetch(`${infoApp.APIurl}/obtenPacientesProfesional/${id}`);
                if(respuesta.ok){
                    const json = await respuesta.json();
                    setDataApi(json.data);
                }else if(respuesta.status === 404){
                    const json = await respuesta.json();
                    setDataApi(json);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchObtenTiposCitas = async () => {
            try {
                const respuesta = await fetch(`${infoApp.APIurl}/obtenTiposCitas/`);
                if(respuesta.ok){
                    const json = await respuesta.json();
                    setDataApiTiposCita(json.data);
                }else if(respuesta.status === 404){
                    const json = await respuesta.json();
                    setDataApiTiposCita(json);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchObtenPacientes();
        fetchObtenTiposCitas();
    }, []);

    



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
        setFecha(formatDate(date));
        toggleDatePicker();
    }
    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${year}/${month}/${day}`;

    }

    const toggleTimePicker = () => {
        setShowPickerTime(!showPickerTime);
    };
    const onChangeTime = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setHora(currentDate);
             confirmTime();
        } else {
            toggleTimePicker();
        }
    };

    const confirmTime = () => {
        setHoraCita(hora.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
        toggleTimePicker();
    }

    function convertirFormato24Horas(horaEntrada) {
        const [hora, minutos, periodo] = horaEntrada.split(/:|\s/);
        let horaNumero = parseInt(hora);
        if (periodo.toLowerCase() === 'p.' && horaNumero !== 12) {
          horaNumero += 12;
        } else if (periodo.toLowerCase() === 'a.' && horaNumero === 12) {
          horaNumero = 0;
        }
        const hora24 = horaNumero.toString().padStart(2, '0');
        const minutos24 = minutos.padStart(2, '0');
        return `${hora24}:${minutos24}`;
      }      

    const handleCreacion = () => {
        if(selectedValuePaciente === null || selectedValueTipoCita === null || fecha === "" || horaCita === ""){
            Alert.alert("Error", "Comprueba los campos de entrada");
        }else{
            const horaFormato = convertirFormato24Horas(horaCita.toString());
            const data = {
                "idTipoCita":selectedValueTipoCita,
                "idProfesional":id,
                "idPaciente":selectedValuePaciente,
                "fechaHora": fecha+" "+horaFormato
            };
            const realizaCarga = async () => {
                const response = await fetch(`${infoApp.APIurl}/creacionCitas`, {
                    method : 'POST',
                    headers : {
                        "Content-Type": "application/json"
                    }, body : JSON.stringify(data),
                });
                if(response.ok){
                    const data_ = await response.text();
                    Alert.alert("Exito", data_,  [
                        {
                            text : 'OK',
                            onPress : () => navigation.navigate('PrincipalProfesional')
                        }
                    ], {cancelable : false});
                }
            };
            realizaCarga();
        }
        //console.log("dato: ", selectedValuePaciente)
        //console.log("Dato: ", selectedValueTipoCita);
        //console.log("Dato: ", fecha)
        //console.log(horaCita);
        
        
    };
    
    
    if(DataApi != null && DataApiTiposCita != null){
        const pacientes = [], tiposCita = [];
        for(let i = 0; i < DataApi.length; i++){
            pacientes.push({
                label : DataApi[i].nombreC,
                value : DataApi[i].id
            });
        }
        for(let i = 0; i < DataApiTiposCita.length; i++){
            tiposCita.push({
                label : DataApiTiposCita[i].descripcion,
                value : DataApiTiposCita[i].id
            });
        }
        if(DataApi.hasOwnProperty('mensaje')){//caso de no obtener los pacientes
            return(
                <View style={styles.container}>
                    <Text>{dataApi.mensaje}</Text>
                </View>
            );
        }else{
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.content}>
                        <Image
                            source={require('../../../Imagenes/cita.png')}
                            style={styles.centeredImage}
                        />
                        <View style={styles.containerS}>
                            <Text style={styles.labelS}>Tipo de cita:    </Text>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedValueTipoCita(value)}
                                items={tiposCita}
                                value={selectedValueTipoCita}
                                style={pickerSelectStyles}
                                placeholder={{label : "Selecciona una opción", value : null}}
                            useNativeAndroidPickerStyle = {false}
                            />
                        </View>
        
                        <View style={styles.containerS}>
                            <Text style={styles.labelS}>Paciente:          </Text>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedValuePaciente(value)}
                                items={pacientes}
                                value={selectedValuePaciente}
                                style={pickerSelectStyles}
                                placeholder={{label : "Selecciona una opción", value : null}}
                            useNativeAndroidPickerStyle = {false}
                            />
                        </View>
        
                        <View style={styles.containerS}>
        
                            <Text style={styles.labelS}>Fecha:              </Text>
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
                                            placeholder="Fecha de Cita"
                                            value={fecha}
                                            onChangeText={setFecha}
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
        
                            <Text style={styles.labelS}>Hora:              </Text>
                            <View style={styles.containerFecha}>
                                {showPickerTime && (
                                    <DateTimePicker
                                        mode="time"
                                        display="spinner"
                                        value={hora}
                                        onChange={onChangeTime}
                                        style={styles.datePicker}
                                        locale={'es'}>
        
                                    </DateTimePicker>
                                )}
        
        
                                {!showPickerTime && (
                                    <Pressable onPress={toggleTimePicker}>
                                        <TextInput
                                            style={styles.inputDate}
                                            placeholder="Hora de la Cita"
                                            value={horaCita}
                                            onChangeText={setHoraCita}
                                            editable={false}
                                            onPressIn={toggleTimePicker}
                                        />
                                    </Pressable>
                                )}
        
                                {showPickerTime && Platform.OS === "ios" && (
                                    <View
                                        style={{ flexDirection: "row", justifyContent: "space-around" }}>
        
                                        <TouchableOpacity style={[styles.button, styles.pickerButton]}
                                            onPress={toggleTimePicker}>
                                            <Text>Cancelar</Text>
                                        </TouchableOpacity>
        
                                        <TouchableOpacity style={[styles.button, styles.pickerButton]}
                                            onPress={confirmTime}>
                                            <Text>Confirmar</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
        
                        </View>
        
        
                        <View style={styles.containerS}>
                            <TouchableOpacity style={styles.containerButton} onPress={handleCreacion}>
                                <LinearGradient
                                    // Button Linear Gradient
                                    colors={['#9b3c00', '#ffa07a']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.button}
                                >
                                    <Text style={styles.text}>AGENDAR CITA</Text>
                                </LinearGradient>
                            </TouchableOpacity>
        
                        </View>
        
        
                    </View>
        
                </SafeAreaView>
            );
        }
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
        width: 230,
        marginTop: 70,
        marginLeft: "auto",
        marginRight: "auto",
    },
    text: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
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
        height: 50,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerButton: {
        paddingHorizontal: 20,
        width: 100,
    },
    centeredImage: {
        width: 200, 
        height: 200, 
        top: -50
      },


});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignContent: "flex-end",
        width: width * 0.63,//width: 260,
        height: 50,
        backgroundColor: 'white', // Color de fondo del campo de entrada
        paddingStart: 30,
        borderRadius: 30,
        marginTop: 10,
    },
    inputAndroid: {
        fontSize: width * 0.03,
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 30,
        color: 'black',
        backgroundColor : 'white',
        width: width * 0.63,
        height: 50,
        alignContent: "stretch",

       /*
       paddingHorizontal : 10,
       paddingVertical : 8,
       borderWidth : 1,
       borderColor : 'gray',
       borderRadius : 8,
       color : 'black',
       paddingRight : 30
       */
    },
});

export default CrearCita;