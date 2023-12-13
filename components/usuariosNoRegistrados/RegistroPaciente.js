import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView, Pressable, Platform, Touchable, TouchableOpacity, Alert, Dimensions} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
//import ButtonGradient from './ButtonRegister';
import { LinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
    //IMPORT DE URL
import infoApp from '../../infoApp.json';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

export default function RegistroPaciente() {
  const navigation = useNavigation();

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
  
  //Estado de los datos obtenidos de la API
  const [apiData, setApiData] = useState(null);

  //VARIABLE PARA MANEJAR LA OBTENCIÓN DE LOS DATOS
    //SE OBTENDRAN A LOS PROFESIONALES QUE SE ENCUENTREN VALIDADOS
  useEffect( () => {
    const fetchInfoProfesionales = async () => {
      try {
        const response = await fetch(`${infoApp.APIurl}/obtenProfesionalesValidados`);
        const data_ = await response.json();
        setApiData(data_);
      } catch (error) {
        //Alert.alert('Error en obtención de datos de la API', error);
        console.error(error);
      }
    };
    fetchInfoProfesionales();
  }, []); 

  const toggleDatePicker = () =>{
    setShowPicker(!showPicker);
  };

  const onChange = ({type}, selectedDate) =>{
    let currentDate;
    if (type == "set"){
        currentDate = selectedDate; 
        setDate (currentDate);
        confirmDate();
        //console.log(date);
        toggleDatePicker();
    }else {
        toggleDatePicker();
    }
  };

  const confirmDate = () => {
    setFechaNacimiento(formatDate(date));
    //console.log(date);
    toggleDatePicker();
  }

  const formatDate = (rawDate) =>{
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    //return `${day}/${month}/${year}`;
    return `${year}/${month}/${day}`;

  }

  //COMPONENTES PARA EL HANDLER Y EL BOTON

  //BOTON PARA QUE EN LUGAR DE USARLO DE OTRO ARCHIVO, SE USE DIRECTO AQUI

  const ButtonGradient = () => {
    return(
      <TouchableOpacity style={styles.containerBUTTON} onPress={handleRegistro} >
          <LinearGradient
              // Button Linear Gradient
              colors={['#9d9f89', '#bcbfa3']}   
              start={{x:0, y:0}}
              end={{x:1, y:1}} 
              style={styles.button}      
          >           
              <Text style={styles.textBUTTON}>REGISTRARSE</Text>
          </LinearGradient>
      </TouchableOpacity>
    );
  }

  const handleAlertOkPress = () => {
    
    navigation.goBack();
  }

  const handleRegistro = () => {
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
    console.log('Selección:', value);
    */
    if(nombre === '' || apellidoPaterno === '' || apellidoMaterno === '' || edad === '' || fechaNacimiento === '' || telefono === '' || email === '' || contrasena === '' || confirmacionContrasena === '' || value === ''){
      Alert.alert("Error", "Rellene los campos faltantes");
    }else{
      //comprobamos que los tipos de datos y longitud se comprueben
      const regexCorreo = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";//const regexCorreo = "^(?!.{41})[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-zA-Z]{2,6}$";
      const regexFechaNacimiento = /^\d{4}[\/.]\d{1,2}[\/.]\d{1,2}$/; // caso para dd/mm/yyyy"/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/";
      if(nombre.length > 25 || apellidoPaterno.length > 25 || apellidoMaterno.length > 25 || (!email.match(regexCorreo) ||email.length > 40) || (edad < 0 && edad > 99) || !fechaNacimiento.match(regexFechaNacimiento) || (telefono.length < 0 || telefono.length > 20) || (contrasena.length < 0 || contrasena.length > 16) || (confirmacionContrasena.length < 0 || confirmacionContrasena.length > 16)){
        Alert.alert("Error", "Compruebe los campos de la entrada");
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
        console.log('Selección:', value);
      }else if(contrasena === confirmacionContrasena){
        //realizamos la carga a la API
        const dataPost = {
          nombre : nombre,
          apPaterno : apellidoPaterno,
          apMaterno : apellidoMaterno,
          email : email,
          edad : edad,
          fechaN : fechaNacimiento,
          numTel : telefono,
          pass : contrasena,
          idProfesional : value
        };
        const realizaCargaAPI = async () => {
          const response = await fetch(`${infoApp.APIurl}/altaPacientes`, {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
            }, body : JSON.stringify(dataPost),
          });
          if(response.ok){
            const data  = await response.json();
            Alert.alert("Exito", "Carga correcta de información", [
              {
                text : 'OK',
                onPress : handleAlertOkPress
              }
            ], {cancelable : false});
          }else{
            console.log("info : error", response.statusText);
            Alert.alert("Error", response.statusText);
          }
        };
        console.log(navigation.navigate("Inicio"))
        realizaCargaAPI();

      }else{
        Alert.alert("Error", "Compruebe los datos ingresados");
      }
    }
  };


  let data = [];
  if(apiData != null){
    for(let i = 0; i < apiData.data.length; i++){
      //console.log(i)
      data.push({
        label : apiData.data[i].nombreC,
        value : apiData.data[i].id
      });
    }

    return (

      <ScrollView style={styles.container}>
          <View style={styles.content}>

          <Text style={styles.title}>REGISTRO</Text>
          <TextInput
              style={styles.input}
              placeholder="Nombre(s)"
              onChangeText={(text) => setNombre(text)}
              maxLength={25}
          />
          <TextInput
              style={styles.input}
              placeholder="Apellido Paterno"
              onChangeText={(text) => setApellidoPaterno(text)}
              maxLength={25}
          />
          <TextInput
              style={styles.input}
              placeholder="Apellido Materno"
              onChangeText={(text) => setApellidoMaterno(text)}
              maxLength={25}
          />
          <TextInput
              style={styles.input}
              placeholder="Edad"
              keyboardType="numeric"
              onChangeText={(text) => setEdad(text)}
          />
        
          {
            showPicker && Platform.OS === 'android' &&(
            <View style={{ flexDirection : 'row', justifyContent : 'space-around' }}>
              <DateTimePicker mode='date' value={date} display='spinner' onChange={onChange}/>
            </View>
          )
          }
          {showPicker &&  Platform.OS === 'ios' &&(
            <DateTimePicker 
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                style={styles.datePicker}
                locale={'es'}>
            
            </DateTimePicker>
        )}
    {/*<DateTimePicker 
                        mode="date"
                        display="spinner"
                        value={date}
                        onChange={onChange}
                        style={styles.datePicker}
                        locale={'es'}>
                    
                    </DateTimePicker>
                */}
          
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
              placeholder="Número Telefónico"
              keyboardType="phone-pad"
              onChangeText={(text) => setTelefono(text)}
              maxLength={20}
          />
          <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              inputMode='email'
              textContentType='emailAddress'
              maxLength={40}
          />
          <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry={true}
              onChangeText={(text) => setContrasena(text)}
              maxLength={16}
          />
          <TextInput
              style={styles.input}
              placeholder="Confirmación de Contraseña"
              secureTextEntry={true}
              onChangeText={(text) => setConfirmacionContrasena(text)}
              maxLength={16}
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
                  //console.log(item)
                  setValue(item.value);
                  setIsFocus(false);
              }}
          />
          </View>
          <Text style={styles.passwordGuidelines}>
          <Ionicons name='information-circle' size={24} color="black" />
            Por favor, asegúrate de que tu contraseña tenga entre 8 y 16 caracteres de longitud.
            Para mejorar la seguridad te recomendamos incluir una combinación de letras mayúsculas,
            minúsculas, números y caracteres especiales.
          </Text>
          
          <ButtonGradient></ButtonGradient>
          </View>
      </ScrollView>

      
    );
    
  }else{
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Error</Text>
          <Text style={styles.text}>La API no esta en línea o compruebe su conexión a internet</Text>
        </View>
      </ScrollView>
    );
  }
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
    fontSize: width*0.10,//50,
    fontWeight: 'bold',
    marginBottom: height*0.03,//40,
    marginTop: height*0.04,//20,
  },

  input: {
    width: width*0.8,//'80%',
    height: height*0.06,// 50,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    marginTop: height*0.01,//10,
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
    //ESTILOS DEL BOTON
    containerBUTTON:{          
      alignItems: 'center', 
      width:250,
      marginTop: 30,
      margin: 60,
    },

    textBUTTON: {
      fontSize: 14,
      color: '#fff',  
      fontWeight: 'bold',
    },
    button:{
      width: '80%',
      height: 50,
      borderRadius: 25, 
      padding: 10,        
      alignItems: 'center', 
      justifyContent: 'center'
    },
  //
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
    fontSize: 14,
    color: 'gray',
    borderRadius: 30,
  },

  selectedTextStyle: {
    fontSize: 14,
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
  passwordGuidelines: {
    // Estilos para las recomendaciones sobre contraseñas
    marginTop: 15,
    width: width * 0.75,
    fontSize: 14,
    color: 'black',
    fontStyle: 'italic',
    textAlign: 'justify',
  },
});
