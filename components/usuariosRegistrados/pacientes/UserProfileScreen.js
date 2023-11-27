import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import {AntDesign} from '@expo/vector-icons';
import infoApp from '../../../infoApp.json';
//formulario 
import CambioContrasenaFormulario from './CambioContrasenaFormulario';
import CambioImagenUsuario from './CambioImagenUsuario';
//navigation

const UserProfileScreenPaciente = ( {navigation} ) => {
  //const navigation = useNavigation();

    const [showCambioContrasenaForm, setShowCambioContrasenaForm] = React.useState(false);
    const [showCambioIMG, setShowCambioIMG] = React.useState(false);

    const handleChangeContrasena = () => {
        setShowCambioContrasenaForm(!showCambioContrasenaForm);
        setShowCambioIMG(false);
        console.log("Logica de cambio de contraseña");
    }

    const handleEliminaUsuario = () => {
        console.log("Logica de eliminacion de usuario");
        const relizaEliminacionAPI = async () => {
          try {
            const response  = await fetch(`${infoApp.APIurl}/borraPaciente`, {
              method : 'DELETE',
              headers : {
                'Content-Type' : 'application/json',
              },
              body : JSON.stringify({idPaciente : infoApp.usuarioPaciente.idUsuario}),
            });
            if(response.ok){
              const json = await response.json();
              Alert.alert("Exito", "Eliminación exitosa de usuario.");
              infoApp.usuarioPaciente = {
                "nombreC" : "",
                "idUsuario" : 0,
                "urlImagen_usuario" : "",
                "correo" : "",
                "idVideosEjercicios" : [],
                "ejercicios" : []
            };
              navigation.push('InicioSesion');
            }else{
              const json = await response.json();
              console.log(json);
              Alert.alert("Error", "");
            }
          } catch (error) {
            
          }
        };
        relizaEliminacionAPI();
    }

    const handleChangeImagenUsuario = () => {
        setShowCambioIMG(!showCambioIMG);
        setShowCambioContrasenaForm(false);
        console.log("Logica de cambio de imagen de usuario");
    }
    
    const handleCerrarSesion = () => {
      infoApp.usuarioPaciente = {
        "nombreC" : "",
        "idUsuario" : 0,
        "urlImagen_usuario" : "",
        "correo" : "",
        "idVideosEjercicios" : [],
        "ejercicios" : [], 
        "dieta" : [],
        "citas" : []
    };
      navigation.push('InicioSesion');
      /*
      infoApp.isLogged = false;
      infoApp.tipo = "";
      navegation.goBack();
      */
    }
    
    return (
        
        <ScrollView contentContainerStyle={styles.container}>
            <Image source = {{uri : infoApp.usuarioPaciente.urlImagen_usuario}} style = {styles.profileImage} />
            <Text style = {styles.userName}>{infoApp.usuarioPaciente.nombreC}</Text>
            <Text style = {styles.userOccupation}>{infoApp.usuarioPaciente.correo}</Text>

            <TouchableOpacity style={styles.button} onPress={handleChangeContrasena}>
                <Ionicons name = 'lock-closed' size={20} color="white" />
                <Text style={styles.buttonText}>Cambiar contraseña</Text>
            </TouchableOpacity>

            {/*RENDERIZAMOS EL FORMULARIO DE CAMBIO DE CONTRASEÑA SOLO SI ESTA COMO TRUE LA VARIABLE */}
            {showCambioContrasenaForm && <CambioContrasenaFormulario />}

            <TouchableOpacity style={styles.button} onPress={handleEliminaUsuario}>
                <AntDesign name="delete" size={24} color="white" />
                <Text style={styles.buttonText}>Eliminar usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleChangeImagenUsuario}>
                <Ionicons name = 'ios-image' size={20} color="white" />
                <Text style={styles.buttonText}>Cambiar imagen de usuario</Text>
            </TouchableOpacity>
            {/*RENDERIZAMOS EL FORMULARIO DE CAMBIO DE IMAGEN */}
            {showCambioIMG && <CambioImagenUsuario />}

            <TouchableOpacity style={styles.button} onPress={handleCerrarSesion}>
                <Ionicons name = 'close' size={20} color="white" />
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
            

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop : 10
      },
      profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
      },
      userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      userOccupation: {
        fontSize: 16,
        marginBottom: 20,
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6cbdb5',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      buttonText: {
        color: 'white',
        marginLeft: 10,
      },
});

export default UserProfileScreenPaciente;