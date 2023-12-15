import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView, Pressable, Platform, Touchable, TouchableOpacity, Alert, Dimensions, Modal} from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  
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
    if(nombre === '' || apellidoPaterno === '' || apellidoMaterno === '' || edad === '' || fechaNacimiento === '' || telefono === '' || email === '' || contrasena === '' || confirmacionContrasena === '' || value === '' || aceptarTerminos === false){
      Alert.alert("Error", "Rellene los campos faltantes y/o acepte los los términos de la política de privacidad");
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

  const infoPolitica = `
  Política de Uso y Leyenda de Privacidad de Datos
  1. Recopilación de Datos:
Se recopilarán datos personales de manera transparente y solo con el consentimiento del usuario.
La información recolectada se limitará a lo necesario para proporcionar los servicios solicitados.
Se recolectará información sensible, como datos personales, médicos, alimenticios, así como mediciones de pacientes, con el fin de brindar servicios específicos y personalizados.
2. Uso de la Información:

Los datos recopilados se utilizarán exclusivamente para los fines especificados al recopilar la información.
No compartiremos, venderemos ni divulgaremos sus datos personales a terceros sin su consentimiento expreso.
3. Seguridad de Datos:

Implementamos medidas de seguridad sólidas para proteger la información del usuario contra accesos no autorizados, pérdidas o alteraciones.
Se promoverá la actualización regular de contraseñas y se emplearán protocolos de cifrado para garantizar la confidencialidad de la información.
4. Acceso y Control:

Los usuarios tendrán acceso a sus datos personales y podrán corregir, actualizar o eliminar la información según sea necesario.
Se proporcionará un proceso claro y sencillo para que los usuarios retiren su consentimiento en cualquier momento.
5. Cookies y Tecnologías Similares:

Utilizaremos cookies y tecnologías similares para mejorar la experiencia del usuario.
Los usuarios pueden gestionar las preferencias de cookies y elegir aceptar o rechazarlas según sus necesidades.
6. Comunicación:

Mantendremos a los usuarios informados sobre cualquier cambio en nuestra política de privacidad.
Las preguntas o inquietudes sobre la privacidad serán respondidas de manera oportuna a través de los canales de contacto designados.
7. Cumplimiento Legal:

Nos comprometemos a cumplir con todas las leyes y regulaciones aplicables relacionadas con la privacidad de datos.
Cooperaremos plenamente en caso de investigaciones legales y protegeremos la privacidad de los usuarios en la medida de lo posible.
8. Exención de Responsabilidad:

No nos hacemos responsables del uso que los usuarios hagan de la información proporcionada voluntariamente, incluyendo la información sensible recopilada.
Los usuarios asumen la responsabilidad de la precisión y legalidad de la información compartida a través de nuestros servicios.
Al utilizar nuestros servicios, usted acepta y consiente las prácticas descritas en esta Política de Uso y Leyenda de Privacidad de Datos, incluida la recolección de información sensible y la exención de responsabilidad mencionada. Esta política puede estar sujeta a actualizaciones, y se le notificará cualquier cambio significativo. 
Última actualización: 13 de diciembre de 2023.

`;

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
          
          <TouchableOpacity style={styles.containerButton} onPress={() =>  setModalVisible(true)} >
                        <LinearGradient
                            // Button Linear Gradient
                            colors={['#255000', '#588100']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.button}
                        >
                            <Text style={styles.enlacePolitica}>Ver política de privacidad</Text>
                        </LinearGradient>
                    </TouchableOpacity>
          
          <Modal animationType='slide' transparent={true}
          visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <ScrollView style={styles.modalContent}>
                <Text style={styles.politicaTexto}>{infoPolitica}</Text>
              </ScrollView>
              <TouchableOpacity style={[styles.aceptarBoton, aceptarTerminos ? styles.aceptarBotonHabilitado : null]}onPress={() => setAceptarTerminos(!aceptarTerminos)}>
                <Text style={styles.aceptarTexto}>Acepto los términos y condiciones</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cerrarBoton}onPress={() => setModalVisible(false)} disabled={!aceptarTerminos}>
                <Text style={styles.textoCerrar}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
    marginBottom : width * 0.07
  },
  //MODAL
  enlacePolitica: {
    /*color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,*/
    color : 'white',
    width : width * 0.4,
    height : height * 0.02
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
    width: '80%',
  },
  politicaTexto: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    marginBottom : 5
  },
  cerrarBoton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  textoCerrar: {
    color: 'white',
    fontWeight: 'bold',
  },
  aceptarBoton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    alignItems: 'center',
  },
  aceptarBotonHabilitado: {
    backgroundColor: 'blue',
  },
  aceptarTexto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});
