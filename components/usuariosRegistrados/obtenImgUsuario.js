import * as FileSystem from 'expo-file-system';
import React, {useEffect} from 'react';
import infoApp from "../../infoApp.json";

//URI DE LA IMAGEN DE USUARIO A ALMACENAR
const carpetaDestino = `${FileSystem.documentDirectory}imagenes/`;
const rutaImg = `${carpetaDestino}user.jpg`;

const almacenaImagen = async () => {
    try {
        let url = ``;
        if(infoApp.tipo === "profesional"){
            url = `${infoApp.APIurl}/obtenImgProfesional/${infoApp.idUsuario}`;
        }else if(infoApp.tipo === 'paciente'){
            url = `${infoApp.APIurl}/obtenImgPaciente/${infoApp.idUsuario}`;
        }
        //Verificamos que la carpeta exista
        await FileSystem.makeDirectoryAsync(carpetaDestino, {intermediates : true});
        //Realizamos la solicitud a la API
        const respuesta = await fetch(url);
        //verificamos si la solicitud fue exitosa
        if(respuesta.ok){
            const img = await respuesta.blob();
            const base64String = await blobToBase64(img);
            await FileSystem.writeAsStringAsync(rutaImg, base64String, {encoding : FileSystem.EncodingType.Base64});
            infoApp.urlImagen_usuario = rutaImg;
        }else{
            console.error("Error al realiza la solicitud de la API");
        }
    } catch (error) {
        console.error("Error en la función almacenaImagen: ", error);
        throw error;
    }
}

/*
const almacenaImagen = () =>{
    
    useEffect( () => {
        const obtenImgAPI = async () => {
            let url = ``;
            if(infoApp.tipo === "profesional"){
                url = `${infoApp.APIurl}/obtenImgProfesional/${infoApp.idUsuario}`;
            }else if(infoApp.tipo === 'paciente'){
                url = `${infoApp.APIurl}/obtenImgPaciente/${infoApp.idUsuario}`;
            }
            //Verificamos que la carpeta exista
            await FileSystem.makeDirectoryAsync(carpetaDestino, {intermediates : true});
            //Realizamos la solicitud a la API
            const respuesta = await fetch(url);
            //verificamos si la solicitud fue exitosa
            if(respuesta.ok){
                const img = await respuesta.blob();
                const base64String = await blobToBase64(img);
                await FileSystem.writeAsStringAsync(rutaImg, base64String, {encoding : FileSystem.EncodingType.Base64});
                infoApp.urlImagen_usuario = rutaImg;
            }else{
                console.error("Error al realiza la solicitud de la API");
            }
        };
        obtenImgAPI();
    }, []);   

    return null;
    
}
*/

// Función para convertir un Blob a un string base64
const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

export {almacenaImagen};
/*
const almacenaImagen = async (data_response) => {
    try {
      //decodificamos la imagen a base 64
      const imagenData = data_response.img.data;
      //creamos la carpeta en caso de que no exista
      const carpetaImg = `${FileSystem.documentDirectory}imagenes/`;
      await FileSystem.makeDirectoryAsync(carpetaImg, {intermediates : true});
      //almacenamos la imagen
      const rutaImg = `${carpetaImg}user.jpg`;
      await FileSystem.writeAsStringAsync(rutaImg, imagenData);
      console.log("Imagen guardada: ", rutaImg);
      infoApp.rutaImg = rutaImg;
    } catch (error) {
      console.error("Error al guardar la imagen", error);
    }
  };
  almacenaImagen(data_response);
  */