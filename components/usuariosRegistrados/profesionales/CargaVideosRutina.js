import  React, { useEffect, useState } from 'react';
import { Text, View, Alert, Button, ScrollView, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import infoApp from '../../../infoApp.json';
import { Audio } from 'expo-av';    //VARIABLE PARA COMPROBAR LA LONGITUD DEL VIDEO

const CargaVideosRutina = () => {

    //VARIABLES PARA VISUALIZAR SI CUENTA CON VIDEOS CARGADOS
    const [dataVideos, setDataVideos] = useState([]);
    const [loadingVideos, setLoadingVideos] = useState(false);
    //VARIABLES PARA ELIMINAR EL VIDEO
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [archivoVideoSeleccionado, setArchivoVideoSeleccionado] = useState(null);
 
    useEffect( () => {
        obtenInfoVideosCargados();
    }, []);

    const obtenInfoVideosCargados = async () => {
        try {
            const responseVideos = await fetch(`${infoApp.APIurl}/obtenListaVideoProfesional/${infoApp.usuarioProfesional.idUsuario}`, {
                method : 'GET'
            });
            //console.log(responseVideos)
            if(responseVideos.ok){
                const info = await responseVideos.json();
                setDataVideos(info);
                setLoadingVideos(true);
            }else if(responseVideos.status === 404){
                const info = await responseVideos.json();
                setLoadingVideos(true);
                setDataVideos(info);
            }else{
                const info = await responseVideos.json();
                setLoadingVideos(false);
                setDataVideos(info);
            }
        } catch (error) {
            console.log("error: ", error);
            setLoadingVideos(false); 
        }
    };

    const tomaVideo = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type : '*/*',
            });
            if(result.canceled === false){
                //console.log(result)
                //verificamos la duracion
                const videoUri = result.assets[0].uri;
                const duracion = await obtenDuracionVideo(videoUri);
                //console.log("duracion: ", duracion)
                if(duracion <= 16){
                    setArchivoVideoSeleccionado(result);
                }else{
                    Alert.alert("Error", "El video debe ser menor o igual a 15 segundos");
                }
            }
        } catch (error) {
            console.error("Error seleccionando documento: ", error);
        }
    };

    const obtenDuracionVideo = async (uri) => {
        const {sound, status} = await Audio.Sound.createAsync(
            {uri}, {shouldPlay : false}
        );
        //console.log(status);
        
        if(status.isLoaded){
            //console.log("tiempo", status.durationMillis, status.durationMillis/1000)
            return status.durationMillis/1000;
        }else{
            console.error("Error cargando el video");
            return 0;
        }
        
    };

    const subidaArchivoVideo = async () => {
        try {
            if(archivoVideoSeleccionado){
                const formData = new FormData();
                formData.append('video', {
                    uri : archivoVideoSeleccionado.assets[0].uri,
                    name : archivoVideoSeleccionado.assets[0].name,
                    type : 'video/mp4'
                });
                formData.append("id", infoApp.usuarioProfesional.idUsuario);
                const response = await fetch(`${infoApp.APIurl}/altaVideoProfesional`, {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'multipart/form-data',
                    },
                    body : formData,
                });
                //console.log(response)
                if(response.ok){
                    const json = await response.json();
                    Alert.alert("Exito", json.mensaje);
                    setArchivoVideoSeleccionado(null);
                }else{
                    const error = await response.text();
                    console.log(error);
                }
            }
        } catch (error) {
            console.error("catch", error);
        }
    };

    const handleEliminaVideo = async () => {
        console.log(value);
        //logica de eliminacion del video de la BD
    }

    if(loadingVideos){
        if(Object.keys(dataVideos).includes("mensaje")){//no hay datos
            return(
                <View style={{ alignContent : 'center', alignItems : 'center', justifyContent : 'center', flex : 1}}>
                <Text>{dataVideos.mensaje}</Text>
                    <Button title="Selecciona un video" onPress={tomaVideo} />
                    {archivoVideoSeleccionado && (
                        <Text>Archivo Seleccionado: {archivoVideoSeleccionado.assets[0].name}</Text>
                    )}
                    <Button title="Subir archivo" onPress={subidaArchivoVideo} />
                </View>
            );
        }else if(Object.keys(dataVideos).includes("data")){
            const elementos = [], data = [];
            infoApp.usuarioProfesional.idVideos = [];
            infoApp.usuarioProfesional.nombreVideos = [];
            for(let i = 0; i < dataVideos.data.length; i++){
                infoApp.usuarioProfesional.idVideos.push(dataVideos.data[i].id_video);
                infoApp.usuarioProfesional.nombreVideos.push(dataVideos.data[i].nombre);
                elementos.push(
                    <Text key={i}>{dataVideos.data[i].nombre}</Text>
                );
                data.push({
                    label : dataVideos.data[i].nombre,
                    value : dataVideos.data[i].id_video
                });
            }
            //console.log("Data de los id del infoApp", infoApp.usuarioProfesional.idVideos);
            //console.log(infoApp.usuarioProfesional)
            return(
                <ScrollView contentContainerStyle={{ alignContent : 'center', alignItems : 'center', justifyContent : 'center', flex : 1}}>
                    <Text>Archivos cargados: </Text>
                    {elementos}
                    <Text style={{paddingTop : 10}}>Si desea eliminar un video, seleccionelo</Text>
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
                        placeholder={!isFocus ? 'Selecciona el video' : '...'}
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
                    {setValue && <Button title='Eliminar' onPress={handleEliminaVideo}></Button>}
                    <Button title="Selecciona un video" onPress={tomaVideo} />
                    {archivoVideoSeleccionado && (
                        <Text>Archivo Seleccionado: {archivoVideoSeleccionado.assets[0].name}</Text>
                    )}
                    {archivoVideoSeleccionado && <Button title="Subir archivo" onPress={subidaArchivoVideo} />}
                </ScrollView>
            );
        }else{
            <View style={{ alignContent : 'center', alignItems : 'center', justifyContent : 'center', flex : 1}}>
                <Button title="Selecciona un video" onPress={tomaVideo} />
                {archivoVideoSeleccionado && (
                    <Text>Archivo Seleccionado: {archivoVideoSeleccionado.assets[0].name}</Text>
                )}
                <Button title="Subir archivo" onPress={subidaArchivoVideo} />
            </View>
        }
    }else{
        console.log("nada")
    }
};

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        width: 330,
        backgroundColor: 'white', // Color de fondo del campo de entrada
        paddingStart: 30,
        borderRadius: 30,
        paddingHorizontal: 20,
        marginTop:10,
      },
      video: {
        //alignSelf: 'center',
        width: 200,
        height: 300,
      },
      buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
});


export default CargaVideosRutina;