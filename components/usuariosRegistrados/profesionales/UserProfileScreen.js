import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import {MaterialIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import infoApp from '../../../infoApp.json';
//formulario 
import CambioContrasenaFormulario from './CambioContrasenaFormulario';
import CambioImagenUsuario from './CambioImagenUsuario';
import SubidaDocumentosProfesional from './SubidaDocumentosProfesional';
//navigation

const UserProfileScreenProfesional = ( {navigation} ) => {
  //const navigation = useNavigation();
  const [showCambioContrasenaForm, setShowCambioContrasenaForm] = useState(false);
  const [showCambioIMG, setShowCambioIMG] = useState(false);
  const [showSubidaArchivos, setSubidaArchivos] = useState(false);

    //
  const [dataVideos, setDataVideos] = useState([]);

  useEffect( () => {
    obtenInfoVideosCargados();
    obtenPacientes();
  }, []);

  //FUNCIONES PARA LA OBTENCION DE INFORMACION DEL PROFESIONAL
    //VIDEOS QUE CUENTE CARGADOS
  const obtenInfoVideosCargados = async () => {
    try {
      const responseVideoInfo = await fetch(`${infoApp.APIurl}/obtenListaVideoProfesional/${infoApp.usuarioProfesional.idUsuario}`, {
        method : 'GET'
      });
      if(responseVideoInfo.ok){
        const info = await responseVideoInfo.json();
        setDataVideos(info);
        if(dataVideos != null && dataVideos.data.length > 0){
          infoApp.usuarioProfesional.idVideos = [];
          infoApp.usuarioProfesional.nombreVideos = [];
          for(let i = 0; i < dataVideos.data.length; i++){
              infoApp.usuarioProfesional.idVideos.push(dataVideos.data[i].id_video);
              infoApp.usuarioProfesional.nombreVideos.push(dataVideos.data[i].nombre);
          }
        }
      }else if(responseVideoInfo.status === 404){
        const info = await responseVideoInfo.json();
        setDataVideos(info);
      }else{
        const info = await responseVideoInfo.json();
        setDataVideos(info);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
  const obtenPacientes = async () => {
    try {
      const responsePacientes = await fetch(`${infoApp.APIurl}/obtenPacientesProfesional/${infoApp.usuarioProfesional.idUsuario}`, {
        method : 'GET',
      });
      if(responsePacientes.ok){
        const info = await responsePacientes.json();
        infoApp.usuarioProfesional.pacientes = [];
        for(let i = 0; i < info.data.length; i++ ){
          infoApp.usuarioProfesional.pacientes.push({
            id : info.data[i].id,
            nombreC : info.data[i].nombreC
          });
        }
      }else if(responsePacientes.status === 404){
        const info = await responsePacientes.json();
        infoApp.usuarioProfesional.pacientes.push(info.mensaje);
      }else{
        const info = await responsePacientes.json();
        infoApp.usuarioProfesional.pacientes.push(info.error);
        console.log(info);
      }
    } catch (error) {
      console.log("error: ", error); 
    }
  }
  

    const handleChangeContrasena = () => {
        setShowCambioContrasenaForm(!showCambioContrasenaForm);
        setShowCambioIMG(false);
        setSubidaArchivos(false);
        console.log("Logica de cambio de contraseña");
    }

    const handleEliminaUsuario = () => {
        console.log("Logica de eliminacion de usuario");
        Alert.alert("Eliminación de Usuario", "¿Estás seguro de realizar la opción?", 
          [{
            text : 'OK',
            onPress : handleEliminaUsuarioAlert
          },{
            text : "Cancelar",
            onPress : () => {}
          }], {cancelable : false}
        );
    }

    const handleEliminaUsuarioAlert = () => {
      const relizaEliminacionAPI = async () => {
        try {
          const response  = await fetch(`${infoApp.APIurl}/borraProfesional`, {
            method : 'DELETE',
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify({id : infoApp.usuarioProfesional.idUsuario}),
          });
          if(response.ok){
            const json = await response.json();
            Alert.alert("Exito", "Eliminación exitosa de usuario.");
            infoApp.usuarioProfesional = {
              "nombreC" : "",
              "idUsuario" : 0,
              "urlImagen_usuario" : "",
              "correo" : "",
              "pacientes" : []
          };
            navigation.push('InicioSesion');
          }
        } catch (error) {
          
        }
      };
      relizaEliminacionAPI();
    }

    const handleChangeImagenUsuario = () => {
        setShowCambioIMG(!showCambioIMG);
        setShowCambioContrasenaForm(false);
        setSubidaArchivos(false);
        console.log("Logica de cambio de imagen de usuario");
    }
    
    const handleCerrarSesion = () => {
      infoApp.usuarioProfesional = {
        "nombreC" : "",
        "idUsuario" : 0,
        "urlImagen_usuario" : "",
        "correo" : "",
        "pacientes" : [],
        "idVideos" : [],
        "urisVideos" : [],
        "nombreVideos" : []
    };
      navigation.push('InicioSesion');
      /*
      infoApp.isLogged = false;
      infoApp.tipo = "";
      navegation.goBack();
      */
    }
    const handleSubidaConstancias = () => {
      setSubidaArchivos(!showSubidaArchivos);
      setShowCambioContrasenaForm(false);
      setShowCambioIMG(false);
    }
    return(
        <ScrollView contentContainerStyle={styles.container}>
        <View style={{alignItems : 'center', justifyContent : 'center'}}>
          <Image source = {{uri : infoApp.usuarioProfesional.urlImagen_usuario}} style = {styles.profileImage} />
          <Text style = {styles.userName}>{infoApp.usuarioProfesional.nombreC}</Text>
          <Text style = {styles.userOccupation}>{infoApp.usuarioProfesional.correo}</Text>

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
          
          <TouchableOpacity style={styles.button} onPress={handleSubidaConstancias}>
              <MaterialIcons name = 'upload-file' size={20} color="white" />
              <Text style={styles.buttonText}>Subida de documentos</Text>
          </TouchableOpacity>
          
          {showSubidaArchivos && <SubidaDocumentosProfesional />}
          </View>
      </ScrollView>
    );

    
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
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

export default UserProfileScreenProfesional;