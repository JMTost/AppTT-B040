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

    if(loading){
        return(
            <ScrollView>
                <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', backgroundColor : 'white'}}>
                <Text style={{fontWeight : 'bold'}}>Graficas del paciente {nombreC}: </Text>
                {
                    <GraficayTabla data = {data} />
                }
                </View>
            </ScrollView>
        );
    }else{
        return(
            <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', paddingTop : 50}}>
                <Text>No hay información que mostrar</Text>
            </View>  
        );
    }

};


export default MuestraGraficasProfesioanl;