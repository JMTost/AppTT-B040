import React, { useEffect, useState } from "react";
import {ScrollView, View, Text, Dimensions} from 'react-native';
import GraficayTabla from "./GraficasyTablas";
import infoApp from '../../infoApp.json';

const {width, height} = Dimensions.get('window');

const InfoApiMed = () =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    useEffect( () => {
      obtenMediciones();
    }, []);
  
    const obtenMediciones = async () => {
      try {
        const response = await fetch(`${infoApp.APIurl}/busquedaMediciones/${infoApp.usuarioPaciente.idUsuario}`, {
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
        <View style={{flex : 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Gráficas y tablas del paciente: </Text>
          {
            <GraficayTabla data = {data} />
          }
        </View>
      );
    }else{
      return (
        <View style={{flex : 1,  alignContent : 'center', justifyContent: 'center', alignItems: 'center', paddingTop : 50, backgroundColor : 'white'}}>
        <Text style={{fontSize : width * 0.05, paddingBottom : 10}}>No hay información que mostrar</Text>
        {
          //console.log(infoApp)
        }
    {
      /*
            {Object.keys(data).map(
            (key)=>(
              <GraficayTabla key={key} titulo={key} data={data[key]} etiqueta={data.fecha} />
            )
          )}
          */
    }
        </View>
      );
    }
  };

  export default InfoApiMed;