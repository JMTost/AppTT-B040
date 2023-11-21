import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import infoApp from '../../../infoApp.json';
import * as DocumentPicker from 'expo-document-picker';

const SubidaDocumentosProfesional = () => {
    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
    const tomaDocumento = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type : 'application/pdf',
            });
            if(result.canceled === false){
                console.log(result);
                setArchivoSeleccionado(result);
            }
        } catch (error) {
            console.error("Error seleccionando documento: ", error);
        }
    };

    const subidaArchivo = async () => {
        if(archivoSeleccionado){
            //realizamos la petición de envió a la API
            console.log(archivoSeleccionado)
            const formData = new FormData();
            formData.append('archivo', {
                uri : archivoSeleccionado.assets[0].uri,
                name : archivoSeleccionado.assets[0].name,
                type : 'application/pdf',
            });
            //agregamos el id del profesional
            formData.append("id", infoApp.usuarioProfesional.idUsuario);
            try {
                const response = await fetch(`${infoApp.APIurl}/cargaArchivos`, {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'multipart/form-data',
                    },
                    body : formData,
                });
                //RESPUESTA DE LA API
                if(response.ok){
                    const responseData = await response.json();
                    //mostramos el mensaje mediante un alert
                    Alert.alert('Éxito', responseData.mensaje || 'Archivo cargado exitosamente');
                }else{
                     //en caso de que marque un error
                    const errorData = await response.json();
                    Alert.alert("Error", errorData.mensaje || 'Error al cargar el archivo');
                }
            } catch (error) {
                console.error("Error al subir el documento: ", error);
                Alert.alert("Error" ,'Error inesperado al cargar el archivo');
            }
        }else{
            console.warn("Archivo no seleccionado");
        }
    };
    return(
        <View style={{ alignContent : 'center', alignItems : 'center', justifyContent : 'center'}}>
            <Button title="Selecciona un PDF" onPress={tomaDocumento} />
            {archivoSeleccionado && (
                <Text>Archivo Seleccionado: {archivoSeleccionado.assets[0].name}</Text>
            )}
            <Button title="Subir archivo" onPress={subidaArchivo} />
        </View>
    )

}

export default SubidaDocumentosProfesional;