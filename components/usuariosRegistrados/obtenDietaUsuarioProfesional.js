import React from "react";
import infoApp from '../../infoApp.json';

const obtenDietaUsuarioProfesional = async () => {
    let url = `${infoApp.APIurl}/alimentodieta/busqueda/comidas/profesional/${infoApp.usuarioProfesional.idUsuario}`;
    const respuesta = await fetch(url);
    if(respuesta.ok){
        const salida = await respuesta.json();
        console.log(salida)
        //infoApp.usuarioProfesional.dieta.push(salida);
    }else if(respuesta.status === 404){
        const salida = await respuesta.json();
        infoApp.usuarioProfesional.dieta.push(salida);
    }
};

export {obtenDietaUsuarioProfesional};
//192.168.100.9:3000/alimentodieta/busqueda/comidas/profesional/0