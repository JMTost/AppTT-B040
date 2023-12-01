import React from "react";
import infoApp from '../../infoApp.json';

const obtenEjercicioRutinas = async () => {
    //console.log(infoApp);
    try {
        const respuesta = await fetch(`${infoApp.APIurl}/obtenEjercicioRutinaPaciente/${infoApp.usuarioPaciente.idUsuario}`);
        if(respuesta.ok){
            const salida = await respuesta.json();
            //console.log("salida json: ", salida)
            for(let i = 0; i < salida.data.length; i++){
                infoApp.usuarioPaciente.ejercicios.push({
                    cantidad : salida.data[i].cantidad,
                    id_rutina : salida.data[i].id_rutina,
                    musculo : salida.data[i].musculo,
                    nombreEjercicio : salida.data[i].nombreEjercicio,
                    fechaInicio : salida.data[i].fechaI,
                    fechaFin : salida.data[i].fechaFin,
                    idVideo : salida.data[i].id_video
                });
                infoApp.usuarioPaciente.idVideosEjercicios.push({
                    id : salida.data[i].id_video
                });
            }
            //console.log("Ejercicios ", infoApp.usuarioPaciente);
        }else if(respuesta.status === 404){
            const salida = await respuesta.json();
            console.log(salida)
            //infoApp.usuarioPaciente.idVideosEjercicios.push(salida.mensaje);
        }else{
            const salida = await respuesta.json();
            console.log(salida)
            //infoApp.usuarioPaciente.idVideosEjercicios.push(salida.mensaje);
        }
        //console.log("fuera del if")
    } catch (error) {
        console.error("Error en la función de obtención de rutina de ejercicios: ", error);
        throw error;
    }
    /*
    try {
        const respuesta = await fetch(`${infoApp.APIurl}/obtenEjerciciosRutinaPaciente/${infoApp.usuarioPaciente.idUsuario}`);
        if(respuesta.ok){
            const json = await respuesta.text();
            console.log(json);
        }else if(respuesta.status === 404){
            const resp = await respuesta.json();
            console.log(resp);
        }
    } catch (error) {
        console.error("Error en la función almacenaImagen: ", error);
        throw error;
    }
    */
}

export {obtenEjercicioRutinas};