import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView, Pressable, Platform, Touchable, TouchableOpacity,Image,picker, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//import ButtonGradient from './ButtonRegister';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
  //import del infoApp
import infoApp from '../../infoApp.json';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RegistroProfesional() {
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
  //caso de la imagen de la constancia, en este caso se quita para dar funcionalidad
    const [selectedImage, setSelectedImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null); //Selector SyN
  const [textDireccion, setTextDireccion] = useState('');
  
  //ESTADO DE LOS DATOS OBTENIDOS DE LA API
  const [apiData, setApiData] = useState(null);

  //VARIABLE PARA MANEJAR LA OBTENCIÓN DE LOS DATOS
    //SE OBTENDRAN LOS TIPOS DE PROFESIONALES QUE SE ENCUENTRAN EN LA BASE DE DATOS 
  useEffect( () => {
    const fetchInfoTipoProfesionales = async () => {
      try {
        const response = await fetch(`${infoApp.APIurl}/obtenTipos`);
        const data_ = await response.json();
        setApiData(data_);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInfoTipoProfesionales();
  }, []);

  const toggleDatePicker = () =>{
    setShowPicker(!showPicker);
  };

  const onChange = ({type}, selectedDate) =>{
    if (type == "set"){
        const currentDate = selectedDate; 
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

    return `${year}/${month}/${day}`;

  }
    
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Acceder a la imagen seleccionada a través del nuevo array 'assets'
      setSelectedImage(result.assets[0].uri);
    }
  };

  const options = [
    { label: 'Sí', value: 1 },
    { label: 'No', value: 0 },

  ];

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
    console.log('Selección:', selectedOption);
    */
    if(nombre === '' || apellidoPaterno === '' || apellidoMaterno === '' || edad === '' || fechaNacimiento === '' || telefono === '' || email === '' || contrasena === '' || confirmacionContrasena === '' || value === '' || (selectedOption === null || selectedOption === '')){
      Alert.alert("Error", "Rellene los campos faltantes");
    }else{
      //Comprobamos que los tipos de datos y longitud se comprueben
      const regexCorreo = "^(?!.{41})[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-zA-Z]{2,6}$";
      const regexFechaNacimiento = /^\d{4}[\/.]\d{1,2}[\/.]\d{1,2}$/; // caso para dd/mm/yyyy"/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/";
      if(nombre.length > 25 || apellidoPaterno.length > 25 || apellidoMaterno.length > 25 || (!email.match(regexCorreo) ||email.length > 40) || (edad < 0 && edad > 99) || !fechaNacimiento.match(regexFechaNacimiento) || (telefono.length < 0 || telefono.length > 20) || (contrasena.length < 0 || contrasena.length > 16) || (confirmacionContrasena.length < 0 || confirmacionContrasena.length > 16) || textDireccion.length > 200){
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
        console.log('Dirección:', textDireccion);
      }else if(contrasena === confirmacionContrasena){
        //realizamos la carga a la API
        const dataPost = {
            nombre: nombre,
            apPaterno: apellidoPaterno,
            apMaterno: apellidoMaterno,
            email: email,
            edad: edad,
            fechaN: fechaNacimiento,
            numTel : telefono, 
            pass: contrasena,
            tipo: value,
            direccion : textDireccion || null,
            valido:0
        };
        //console.log(dataPost);
        const realizaCargaAPI = async () => {
          const response = await fetch(`${infoApp.APIurl}/altaProfesionales`, {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
            }, body : JSON.stringify(dataPost),
          });
          if(response.ok){
            const data = await response.json()
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
        realizaCargaAPI();
      }else{
        Alert.alert("Error", "Compruebe los datos ingresados");
      }
    }
  };
  

  let data = [];
  if(apiData != null){ //comprobamos que obtenemos la información de la API
    for(let i = 0; i < apiData.objeto.data.length; i++){
      data.push({
        label : apiData.objeto.data[i].descripcion,
        value : apiData.objeto.data[i].id
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
          {
            showPicker &&  Platform.OS === 'ios' &&(
              <DateTimePicker 
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                  style={styles.datePicker}
                  locale={'es'}>
              
              </DateTimePicker>
            )
          }

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
          {
            showPicker && Platform.OS === "ios" && (
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
            )
          }

          {/*showPicker && (
              <DateTimePicker 
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                  style={styles.datePicker}
                  locale={'es'}>
              
              </DateTimePicker>
          )*/}
  
          
          {/*!showPicker && (
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
          )*/}
  
          {/*
            showPicker && Platform.OS === "ios" && (
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
          )
          */}
         
          
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
              <Text style={styles.text}>Tipo de profesinal:</Text>
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
          {
            /*
            <TextInput
                style={styles.input}
                placeholder="Cedula Profesional"
                onChangeText={(text) => setApellidoMaterno(text)}
                placeholderTextColor="#b5b5b5"
            />
            */
          }
  {
    //este elemento no se considera dentro de este formulario, en su caso se coloca dentro de la ventana de perfil
  }
    {
      /*
        <TouchableOpacity style={styles.containerConstancia} onPress={pickImage} >
              <LinearGradient
                  // Button Linear Gradient
                  colors={['#67b5ad','#67b5ad']}   
                  start={{x:0, y:0}}
                  end={{x:1, y:1}} 
                  style={styles.button}      
              >           
                  <Text style={styles.textConstancia}>Selecciona la imagen de tu Constancia Profesional</Text>
              </LinearGradient>
          </TouchableOpacity>
          {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
          */
    }
          <View style={styles.containerS}>
            <Text style={styles.labelS}>¿Cuenta con consultorio propio?</Text>
            <RNPickerSelect
              onValueChange={(selectedValue) => setSelectedOption(selectedValue)}
              items={options}
              value={selectedValue}
              style={pickerSelectStyles}
              placeholder={{}}
            />
          </View>
            
          <TextInput
            style={styles.inputDireccion}
            multiline={true}
            numberOfLines={4} // Puedes ajustar la cantidad de líneas visibles
            value={textDireccion}
            onChangeText={(newText) => setTextDireccion(newText)}
            placeholder="Escribe aquí tu dirección..."
          />
          <Text style={styles.passwordGuidelines}>
          <Ionicons name='information-circle' size={24} color="black" />
            Por favor, asegúrate de que tu contraseña tenga entre 8 y 16 caracteres de longitud.
            Para mejorar la seguridad, te recomendamos incluir una combinación de letras mayúsculas,
            minúsculas, números y caracteres especiales.
          </Text>
          <ButtonGradient></ButtonGradient>
          </View>
      </ScrollView>
  
      
    );
  }else{//caso de no obtener la información
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
        fontWeight: 'bold'
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

  image: {
    width: 200,
    height: 200,
  },
  containerConstancia:{          
    alignItems: 'center', 
    width:410,
    marginTop: 15,
    marginBottom: 15,
},

textConstancia: {
  fontSize: 14,  
},
button:{
    width: '80%',
    height: 35,
    borderRadius: 25, 
    padding: 10,        
    alignItems: 'center', 
    justifyContent: 'center'
},
containerS: {
  flex: 1,
  marginRight:130,
  width: 200,
},
labelS: {
    width: 320,
    marginLeft: 10,
    marginTop: 10,
},
selectedOptionS: {
  fontSize: 16,
  marginTop: 10,
  width:100,
},
inputDireccion: {
  width: '80%',
  height: 80,
  backgroundColor: 'white', // Color de fondo del campo de entrada
  paddingStart: 30,
  borderRadius: 30,
  marginTop: 10,
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
passwordGuidelines: {
  // Estilos para las recomendaciones sobre contraseñas
  marginTop: 15,
  fontSize: 14,
  color: 'black',
  fontStyle: 'italic',
  textAlign: 'center',
},
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignContent: 'center',
    alignContent:'center',
    width: 330,
    height: 50,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  inputAndroid: {
    fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 12,
      alignContent: 'center',
      alignContent:'center',
    borderWidth: 0.5,
    borderColor: 'gray',
      backgroundColor : 'white',
      borderRadius: 30,
      paddingStart: 30,
      borderRadius: 30,
      width: 330,
      height: 50,
    color: 'black',
  },
});