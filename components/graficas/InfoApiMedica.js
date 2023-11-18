import React, { useEffect, useState } from "react";
import {ScrollView, View, Text} from 'react-native';
import GraficayTabla from "./GraficasyTablas";
import infoApp from '../../infoApp.json';

const InfoApiMed = () =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    useEffect( () => {
      obtenMediciones();
    }, []);
  
    const obtenMediciones = async () => {
      try {
        const response = await fetch(`${infoApp.APIurl}/busquedaMediciones/2`, {
          method : 'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify({id : 2})
        });
        if(response.status != 404){const info = await response.json();
          setData(info.objeto);
          setLoading(true);
        }else setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error: ", error);
      }
    };
    if(loading){
      return(
        <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', paddingTop : 30}}>
          <Text>Graficas del paciente: </Text>
          {
            <GraficayTabla data = {data} />
          }
        </View>
      );
    }else{
      return (
        <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', paddingTop : 30}}>
        <Text>No hay información que mostrar</Text>
        {
          console.log(infoApp)
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