import React from "react";
import infoApp from '../../infoApp.json';

const obtenRutinaEjerciciosProfesional = async () => {
    try {
        const respuesta = await fetch(`${infoApp.APIurl}/obtenEjerciciosRutinaProfesional/${infoApp.usuarioProfesional.idUsuario}`);
        if(respuesta.ok){
            const salida = await respuesta.json();
            infoApp.usuarioProfesional.ejercicios = salida.objeto.data;
        }else if(respuesta.status === 404){
            const salida = await respuesta.json();
            infoApp.usuarioProfesional.ejercicios = salida.mensaje;
        }
    } catch (error) {
        console.error("Error en la función almacenaImagen: ", error);
        throw error;
    }
};

export {obtenRutinaEjerciciosProfesional};