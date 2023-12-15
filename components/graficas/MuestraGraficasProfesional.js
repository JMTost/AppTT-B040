import React, { useEffect, useState } from "react";
import {ScrollView, View, Text} from 'react-native';
import GraficayTabla from "./GraficasyTablas";
import infoApp from '../../infoApp.json';

const MuestraGraficasProfesioanl = ({navigation, route}) => {
    const {id, nombreC} = route.params;
    console.log(id);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    useEffect( () => {
        obtenMediciones();
    }, []);

    const obtenMediciones = async () => {
        try {
            const response = await fetch(`${infoApp.APIurl}/busquedaMediciones/${id}`, {
            method : 'GET',
            });
            //console.log(response)
            if(response.status != 404){
                const info = await response.json();
                console.log("info", info)
                setData(info.objeto);
                //setLoading(true);
            }else setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("error: ", error);
        }
    };

    
    //variables para realizar el algoritmo
    const aIniciales = [0,0,0];
    const learningRate = 0.00001;
    const tolerance = 1e-6;
    const maxIterations = 100;
    // Definir la función que se quiere minimizar
    function objectiveFunction(a, x0, y0, x1) {
        return Math.pow(a[0] + a[1] * x0 + a[2] * y0 - x1, 2);
    }
    
    function gradient(a, x0, y0, x1){
        const derivacionesParciales = [
            2 * (a[0] + a[1] * x0 + a[2] * y0 - x1),
            2 * x0 * (a[0] + a[1] * x0 + a[2] * y0 - x1),
            2 * y0 * (a[0] + a[1] * x0 + a[2] * y0 - x1)
        ];
        
        return derivacionesParciales;
    }

    //metodo para realizar la minimizaxión sin restricciones
    function gradientDescendiente(a, x0, y0, x1, learningRate, tolerance, maxIterations) {
        let currentPoint = a.slice();

        for (let i = 0; i < maxIterations; i++) {
            const gradientValue = gradient(currentPoint, x0, y0, x1);

            // Actualizar el punto utilizando el descenso de gradiente
            for (let j = 0; j < currentPoint.length; j++) {
                currentPoint[j] -= learningRate * gradientValue[j];
            }

            // Verificar si la diferencia entre iteraciones es menor que la tolerancia
            if (Math.abs(objectiveFunction(currentPoint, x0, y0, x1) - objectiveFunction(a, x0, y0, x1)) < tolerance) {
                break;
            }
        }
        return currentPoint;
    }

    if(loading && data !== undefined){
        if(data.hasOwnProperty('peso')){
            const datosPeso = [];
            const datosCintura = [];

            let ultimoIndice = data.abdominal.length - 1 ;
            let segundoUltimo = ultimoIndice - 1;
            datosPeso.push(data.peso[segundoUltimo]);
            datosPeso.push(data.peso[ultimoIndice]);
            datosCintura.push(data.cintura[segundoUltimo]);
            datosCintura.push(data.cintura[ultimoIndice]);
            const resultado = gradientDescendiente(aIniciales, datosPeso[0], datosCintura[0], datosPeso[1], learningRate, tolerance, maxIterations);
            const prediccionPeso = (resultado[0] + resultado[1] * datosPeso[1] + resultado[2] * datosCintura[1]);

            const resultadoCintura = gradientDescendiente(aIniciales, datosCintura[0], datosPeso[0], datosCintura[1], learningRate, tolerance, maxIterations);
            const preduccionCintura = (resultadoCintura[0] + resultadoCintura[1] * datosCintura[1] + resultadoCintura[2] * datosPeso[1]);
            console.log("Resultado de la operación: ", prediccionPeso, preduccionCintura);
            return(
                <ScrollView>
                    <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', backgroundColor : 'white'}}>
                    <Text style={{fontWeight : 'bold'}}>Gráficas del paciente {nombreC}: </Text>
                    <Text style={{fontWeight : 'bold'}}>Predicciones del peso y cintura: </Text>
                    <Text>Peso: {prediccionPeso.toFixed(1)} kg</Text>
                    <Text>Cintura: {preduccionCintura.toFixed(1)} cm</Text>
                    {
                        <GraficayTabla data = {data} />
                    }
                    </View>
                </ScrollView>
            );
        }
    }else{
        return(
            <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', paddingTop : 50}}>
                <Text>No hay información que mostrar</Text>
            </View>  
        );
    }

};


export default MuestraGraficasProfesioanl;