import React, {useState, useEffect} from "react";
import infoApp from '../../../infoApp.json';
import { ScrollView, View, Text, TextInput, Button, Alert, StyleSheet, FlatList} from "react-native";
import {Dropdown} from 'react-native-element-dropdown';
import {ExpandableView} from '@pietile-native-kit/expandable-view';

const FormularioExpedienteClinico = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [show, setShow] = useState(false);//enfermedades paciente
    const [showFam, setShowFam] = useState(false);//enfermedades familiar

    const [estatura, setEstatura] = useState('');
    const [ocupacion, setOcupacion] = useState('');
    const [imc, setImc] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [alergias, setAlergias] = useState('');
    const [medicamentos, setMedicamentos] = useState('');
    const [enfermedades, setEnfermedades] = useState([]);
    const [enfermedadesFam, setEnfermedadesFam] = useState([]);
    const [enfermedadesOptions, setEnfermedadesOptions] = useState(null);
    const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState('');
    const [enfermedadSeleccionadaFam, setEnfermedadSeleccionadaFam] = useState('');

    const [horaD, setHoraD] = useState('');
    const [horaS, setHoraS] = useState('');
    const [TextdescFisica, setTextdescFisica] = useState('');
    const [TextdescRutina, setTextdescRutina] = useState('');

    const [alimentosMconsumidos, setAlimentoMconsumidos] = useState('');
    const [alimentosAlergia, setAlimentosAlegia] = useState('');
    const [cantidadAgua, setCantidadAgua] = useState('');
    const [cantidadComidas, setCantidadComidas] = useState('');
    const [cantidadColaciones, setCantidadColaciones] = useState('');
    const [horaDesayuno, setHoraDesayuno] = useState('');
    const [horaComida, setHoraComida] = useState('');
    const [horaCena, setHoraCena] = useState('');
    
    useEffect( () => {
        const fetchEnfermedades = async () => {
            try {
                const respuesta = await fetch(`${infoApp.APIurl}/obtenCatalogoEnfermedades`);
                if(respuesta.ok){
                    const json = await respuesta.json();
                    setEnfermedadesOptions(json)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchEnfermedades();
    }, []);

    const agregaEnfermedad = () => {
        //agregamos la enfermedad seleccionada a la lista
        setEnfermedades([...enfermedades, enfermedadSeleccionada]);
        //limpiamos la seleccion actual
        setEnfermedadSeleccionada('');
    };

    const agregaEnfermedadFam = () => {
        //agregamos la enfermedad seleccionada a la lista de familiares
        setEnfermedadesFam([...enfermedadesFam, enfermedadSeleccionadaFam]);
        //limpiamos la seleccion actual
        setEnfermedadSeleccionadaFam('');
    }

    const eliminaUltimoElemento = () => {
        enfermedades.pop();
    }
    const eliminaUltimoElementoFam = () => {
        enfermedadesFam.pop();
    }

    let enfermedadesAPI = [];
    if(enfermedadesOptions != null){
        //console.log(enfermedadesOptions)
        for(let i = 0; i < enfermedadesOptions.data.length; i++){
            enfermedadesAPI.push({
                label : enfermedadesOptions.data[i].descripcion,
                value : enfermedadesOptions.data[i].id
            });
        }
        //console.log(enfermedadesAPI)
    return (
        <ScrollView style = {styles.container}>
            <View style={styles.content}>
            {/*DATOS PARA infompaciente */}
                <Text style={styles.subtitle}>Datos para crear el expediente clinico</Text>
                <Text style={styles.textoCampo}>Estatura : </Text>
                <TextInput style={styles.input} value={estatura} onChangeText={text => setEstatura(text)} keyboardType="numeric" />
                <Text style={styles.textoCampo}>Ocupación : </Text>
                <TextInput style={styles.input} value={ocupacion} onChangeText={text => setOcupacion(text)} keyboardType="default" />
                <Text style={styles.textoCampo}>IMC : </Text>
                <TextInput style={styles.input} value={imc} onChangeText={text => setImc(text)} keyboardType="numeric" />
                <Text style={styles.textoCampo}>Objetivo : </Text>
                <TextInput style={styles.input} value={objetivo} onChangeText={text => setObjetivo(text)} keyboardType="default" />
                <Text style={styles.textoCampo}>Alergias : </Text>
                <TextInput style={styles.input} value={alergias} onChangeText={text => setAlergias(text)} keyboardType="default" />
                <Text style={styles.textoCampo}>Medicamentos : </Text>
                <TextInput style={styles.input} value={medicamentos} onChangeText={text => setMedicamentos(text)} keyboardType="default" />
                <Text style={styles.textoCampo}>Enfermedades que padece : </Text>
                <Dropdown 
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={enfermedadesAPI}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Selecciona una opción' : '...'}
                    searchPlaceholder="Buscar..."
                    value={enfermedades}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        console.log(item)
                         //agregamos la enfermedad seleccionada a la lista
                        setEnfermedades([...enfermedades, {"enfermedad" : item.label, "id" : item.value}]);
                        //limpiamos la seleccion actual
                        setEnfermedadSeleccionada('');
                    }}
                    
                />
                <Text style={styles.textoCampoBoton} onPress={() => setShow(!show)}>Mostrar enfermedades seleccionadas</Text>
                <ExpandableView show={show} style={styles.contenedorDesplegable}>
                    <Text style={styles.textoDesplegable}>Enfermedades Seleccionadas : </Text>
                    {enfermedades.map((item)=> <Text style={styles.textoDesplegable}>{item.enfermedad}</Text> )}
                    <Button title="Quitar ultimo elemento" onPress={eliminaUltimoElemento} />
                </ExpandableView>
                <Text style={styles.textoCampo}>Enfermedades familiares : </Text>
                <Dropdown 
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={enfermedadesAPI}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Selecciona una opción' : '...'}
                    searchPlaceholder="Buscar..."
                    value={enfermedadesFam}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        console.log(item)
                         //agregamos la enfermedad seleccionada a la lista
                        setEnfermedadesFam([...enfermedadesFam, {"enfermedad" : item.label, "id" : item.value}]);
                        //limpiamos la seleccion actual
                        setEnfermedadSeleccionadaFam('');
                    }}
                />
                <Text style={styles.textoCampoBoton} onPress={() => setShowFam(!showFam)}>Mostrar enfermedades seleccionadas</Text>
                <ExpandableView show={showFam} style={styles.contenedorDesplegable}>
                    <Text style={styles.textoDesplegable}>Enfermedades Seleccionadas : </Text>
                    {enfermedadesFam.map((item)=> <Text style={styles.textoDesplegable}>{item.enfermedad}</Text> )}
                    <Button title="Quitar ultimo elemento" onPress={eliminaUltimoElemento} />
                </ExpandableView>
                {/*DATOS PARA habitoPersonal */}
                <Text style={styles.textoCampo}>Hora en la que despierta</Text>
                <TextInput style={styles.input} value={horaD} onChangeText={text => setHoraD(text)} keyboardType="numbers-and-punctuation" placeholder="Coloca la hora en formato de 24 hrs"/>
                <Text style={styles.textoCampo}>Hora en la que duerme</Text>
                <TextInput style={styles.input} value={horaS} onChangeText={text => setHoraS(text)} keyboardType="numbers-and-punctuation" placeholder="Coloca la hora en formato de 24 hrs"/>
                <Text style={styles.textoCampo}>Descripción física</Text>
                <TextInput
                    style={styles.desc}
                    multiline={true}
                    numberOfLines={3} // Puedes ajustar la cantidad de líneas visibles
                    value={TextdescFisica}
                    placeholder="Escribe aquí la descripción física"
                    onChangeText={(text) => setTextdescFisica(text)}
                />
                <Text style={styles.textoCampo}>Rutina del día que tiene</Text>
                <TextInput
                    style={styles.desc}
                    multiline={true}
                    numberOfLines={3} // Puedes ajustar la cantidad de líneas visibles
                    value={TextdescRutina}
                    placeholder="Escribe aquí la rutina del día"
                    onChangeText={(text) => setTextdescRutina(text)}
                />
                {/*DATOS PARA habitoAlimenticio */}
                //mas consumidos
                <Text style={styles.textoCampo}>Coloca los alimentos más consumidos: </Text>
                <TextInput style={styles.input} keyboardType="default" value={alimentosMconsumidos} onChange={text => setAlimentoMconsumidos(text)} />
                //alimentos alergias
                <Text style={styles.textoCampo}>Coloca los alimentos a los que es alergico: </Text>
                <TextInput style={styles.input} keyboardType="default" value={alimentosAlergia} onChange={text => setAlimentosAlegia(text)} />
                //cantidad de agua
                <Text style={styles.textoCampo}>Coloca la cantidad de agua que consumes: </Text>
                <TextInput style={styles.input} keyboardType="default" value={cantidadAgua} onChange={text => setCantidadAgua} />
                //cantidad de comidas
                <Text style={styles.textoCampo}>Coloca la cantidad de comidas que realizas: </Text>
                <TextInput style={styles.input} keyboardType="default" value={cantidadComidas} onChange={text => setCantidadComidas(text)} />
                //cantidad de colaciones
                <Text style={styles.textoCampo}>Coloca la cantidad de colacioes que realizas: </Text>
                <TextInput style={styles.input} keyboardType="default" value={cantidadColaciones} onChange={text => setCantidadColaciones(text)} />
                //hora de desayuno
                <Text style={styles.textoCampo}>Coloca la hora en la que realizas el desayuno: </Text>
                <TextInput style={styles.input} keyboardType="default" values={horaDesayuno} onChange={text => setHoraDesayuno(text)}/>
                //hora de comida
                <Text style={styles.textoCampo}>Coloca la hora en la que realizas la comida: </Text>
                <TextInput style={styles.input} keyboardType="default" values={horaComida} onChange={text => setHoraComida(text)} />
                //hora de cena
                <Text style={styles.textoCampo}>Coloca la hora en la que realizas la cena: </Text>
                <TextInput style={styles.input} keyboardType="default" values={horaCena} onChange={text => setHoraCena(text)} />
            </View>
        </ScrollView>
    );
}
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //marginTop: 60,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        paddingTop : 30
    },
    title: {
      fontSize: 70,
      fontWeight: 'bold',
      color: '#000',
      marginRight:40,
    },
  
    subtitle:{
      fontSize: 20, 
      color: 'black',
      paddingBottom : 10
      //marginRight:140,
  
    },
  
    input: {
      width: '80%',
      height: 50,
      backgroundColor: 'white', // Color de fondo del campo de entrada
      //paddingStart: 30,
      borderRadius: 30,
      paddingLeft : 10
      //textAlign : 'center',
      //marginTop: 30,
    },
  
    forgotPasword: {
      fontSize: 14,
      color: 'blue',
      marginTop: 20,
      marginStart: 190,
    },
  
    btnregistraPaciente: {
      fontSize: 15,
      color: 'blue',
      marginTop: 10,
      marginLeft: 190,
    },
  
    btnregistraProfesional: {
      fontSize: 15,
      color: 'blue',
      marginTop: 10,
      marginLeft: 110,
    },
  
      //ESTILOS DEL BOTON
      containerBUTTON:{          
        alignItems: 'center', 
        width:250,
        marginTop: 60,
        margin: 60,
      },
  
      textBUTTON: {
        fontSize: 14,
        color: '#fff',  
        fontWeight: 'bold',
      },
      button:{
        width: '80%',
        height: 50,
        borderRadius: 25, 
        padding: 10,        
        alignItems: 'center', 
        justifyContent: 'center'
      },
    //
      //estilos Dropdown
      containerDrop:{
        borderRadius:30,
        flex: 1,
        backgroundColor: '#93ccc6',
      },
    
      dropdown: {
        height: 50,
        width: 330,
        backgroundColor: 'white', // Color de fondo del campo de entrada
        paddingStart: 30,
        borderRadius: 30,
        paddingHorizontal: 20,
        marginTop:10,
      },
    
      placeholderStyle: {
        fontSize: 16,
        color: 'gray',
        borderRadius: 30,
      },
    
      selectedTextStyle: {
        fontSize: 16,
      },
    
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderRadius: 30,
      }, 
      textoCampo : {
        alignSelf : 'baseline', 
        paddingLeft : 20, 
        paddingBottom : 5,
        paddingTop : 5
      },
      contenedorDesplegable : {
        alignSelf : 'baseline',
        paddingLeft : 20,
      },
      textoDesplegable: {
        alignSelf : 'baseline', 
        paddingLeft : 20,
        paddingTop : 5,
        //fontSize : 15
      },
      textoCampoBoton : {
        alignSelf : 'baseline', 
        paddingLeft : 20, 
        paddingBottom : 5,
        paddingTop : 5,
        fontSize : 15,
        fontWeight : 'bold'
      },
      desc : {
        width: '80%',
        height: 80,
        paddingStart: 30,
        borderRadius: 30,
        marginTop: 10,
        backgroundColor : 'white'
      }
  });

export default FormularioExpedienteClinico;