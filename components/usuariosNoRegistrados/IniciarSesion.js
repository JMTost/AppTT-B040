import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//import Svg ,{Path, Defs, LinearGradient,Stop} from 'react-native-svg';
//const {width, height} = Dimension.get('window')
//import ButtonGradient from './Button';
  //archivo con los datos de la sesión del usuario
import infoApp from '../../infoApp.json';
  //manejador de archivos
import * as FileSystem from 'expo-file-system';
  //archivo para realizar la obtención de la imagen de usuario
import * as archivoImagen from '../usuariosRegistrados/obtenImgUsuario';
  //navigation para mandarla a la pagina principal
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
//archivos para caso de usuario registrado por ahora paciente
import HomeScreen from '../home';
import PacientScreen from '../pacientes';
import UserProfileScreenPaciente from '../usuariosRegistrados/pacientes/UserProfileScreen';
import UserProfileScreenProfesional from '../usuariosRegistrados/profesionales/UserProfileScreen';
import CargaVideosRutina from '../usuariosRegistrados/profesionales/CargaVideosRutina';
import VisualizacionVideos from '../usuariosRegistrados/profesionales/VisualizacionVideos';
//arcihvos para caso de usuario registrado profesional



const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function IniciarSesion() {
  const navigation = useNavigation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    //selector del tipo de usuario
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
    //
  const [isLogged, setIsLogged] = useState(false);
  const [userType, setUserType] = useState(null);

  const data = [
    {label : "Profesional de la salud", value : 0},
    {label : "Paciente", value : 1},
  ];

  useEffect( () => {
    if(isLogged){
      setUserType(value === 0 ? 'profesional' : 'paciente');
      //navigation.navigate('home');
    }else{
      setIsLogged(false);
    }
  }, [isLogged, value]);

  const recuperarContrasena = () => {
    // Aquí puedes agregar la lógica de inicio de sesión
    alert('Redireccinar a formulario para recuperar contraseña');
  };
  const registrarPaciente = () => {
    // Aquí puedes agregar la lógica de inicio de sesión
    alert('Redireccinar a formulario para registrar un usuario paciente');
  };
  const registrarProfesional = () => {
    // Aquí puedes agregar la lógica de inicio de sesión
    alert('Redireccinar a formulario para registrar a un usuario profesinal');
  };

 

  //COMPONENTES PARA EL HANDLER Y EL BOTON
    //BOTON PARA QUE EN LUGAR DE USARLO DE OTRO ARCHIVO, SE USE DIRECTO AQUI
  const ButtonGradient = () => {
    return(
      <TouchableOpacity style={styles.containerBUTTON} onPress={handleRegistro} >
          <LinearGradient
              // Button Linear Gradient
              colors={['#6cbdb5', '#93ccc6']}   
              start={{x:0, y:0}}
              end={{x:1, y:1}} 
              style={styles.button}      
          >           
              <Text style={styles.textBUTTON}>INICIAR SESIÓN</Text>
          </LinearGradient>
      </TouchableOpacity>
    );
  };

  const handleRegistro = () => {
    
    //verificamos que los datos esten dentro del rango
    const regexCorreo = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";//const regexCorreo = "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"; //"^(?!.{41})[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-zA-Z]{2,6}$";
    if( (!email.match(regexCorreo) || email.length > 40) || (password.length < 0 || password.length > 16) ){
      //los datos son aceptados, realizamos la petición get
      console.log(email, password);
      Alert.alert("Error", "Revisa los datos que ingresaste");
    }else{
      const dataGET = {
        correo : email,
        password : password,
        tipo :  value
       };
       const realizaPeticionAPI = async () =>{
        const response = await fetch(`${infoApp.APIurl}/login/${email}/${password}/${value}`);
        if(response.ok){
          const data_response = await response.json();
          //console.log(data_response)
          //actualización de la almacenamiento de la informmación
          /*
            infoApp.idUsuario = data_response.id;
            infoApp.tipo = data_response.tipo;
            infoApp.nombreC = data_response.nombreC;
          */
          if(data_response.tipo === "profesional"){
            infoApp.usuarioProfesional.idUsuario = data_response.id;
            infoApp.tipo = data_response.tipo;
            infoApp.usuarioProfesional.nombreC = data_response.nombreC;
            infoApp.usuarioProfesional.correo = dataGET.correo;
            //infoApp.isLogged = true;
          }else if(data_response.tipo === "paciente"){
            infoApp.usuarioPaciente.idUsuario = data_response.id;
            infoApp.tipo = data_response.tipo;
            infoApp.usuarioPaciente.nombreC = data_response.nombreC;
            infoApp.usuarioPaciente.correo = dataGET.correo;
            //infoApp.isLogged = true; 
          }
            //obtenemos y almacenamos la imagen de usuario
          await archivoImagen.almacenaImagen();
          infoApp.isLogged = true;
          console.log(infoApp);
          setIsLogged(infoApp.isLogged);
        }else{
          Alert.alert("Error", "Error en alguna parte");
        }
       };
       realizaPeticionAPI();
    }
  };

  function MenuUsuarioPaciente() {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if(route.name === 'Pacient'){
            iconName = focused ? 'body' : 'body-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'person' : 'person-outline';
          }
  
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={15} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'blue',
    })}>
      <Tab.Screen name= "home" component={HomeScreen} options={{title:"home"}} />
      <Tab.Screen name= "Pacient" component={PacientScreen} options={{title:"Pacientes"}} />
      <Tab.Screen name="UserScreen" component={UserProfileScreenPaciente} options={{title:"Perfil"}} />
    </Tab.Navigator>
    );
  }

  function MenuUsuarioProfesional() {
    return (
      <View style={{flex :1, alignContent : 'center', alignItems : 'center'}}>
        <Text>Usuario profesional</Text>
      </View>
    );
  }
  return (
    <View style={{flex :1}}>
    
      { isLogged ? (        
        //realizamos los casos para los tipos de usuario
        userType === 'paciente' ? (
          <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
          
                  if (route.name === 'home') {
                    iconName = focused
                      ? 'home'
                      : 'home-outline';
                  } else if(route.name === 'Pacient'){
                    iconName = focused ? 'body' : 'body-outline';
                  } else if (route.name === 'UserScreen') {
                    iconName = focused ? 'person' : 'person-outline';
                  }
          
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={15} color={color} />;
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'blue',
            })}>
              <Tab.Screen name= "home" component={HomeScreen} options={{title:"home"}} />
              <Tab.Screen name= "Pacient" component={PacientScreen} options={{title:"Pacientes"}} />
              <Tab.Screen name="UserScreen" component={UserProfileScreenPaciente} options={{title:"Perfil"}} />
              {
                //<Tab.Screen name="Settings" component={SettingsScreen} options={{title:"Perfil"}} />
              }
          </Tab.Navigator>
        ) : userType === 'profesional' ? (
          <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
          
                  if (route.name === 'home') {
                    iconName = focused
                      ? 'home'
                      : 'home-outline';
                  } else if(route.name === 'VideoScreen'){
                    iconName = focused ? 'body' : 'body-outline';
                  } else if (route.name === 'UserScreen') {
                    iconName = focused ? 'person' : 'person-outline';
                  }
          
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={15} color={color} />;
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'blue',
            })}>
              <Tab.Screen name="UserScreen" component={UserProfileScreenProfesional} options={{title:"Perfil"}} />
              <Tab.Screen name="VideoScreen" component={CargaVideosRutina} />
              <Tab.Screen name="VisualizaVideo" component={VisualizacionVideos} />
              {
                //<Tab.Screen name="Settings" component={SettingsScreen} options={{title:"Perfil"}} />
              }
          </Tab.Navigator>
        ) : null
          
    ) : (
      <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión con tu cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType='email-address'
        onChangeText={(text) => setEmail(text)}
        inputMode='email'
        textContentType='emailAddress'
        maxLength={40}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        maxLength={16}
      />
      {
        //obtener el tipo de usuario que es
      }
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
            
        <Pressable onPress={() => navigation.navigate('Recuperar contraseña')}>
          <Text style={styles.forgotPasword}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
        
        <ButtonGradient></ButtonGradient>

        <Pressable onPress={() => navigation.navigate('Registro de Paciente')}>
          <Text style={styles.btnregistraPaciente}>Registrate como paciente</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Registro de Profesional')}>
          <Text style={styles.btnregistraProfesional}>Registrate como profesional de la salud</Text>
        </Pressable>
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Color de fondo
    marginTop: 60,
  },

  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#000',
    marginRight:40,
  },

  subtitle:{
    fontSize: 20, 
    color: 'gray',
    marginRight:140,

  },

  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    marginTop: 30,
  },

  forgotPasword: {
    fontSize: 14,
    color: 'blue',
    marginTop: 20,
    marginStart: 190,
  },

  btnregistraPaciente: {
    fontSize: 15,
    color: 'blue',
    marginTop: 10,
    marginLeft: 190,
  },

  btnregistraProfesional: {
    fontSize: 15,
    color: 'blue',
    marginTop: 10,
    marginLeft: 110,
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
    button:{
      width: '80%',
      height: 50,
      borderRadius: 25, 
      padding: 10,        
      alignItems: 'center', 
      justifyContent: 'center'
    },
  //
    //estilos Dropdown
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
    }

});