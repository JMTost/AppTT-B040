import React, { useState, useEffect} from 'react';
import { View, Image, Button, Text, Alert, StyleSheet, TouchableOpacity, Pressable, ScrollView} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import {AntDesign} from '@expo/vector-icons';
import infoApp from '../../../infoApp.json';
import { useNavigation } from '@react-navigation/native';
import * as archivoImagen from '../obtenImgUsuario';

const CambioImagenUsuario = ( ) => {
    const navigation = useNavigation();
    const [imagen, setImagen] = useState(null);
    const [nombreImagen, setNombreImagen] = useState(null);
    

    useEffect( () => {
        (
            async () => {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if(status !== 'granted'){
                    Alert.alert("Información", "Permiso para acceder a la biblioteca de medios denegado");
                }
            }
        )();
    }, []);

    const seleccionaImagen = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes : ImagePicker.MediaTypeOptions.Images,
                allowsEditing : true,
                aspect : [4, 3],
                quality : 1,
            });

            if(!result.canceled){
                //console.log(result);
                setImagen(result.assets[0].uri);
                setNombreImagen(result.assets[0]);
                //console.log(result.assets[0])
            }

        } catch (error) {
            console.error("Error seleccionando imagen: ", error);
        }
    }

    const handleCargaImagen = () => {
        //console.log("Infomación de la imagen: ", {imagen});
        //Primero es la carga de la imagen y despues la obtención de la misma
        const realizaEnvioAPI = async () => {
            try{
                const formData = new FormData();
                formData.append("img", {
                    uri : nombreImagen.uri,
                    name : "img.jpg",
                    type : "image/jpeg"
                });
                formData.append("id", infoApp.usuarioProfesional.idUsuario);
                //console.log(  nombreImagen.uri,"img.jpg",nombreImagen.type)
                const response = await fetch(`${infoApp.APIurl}/altaFotoProfesional`, {
                    method : 'POST', 
                    headers : {
                        'Content-Type': 'multipart/form-data',
                    },
                    body : formData,
                });
                //console.log(response)
                if(response.ok){
                    const json = await response.json();
                    //console.log(json);
                    await archivoImagen.almacenaImagen();
                    setImagen(null);
                    setNombreImagen(null);
                    //AQUI REALIZAR LA RECARGA DEL COMPONENTE
                    navigation.navigate("UserScreen");
                }else{
                    const error = await response.text();
                    console.log(error);
                }
            }catch(error){
                console.error("catch", error);
            }
            
            /*
            if(response.ok){
                const json = await response.json();
                console.log(json);
                
                // await archivoImagen.almacenaImagen();
                // navigation.navigate("UserScreen");
                
            }else{
                console.log(response);
                Alert.alert("Error", "Dentro del envio de información")
            }
            */
        };
        realizaEnvioAPI();

    }


    return(
        <View style={styles.container}>
        <TouchableOpacity onPress={seleccionaImagen}>
            <View style={styles.imagePicker}>
            {imagen ? (
                <Image source={{ uri: imagen }} style={styles.image} />                
            ) : (
                <Text>Elegir imagen</Text>
            )}
            </View>
        </TouchableOpacity>
        {imagen && (
            <TouchableOpacity style={styles.button} onPress={handleCargaImagen}>
                <AntDesign name = 'upload' size={20} color="white" />
                <Text style={styles.buttonText}>Subir imagen</Text>
            </TouchableOpacity>
        )}
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagePicker: {
      width: 200,
      height: 200,
      backgroundColor: '#e0e0e0',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#b0b0b0',
      
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
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

export default CambioImagenUsuario;