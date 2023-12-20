import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView} from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { Table, Row, Rows } from 'react-native-table-component';

/*
    SE REALIZA LA IMPRESIÓN DE LAS GRAFICAS Y TABLAS, SE MOSTRARÁN DE FORMA ALTERNADA
        PRIMERO LA GRAFICA Y DESPUES UNA TABLA CON LOS DATOS DE OTRA MEDICIÓN
*/

const GraficayTabla = ({data}) => {
    const longitud = Object.keys(data).length;
    //console.log(longitud)
    if(longitud > 0){ 
        
    const graficaData = {
        abdominal : {
            labels : data.fecha,
            datasets : [
                {
                    data : data.abdominal,
                    color : (opacity = 1) => `rgba(0,120, 255, ${opacity})`,
                    strokeWidth : 2,
                }
            ]
        },
        axiliar : {
            labels : data.fecha,
            datasets : [
                {
                    data : data.axiliar,
                    color : (opacity = 1) => `rgba(0,120, 255, ${opacity})`,
                    strokeWidth : 2,
                },
            ]
        },
        bicipital : {
            labels : data.fecha,
            datasets : [
                {
                    data : data.bicipital,
                    color : (opacity = 1) => `rgba(0,120, 255, ${opacity})`,
                    strokeWidth : 2,
                },
            ]
        },
        cintura : {
            labels : data.fecha,
            datasets : [
                {
                    data : data.cintura,
                    color : (opacity = 1) => `rgba(0,120, 255, ${opacity})`,
                    strokeWidth : 2,
                },
            ]
        },
        muslo : {
            labels : data.fecha,
            datasets : [
                {
                    data : data.muslo,
                    color : (opacity = 1) => `rgba(0,120, 255, ${opacity})`,
                    strokeWidth : 2,
                },
            ]
        },
        pantorrilla : {
            labels : data.fecha,
            datasets : [
                {
                    data : data.pantorrilla,
                    color : (opacity = 1) => `rgba(0,120, 255, ${opacity})`,
                    strokeWidth : 2,
                },
            ]
        },
        peso : {
            labels : data.fecha,
            datasets : [
                {
                    data : data.peso,
                    color : (opacity = 1) => `rgba(0,120, 255, ${opacity})`,
                    strokeWidth : 2,
                },
            ]
        },
        subescapular : {
            labels : data.fecha,
            datasets : [
                {
                    data : data.subescapular,
                    color : (opacity = 1) => `rgba(0,120, 255, ${opacity})`,
                    strokeWidth : 2,
                },
            ]
        },
        suprailiaco : {
            labels : data.fecha,
            datasets : [
                {
                    data : data.suprailiaco,
                    color : (opacity = 1) => `rgba(0,120, 255, ${opacity})`,
                    strokeWidth : 2,
                },
            ]
        },
        toracica : {
            labels : data.fecha,
            datasets : [
                {
                    data : data.toracica,
                    color : (opacity = 1) => `rgba(0,120, 255, ${opacity})`,
                    strokeWidth : 2,
                },
            ]
        },
        triceps : {
            labels : data.fecha,
            datasets : [
                {
                    data : data.triceps,
                    color : (opacity = 1) => `rgba(0,120, 255, ${opacity})`,
                    strokeWidth : 2,
                },
            ]
        }
    };
    const tableHead = ["Fecha", "Medición"];
    const tablaAxiliar = data.fecha.map((fecha, index) => [fecha, data.axiliar[index]]);
    const tablaCintura = data.fecha.map((fecha, index) => [fecha, data.cintura[index]]);
    const tablaPantorilla = data.fecha.map((fecha, index) => [fecha, data.pantorrilla[index]]);
    const tablaSubescapular = data.fecha.map((fecha, index) => [fecha, data.subescapular[index]]);
    const tablaToracica = data.fecha.map((fecha, index) => [fecha, data.toracica[index]]);
    /*
    const fecha = data.fecha;
    const abdominal = data.abdominal;
    const axiliar = data.axiliar;
    const bicipital = data.bicipital;
    const cintura = data.cintura;
    const muslo = data.muslo;
    const pantorrilla = data.pantorrilla;
    const peso = data.peso;
    const subescapular = data.subescapular;
    const suprailiaco = data.suprailiaco;
    const toracica = data.toracica;
    const triceps = data.triceps;
    console.log(Object.keys(data).length)
    */
   
    return (
        <View style={{ marginVertical : 20, paddingBottom : 20}}>

            <Text style={{padding : 5, fontWeight: 'bold'}}>Abdominal</Text>
            <LineChart key={"ABDOMINAL"} data={graficaData.abdominal} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16, paddingTop : 10, paddingBottom : 5}} />

            <Text style={{padding : 5, fontWeight: 'bold'}}>Axiliar</Text>
            <Table borderStyle={{borderWidth : 1, borderColor : '#C1C0B9'}} >
                <Row data={tableHead} style={{height : 20, backgroundColor : '#f1f8ff'}}/>
                <Rows data={tablaAxiliar} />
            </Table>

            <Text style={{padding : 5, fontWeight: 'bold'}}>Bicipital</Text>
            <LineChart key={"BICIPITAL"} data={graficaData.bicipital} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16, paddingTop : 10, paddingBottom : 5}} />

            <Text style={{padding : 5, fontWeight: 'bold'}}>Cintura</Text>
            <Table borderStyle={{borderWidth : 1, borderColor : '#C1C0B9'}} >
                <Row data={tableHead} style={{height : 20, backgroundColor : '#f1f8ff'}}/>
                <Rows data={tablaCintura} />
            </Table>

            <Text style={{padding : 5, fontWeight: 'bold'}}>Muslo</Text>
            <LineChart key={"MUSLO"} data={graficaData.muslo} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16, paddingTop : 10, paddingBottom : 5}} />

            <Text style={{padding : 5, fontWeight: 'bold'}}>Pantorrilla</Text>
            <Table borderStyle={{borderWidth : 1, borderColor : '#C1C0B9'}} >
                <Row data={tableHead} style={{height : 20, backgroundColor : '#f1f8ff'}}/>
                <Rows data={tablaPantorilla} />
            </Table>

            <Text style={{padding : 5, fontWeight: 'bold'}}>Peso</Text>
            <LineChart key={"PESO"} data={graficaData.peso} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16, paddingTop : 10, paddingBottom : 5}} />

            <Text style={{padding : 5, fontWeight: 'bold'}}>Subescapular</Text>
            <Table borderStyle={{borderWidth : 1, borderColor : '#C1C0B9'}} >
                <Row data={tableHead} style={{height : 20, backgroundColor : '#f1f8ff'}}/>
                <Rows data={tablaSubescapular} />
            </Table>

            <Text style={{padding : 5, fontWeight: 'bold'}}>Suprailiaco</Text>
            <LineChart key={"SUPRAILIACO"} data={graficaData.suprailiaco} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16, paddingTop : 10, paddingBottom : 5}} />
            
            <Text style={{padding : 5, fontWeight: 'bold'}}>Toracica</Text>
            <Table borderStyle={{borderWidth : 1, borderColor : '#C1C0B9'}} >
                <Row data={tableHead} style={{height : 20, backgroundColor : '#f1f8ff'}}/>
                <Rows data={tablaToracica} />
            </Table>
            
            <Text style={{padding : 5, fontWeight: 'bold'}}>Triceps</Text>
            <LineChart key={"TRICEPS"} data={graficaData.triceps} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16, paddingTop : 10, paddingBottom : 5}} />
            {
            /*
            <Table borderStyle={{borderWidth : 1, borderColor : '#C1C0B9'}} >
                <Row data={tableHead} style={{height : 20, backgroundColor : '#f1f8ff'}}/>
                <Rows data={tableAbdominal} />
            </Table>
            <Text style={{padding : 5, fontWeight: 'bold'}}>Axiliar</Text>
            <LineChart data={graficaData.axiliar} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
            <Text style={{padding : 5, fontWeight: 'bold'}}>Bicipital</Text>
            <LineChart data={graficaData.bicipital} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
            <Text style={{padding : 5, fontWeight: 'bold'}}>Cintura</Text>
            <LineChart data={graficaData.cintura} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
            <Text style={{padding : 5, fontWeight: 'bold'}}>Muslo</Text>
            <LineChart data={graficaData.muslo} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
            <Text style={{padding : 5, fontWeight: 'bold'}}>Pantorrilla</Text>
            <LineChart data={graficaData.pantorrilla} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
            <Text style={{padding : 5, fontWeight: 'bold'}}>Peso</Text>
            <LineChart data={graficaData.peso} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
            <Text style={{padding : 5, fontWeight: 'bold'}}>Subescapular</Text>
            <LineChart data={graficaData.subescapular} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
            <Text style={{padding : 5, fontWeight: 'bold'}}>Suprailiaco</Text>
            <LineChart data={graficaData.suprailiaco} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
            <Text style={{padding : 5, fontWeight: 'bold'}}>Toracica</Text>
            <LineChart data={graficaData.toracica} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
            <Text style={{padding : 5, fontWeight: 'bold'}}>Triceps</Text>
            <LineChart data={graficaData.triceps} width={300} height={400} verticalLabelRotation={90} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
            */
            }
        </View>
       );
   }else{
    return (
        <View style={{backgroundColor : 'white'}}>
            <Text>No hay información que mostrar</Text>
        </View>
    );
   }
}
/*
const GraficayTabla = ({titulo, data, etiqueta}) => {
    //obtenemos la información de la grafica y generamos la forma de impresion
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval( () => {
            if(currentIndex < etiqueta.length -1){
                setCurrentIndex((prevIndex) => prevIndex +1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [currentIndex, etiqueta.length]);
    const graficaData = {
        labels : etiqueta.slice(0, currentIndex +1),
        datasets : [
            {
                data : data.slice(0, currentIndex +1),
                color : (opacity = 1) => `rgba(0, 120, 255, ${opacity})`,
                strokeWidth : 2,
            }
        ]
    };

    
    // const graficaData = {
    //     labels : etiqueta,
    //     datasets : [//información para realizar la impresión
    //         {
    //             data : data,
    //             color : (opacity = 1) => `rgba(0, 120, 255, ${opacity})`,
    //             strokeWidth : 2,
    //         },
    //     ],
    // };
    
    //console.log(graficaData);
    const tableHead = ['Fecha', 'Medición'];//encabezados de la tabla
    const tableData = etiqueta.map((label, index) => [label, data[index]]);//obtenemos los datos que deseamos tabular
    return (
        <View style={{marginVertical : 20}}>
            <Text>{titulo}</Text>
            <LineChart data={graficaData} width={300} height={200} verticalLabelRotation={110} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
        </View>
    );
};
*/
export default GraficayTabla;
/*
            <LineChart data={graficaData} width={300} height={200} verticalLabelRotation={110} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
            {
                //creamos la grafica
            }
            <LineChart data={graficaData} width={300} height={400} verticalLabelRotation={110} chartConfig={{backgroundGradientFrom:'#fff', backgroundGradientTo:'#fff', color:(opacity=1)=>`rgba(0,0,0,${opacity})`, labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`, rotatedLabel: true}} style={{borderRadius : 16}} />
            {
                //creamos la tabla 
            }
            <Table borderStyle={{borderWidth : 1, borderColor : '#C1C0B9'}}>
                <Row data={tableHead} style={{height : 40, backgroundColor : '#f1f8ff'}} textStyle={{margin : 6}}/>
                <Rows data={tableData} textStyle={{margin : 6}}/>
            </Table>
 */