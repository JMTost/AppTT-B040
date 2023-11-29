import React from "react";
import infoApp from '../../infoApp.json';

const obtenPacientesParaProfesional = async () => {
    try {
        const respuesta = await fetch(`${infoApp.APIurl}/obtenPacientesProfesional/${infoApp.usuarioProfesional.idUsuario}`);
        if(respuesta.ok){
            const salida = await respuesta.json();
            //console.log(salida);
            infoApp.usuarioProfesional.pacientes = salida.data;
        }else if(respuesta.status === 404){
            const salida = await respuesta.json();
            infoApp.usuarioProfesional.pacientes = salida.mensaje;
        }
    } catch (error) {
        console.error("Error en la función almacenaImagen: ", error);
        throw error;
    }
}

export {obtenPacientesParaProfesional};