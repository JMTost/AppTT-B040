import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView, Pressable, Platform, Touchable, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonGradient from './ButtonRegister';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function RegistroPaciente() {

  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [edad, setEdad] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmacionContrasena, setConfirmacionContrasena] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [date, setDate] = useState (new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleRegistro = () => {
    // Aquí puedes agregar la lógica de registro de usuario
    // Puedes acceder a los datos ingresados en los estados correspondientes.
    console.log('Datos de registro:');
    console.log('Nombre:', nombre);
    console.log('Apellido Paterno:', apellidoPaterno);
    console.log('Apellido Materno:', apellidoMaterno);
    console.log('Edad:', edad);
    console.log('Fecha de Nacimiento:', fechaNacimiento);
    console.log('Número Telefónico:', telefono);
    console.log('Correo Electrónico:', email);
    console.log('Contraseña:', contrasena);
    console.log('Confirmación de Contraseña:', confirmacionContrasena);
    console.log('Selección:', selectedOption);
  };

  const toggleDatePicker = () =>{
    setShowPicker(!showPicker);
  };

  const onChange = ({type}, selectedDate) =>{
    if (type == "set"){
        const currentDate = selectedDate; 
        setDate (currentDate);
    }else {
        toggleDatePicker();
    }
  };

  const confirmDate = () => {
    setFechaNacimiento(formatDate(date));
    toggleDatePicker();
  }

  const formatDate = (rawDate) =>{
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    return `${day} / ${month} / ${year}`;

  }

  const data = [
    { label: 'Profesional 1', value: '1' },
    { label: 'Profesional 2', value: '2' },
  ];
     
  return (

    <ScrollView style={styles.container}>
        <View style={styles.content}>

        <Text style={styles.title}>REGISTRO</Text>
        <TextInput
            style={styles.input}
            placeholder="Nombre(s)"
            onChangeText={(text) => setNombre(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Apellido Paterno"
            onChangeText={(text) => setApellidoPaterno(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Apellido Materno"
            onChangeText={(text) => setApellidoMaterno(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Edad"
            keyboardType="numeric"
            onChangeText={(text) => setEdad(text)}
        />
       
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
                    placeholder="Fecha de Nacimiento"
                    value={fechaNacimiento}
                    onChangeText={setFechaNacimiento}
                    editable={false}
                    onPressIn={toggleDatePicker}
                />
            </Pressable>
        )}

        {showPicker && Platform.OS === "ios" && (
             <View
              style={{ flexDirection: "row", justifyContent: "space-around"}}>

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
       
        
        <TextInput
            style={styles.input}
            placeholder="Número Telefónico"
            keyboardType="phone-pad"
            onChangeText={(text) => setTelefono(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={(text) => setContrasena(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Confirmación de Contraseña"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmacionContrasena(text)}
        />

        <View style={styles.containerDrop}>
            <Text style={styles.text}>Seleccione el profesional de la salud al cual está inscrito:</Text>
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecciona una opción' : '...'}
            searchPlaceholder="Buscar..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.value);
                setIsFocus(false);
            }}
        />
        </View>
        <ButtonGradient></ButtonGradient>
        </View>
    </ScrollView>

    
  );
}


//--------- ESTILOS ----------//

const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },

  container: {
    flex: 1,
    backgroundColor: '#93ccc6',
  },

  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop:20,
  },

  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    marginTop: 10,
  },

  inputDate: {
    width: 330,
    height: 50,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    marginTop: 10,
  },

  picker: {
    width: 320,
    height: 50,
    marginBottom: 70,
    backgroundColor: 'white',
    marginTop: 10,
  },

  datePicker:{
    height: 120,
    width: '100%',
    marginTop: -10,
  },

  pickerButton:{
    paddingHorizontal: 20,
    width: 100,
  },

  button:{},

  containerDrop:{
    borderRadius:30,
    flex: 1,
    backgroundColor: '#93ccc6',
  },

  dropdown: {
    height: 50,
    width: 330,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginTop:10,
  },

  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
    borderRadius: 30,
  },

  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 30,
  },
  text:{
    marginTop:10,
    width: 320,
    marginLeft: 10,
  },

});
