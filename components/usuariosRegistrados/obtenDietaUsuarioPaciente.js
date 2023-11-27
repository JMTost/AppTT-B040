import React from "react";
import infoApp from '../../infoApp.json';

const obtenDietaUsuarioPaciente = async () => {
    let url = `${infoApp.APIurl}/alimentodieta/busqueda/paciente/${infoApp.usuarioPaciente.idUsuario}`;
    const respuesta = await fetch(`${infoApp.APIurl}/alimentodieta/busqueda/paciente/${infoApp.usuarioPaciente.idUsuario}`);
    if(respuesta.ok){
        const salida = await respuesta.json();
        //console.log("Dieta: ", salida.objeto);
        for(let i = 0; i < salida.objeto.comidas.length; i++){
            infoApp.usuarioPaciente.dieta.push(salida.objeto.comidas[i]);
        }
    }else if(respuesta.status === 404){
        const salida = await respuesta.json();
        infoApp.usuarioPaciente.dieta = salida.mensaje;
    }
};

export {obtenDietaUsuarioPaciente};