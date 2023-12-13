import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import infoApp from '../../../infoApp.json';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';

const {width, height} = Dimensions.get('window');

const SubidaDocumentosProfesional = () => {

    //VARIABLES PARA VISUALIZAR SI CUENTA CON ARCHIVOS CARGADOS -- SOLO ES PARA INFORMACIÓN
    const [dataArchivos, setDataArchivos] = useState([]);
    const [loadingArchivos, setLoadingArchivos] = useState(false);

    //VARIABLES PARA ELIMINAR EL VIDEO
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

    useEffect( () => {
        obtenInfoArchivos();
    }, []);

    const obtenInfoArchivos = async () => {
        try {
          const responseArchivos = await fetch(`${infoApp.APIurl}/obtenListaArchivosProfesional/${infoApp.usuarioProfesional.idUsuario}`, {
            method : 'GET'
          });
          if(responseArchivos.ok){
            //console.log(responseArchivos);
            const info = await responseArchivos.json();
            setDataArchivos(info);
            //console.log("json", info)
            setLoadingArchivos(true);
            //console.log("INFO ARCHIVOS: ", dataArchivos);
          }else{
            setLoadingArchivos(false);
          }
        } catch (error) {
          console.log("error: ", error);
          setLoadingArchivos(false);
        }
    };

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
    
    if(loadingArchivos){
        if(Object.keys(dataArchivos).includes("mensaje") ){
            return(
                <View style={{ alignContent : 'center', alignItems : 'center', justifyContent : 'center'}}>
                <Text>{dataArchivos.mensaje}</Text>
                    <Button title="Selecciona un PDF" onPress={tomaDocumento} />
                    {archivoSeleccionado && (
                        <Text>Archivo Seleccionado: {archivoSeleccionado.assets[0].name}</Text>
                    )}
                    <Button title="Subir archivo" onPress={subidaArchivo} />
                </View>
            );
        }else if(Object.keys(dataArchivos).includes("objeto")){
            //console.log(dataArchivos)
            const elementos = [];
            for(let i =0; i < dataArchivos.objeto.archivos.length; i++){
                elementos.push(
                    <Text key={i}>{dataArchivos.objeto.archivos[i].nombreArchivo}</Text>
                );
            }
            return(
                <ScrollView contentContainerStyle={{ alignContent : 'center', alignItems : 'center', justifyContent : 'center'}}>
                    <Text>Archivos cargados: </Text>
                    {elementos}
                    <TouchableOpacity style={styles.containerButton} onPress={tomaDocumento} >
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#255000', '#588100']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                    >
                        <Text style={styles.text}>Selecciona un PDF</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    {archivoSeleccionado && (
                        <Text>Archivo Seleccionado: {archivoSeleccionado.assets[0].name}</Text>
                    )}
                    <TouchableOpacity style={styles.containerButton} onPress={subidaArchivo} >
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#255000', '#588100']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                    >
                        <Text style={styles.text}>Subir archivo</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            );
        }
    }else{
        return(
            <View style={{ alignContent : 'center', alignItems : 'center', justifyContent : 'center'}}>
                <TouchableOpacity style={styles.containerButton} onPress={tomaDocumento} >
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#255000', '#588100']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                    >
                        <Text style={styles.text}>Selecciona un PDF</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                
                {archivoSeleccionado && (
                    <Text>Archivo Seleccionado: {archivoSeleccionado.assets[0].name}</Text>
                )}
                <TouchableOpacity style={styles.containerButton} onPress={subidaArchivo} >
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#255000', '#588100']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                    >
                        <Text style={styles.text}>Subir archivo</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    
            </View>
        )
    }


}

const styles = StyleSheet.create({
    containerButton: {
        alignItems: 'center',
        width: width * 0.5,
        marginTop: 20,
        margin: height * 0.009,
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
      width: '80%',
      height: 40,
      borderRadius: 25,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
  },
});

export default SubidaDocumentosProfesional;