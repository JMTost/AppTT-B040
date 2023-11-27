import React from "react";
import infoApp from '../../infoApp.json';

const obtenProximaCita = async () => {
    //console.log("dentro de la función obtenCita ")
    if(infoApp.tipo === "profesional"){
        let url = `${infoApp.APIurl}/obtenCitasProfesional/${infoApp.usuarioProfesional.idUsuario}`;
        const respuesta = await fetch(url);
        if(respuesta.ok){
            const salida = await respuesta.json();
            for(let i = 0; i < salida.data.length; i++){
                infoApp.usuarioProfesional.citas.push(salida.data[i]);
            }
        }else if(respuesta.status === 404){
            const salida = await respuesta.json();
            infoApp.usuarioProfesional.citas = salida.mensaje;
        }
    }else if(infoApp.tipo === "paciente"){

        let url = `${infoApp.APIurl}/obtenCitasPaciente/${infoApp.usuarioPaciente.idUsuario}`;
        const respuesta = await fetch(url);
        if(respuesta.ok){
            const salida = await respuesta.json();
            for(let i = 0; i < salida.data.length; i++){
                infoApp.usuarioPaciente.citas.push(salida.data[i]);
            }
            //console.log("info",  salida);
        }else if(respuesta.status === 404){
            const salida = await respuesta.json();
            infoApp.usuarioPaciente.citas = salida.mensaje;
        }
    }
}

export {obtenProximaCita};