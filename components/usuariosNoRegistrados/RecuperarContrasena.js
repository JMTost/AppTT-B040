import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView, Pressable, Platform, Touchable, TouchableOpacity, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
//import ButtonGradient from './ButtonRecoveryPass';
import { LinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import infoApp from '../../infoApp.json';
import { useNavigation } from '@react-navigation/native';

export default function RecuperarContrasena() {

  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState (new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleRecuperaContra = () => {
    // Aquí puedes agregar la lógica de registro de usuario
    // Puedes acceder a los datos ingresados en los estados correspondientes.
    /*
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
    */
   if(nombre === '' || apellidoPaterno === '' || apellidoMaterno === '' || fechaNacimiento === '' || email === '' || value === null){
    Alert.alert("Error", "Rellene los campos faltantes");
   }else{
    //comprobamos que los tipos de datos y longitud se comprueben
    const regexCorreo = "^(?!.{41})[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-zA-Z]{2,6}$";
      const regexFechaNacimiento = /^\d{4}[\-.]\d{1,2}[\-.]\d{1,2}$/; // caso para dd/mm/yyyy"/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/";
      if(nombre.length > 25 || apellidoPaterno.length > 25 || apellidoMaterno.length > 25 || (!email.match(regexCorreo) ||email.length > 40) || !fechaNacimiento.match(regexFechaNacimiento) ){
        Alert.alert("Error", "Compruebe los campos de la entrada");
        console.log('Datos de registro:');
        console.log('Nombre:', nombre);
        console.log('Apellido Paterno:', apellidoPaterno);
        console.log('Apellido Materno:', apellidoMaterno);
        console.log('Fecha de Nacimiento:', fechaNacimiento);
        //console.log('Número Telefónico:', telefono);
        console.log('Correo Electrónico:', email);
        console.log('Selección:', value);
      }else{
        const dataPost = {
          nombre : nombre.trimEnd(),
          apPaterno : apellidoPaterno.trimEnd(),
          apMaterno : apellidoMaterno.trimEnd(),
          correo : email.trimEnd(),
          fechaN : fechaNacimiento,
          tipoUsuario : value
        };

        const realizaCargaAPI = async () => {
          const response = await fetch(`${infoApp.APIurl}/recuperaContra`, {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
            }, body : JSON.stringify(dataPost),
          });
          if(response.ok){
            Alert.alert("Exito de actualización", "Verifique el correo proporcionado para confirmar la operación.", 
            [{
              text : 'OK',
              onPress : handleAlertOkPress
            }], {cancelable : false}
            );
          }else{
            const data = await response.json();
            console.log("info, error : ", data.mensaje);
            Alert.alert("Error", data.mensaje);
          }
        };
        realizaCargaAPI();

      }
   }
  };

  const toggleDatePicker = () =>{
    setShowPicker(!showPicker);
  };

  const onChange = ({type}, selectedDate) =>{
    if (type == "set"){
        let currentDate = selectedDate; 
        setDate (currentDate);
        confirmDate();
        toggleDatePicker();
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

    return `${year}-${month}-${day}`;

  }

   //COMPONENTES PARA EL HANDLER Y EL BOTON

  //BOTON PARA QUE EN LUGAR DE USARLO DE OTRO ARCHIVO, SE USE DIRECTO AQUI


    const ButtonGradient = () => {
      return(
        <TouchableOpacity style={styles.containerBUTTON} onPress={handleRecuperaContra} >
            <LinearGradient
                // Button Linear Gradient
                colors={['#9d9f89', '#bcbfa3']}   
                start={{x:0, y:0}}
                end={{x:1, y:1}} 
                style={styles.button}      
            >           
                <Text style={styles.textBUTTON}>RECUPERAR CONTRASEÑA</Text>
            </LinearGradient>
        </TouchableOpacity>
      );
    }


  const handleAlertOkPress = () => {
    navigation.goBack();
  }

  const data = [
    {label : "Profesional de la salud", value : 1},
    {label : "Paciente", value : 2},
  ];
     
  return (

    <ScrollView style={styles.container}>
        <View style={styles.content}>

        <Image
          source={require('../../Imagenes/iconoCandado.png')}
          style={styles.centeredImage}
        />

        <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
        <Text style={styles.subtitle}>Es necesario que ingreses el correo con el que te registraste para enviar tu contraseña</Text>
        <TextInput
            style={styles.input}
            placeholder="Nombre(s)"
            onChangeText={(text) => setNombre(text)}
            placeholderTextColor="#b5b5b5"
            maxLength={25}
        />
        <TextInput
            style={styles.input}
            placeholder="Apellido Paterno"
            onChangeText={(text) => setApellidoPaterno(text)}
            placeholderTextColor="#b5b5b5"
            maxLength={25}
        />
        <TextInput
            style={styles.input}
            placeholder="Apellido Materno"
            onChangeText={(text) => setApellidoMaterno(text)}
            placeholderTextColor="#b5b5b5"
            maxLength={25}
        />
                {
                  //CASO PARA ANDROID 
                }
          {
            showPicker && Platform.OS === 'android' &&(
            <View style={{ flexDirection : 'row', justifyContent : 'space-around' }}>
              <DateTimePicker mode='date' value={date} display='spinner' onChange={onChange}/>
            </View>
          )
          }
                {
                    //CASO PARA IOS
                }
        {showPicker && Platform.OS === 'ios' &&(
            <DateTimePicker 
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                style={styles.datePicker}
                locale={'es'}>
            
            </DateTimePicker>
        )}
        {
            !showPicker && (
              <Pressable onPress={toggleDatePicker}>
                  <TextInput
                      style={styles.inputDate}
                      placeholder="Fecha de Nacimiento"
                      value={fechaNacimiento}
                      onChangeText={setFechaNacimiento}
                      editable={false}
                      onPressIn={toggleDatePicker}
                      placeholderTextColor={'#b5b5b5'}
                  />
                  
              </Pressable>
          )
          }

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
            placeholder="Correo Electrónico"
            placeholderTextColor="#b5b5b5"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            inputMode='email'
            textContentType='emailAddress'
            maxLength={40}
        />

        {
          //ESTE FORMULARIO DEBE DE OBTENER EL TIPO DE USUARIO QUE ES
        }

        
        <View style={styles.containerDrop}>
        <Text style={{paddingTop : 10}}>Seleccione el tipo de usuario:</Text>
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
                    //console.log(item)
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
        fontWeight: 'bold'
    },

  container: {
    flex: 1,
    backgroundColor: '#568F7C',
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop:20,
    marginBottom:10,
  },
  
  subtitle:{
    fontSize: 17, 
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,

  },

  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: '#326D6C',
    color : 'white'
  },

  inputDate: {
    width: 330,
    height: 50,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: '#326D6C',
    color : 'white',
    
  },

  picker: {
    width: 320,
    height: 50,
    marginBottom: 70,
    backgroundColor: '#326D6C',
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

  button:{
    width: '80%',
    height: 50,
    borderRadius: 25, 
    padding: 10,        
    alignItems: 'center', 
    justifyContent: 'center'
  },

  containerDrop:{
    borderRadius:30,
    flex: 1,
    backgroundColor: '#568F7C',
  },

  dropdown: {
    height: 50,
    width: 330,
    backgroundColor: '#326D6C', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginTop:10,
  },

  placeholderStyle: {
    fontSize: 16,
    color: '#b5b5b5',
    borderRadius: 30,
  },

  selectedTextStyle: {
    fontSize: 16,
    color : 'white'
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
  centeredImage: {
    width: 150, 
    height: 150, 
    marginTop: 30,
  },
  //ESTILOS DEL BOTON
  containerBUTTON:{          
    alignItems: 'center', 
    width:250,
    marginTop: 60,
    margin: 60,
  },

  textBUTTON: {
    fontSize: 14,
    color: '#fff',  
    fontWeight: 'bold',
  },
  
//
});
