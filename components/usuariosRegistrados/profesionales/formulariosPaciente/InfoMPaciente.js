import React, {useState, useEffect} from "react";
import infoApp from '../../../../infoApp.json';
import { ScrollView, View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import {ExpandableView} from '@pietile-native-kit/expandable-view';

const InfoMPaciente = ({navigation, route}) => {

    const {id} = route.params;
    //console.log("Entramos al formulatio de infoMpaciente")

    const [dataApi, setDataApi] = useState(null);//variable de la respuesta de la api
    const [dataEnfermedades, setDataEnfermedades] = useState(null);
    const [dataEnfermedadesID, setDataEnfermedadesID] = useState(null);
    const [dataEnfermedadesFam, setDataEnfermedadesFam] = useState(null);
    const [dataEnfermedadesFamID, setDataEnfermedadesFamID] = useState(null);

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

    const [datosAPICompleto, setDatosAPICompleto] = useState(null);

    //let id = 2;//2
    //console.log("identificador del paciente: ", id);

    useEffect( () => {

        const fetchObtenInfoMedPaciente = async () => {
            try {
                const respuesta = await fetch(`${infoApp.APIurl}/infoMed/obten/${id}`);
                if(respuesta.ok){//caso donde existe el registro; de modo que hacemos el caso de actualizarlo
                    const json = await respuesta.json();
                    setDataApi("actualiza");
                    //obtenemos los datos y se almacenan de un dato directo
                    setDatosAPICompleto(json.objeto);
                    setEstatura(json.objeto.estatura.toString())
                    setOcupacion(json.objeto.ocupacion.toString());
                    setImc(json.objeto.imc.toString());
                    setObjetivo(json.objeto.objetivo.toString());
                    setAlergias(json.objeto.alergias.toString());
                    setMedicamentos(json.objeto.medicamentosC.toString());
                }else if(respuesta.status === 404){//caso donde debemos realizar la creación del registro
                    const json = await respuesta.json();
                    setDataApi(json.mensaje);
                    fetchEnfermedades();
                }
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchObtenInfoMedPaciente();
    }, []);

    useEffect( () => {
        if(dataApi === "actualiza" && datosAPICompleto != null){
            //console.log("Data completo de la API: ", datosAPICompleto)
            let arregloEnfermedades = [], arregloEnfermedadesFam = [];
            let idsE = [], idsEF = [];
            if(Array.isArray(datosAPICompleto.enferm) ){
                idsE = datosAPICompleto.idEnfermedades.split(',');
                for(let i = 0; i < datosAPICompleto.enferm.length; i++){
                    //console.log({"enfermedad":datosAPICompleto.enferm[i], "id" : idsE[i]});
                    arregloEnfermedades.push({"enfermedad":datosAPICompleto.enferm[i], "id" : idsE[i]});
                    //setEnfermedades([...enfermedades, {"enfermedad":datosAPICompleto.enferm[i], "id" : idsE[i]}]);
                } 
                setEnfermedades(arregloEnfermedades);
            }
            if(Array.isArray(datosAPICompleto.enfermFam)){
                idsEF = datosAPICompleto.idEnfermedadesFam.split(',');
                for(let i = 0; i < datosAPICompleto.enfermFam.length; i++){
                    arregloEnfermedadesFam.push({"enfermedad":datosAPICompleto.enfermFam[i], "id" : idsEF[i]});
                }
                setEnfermedadesFam(arregloEnfermedadesFam);
            }
            /*
            console.log("Ef", arregloEnfermedades);
            console.log("Fam", arregloEnfermedadesFam);
            */
            //setEnfermedades([...enfermedades, arregloEnfermedades]);
            //console.log(enfermedades);
            fetchEnfermedades();
        }
    }, [datosAPICompleto]);

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

    const eliminaUltimoElemento = () => {
        enfermedades.pop();
    }

    const eliminaUltimoElementoFam = () => {
        enfermedadesFam.pop();
    }

    let enfermedadesAPI = [];

    const ButtonGradient = ({titulo : titulo}) => {
        return(
            <TouchableOpacity style={styles.containerBUTTON} onPress={handleCargaAPI} >
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#6cbdb5', '#93ccc6']}   
                    start={{x:0, y:0}}
                    end={{x:1, y:1}} 
                    style={styles.button}      
                >           
                    <Text style={styles.textBUTTON}>{titulo}</Text>
                </LinearGradient>
            </TouchableOpacity>
          );
    };
    //!TERMINAR DE PROGRAMAR LA CARGA Y CREAR EL CASO PARA CUANDO SE TIENE QUE ACTUALIZAR
        //!DE IGUAL MANERA AGREGAR A LA FUNCIONALIDAD DEL USAURIO PROFESIONAL
    const handleCargaAPI = () => {
        if(dataApi === "No hay registro"){
            console.log("boton");
            //vamos a tomar solo los id de las enfermedades y creamos una cadena con dicha informacion
            let regFloat = /\d+\.\d+/;
            if((estatura === '' || regFloat.test(estatura) === false) || (ocupacion === "" || ocupacion.length > 50) || imc === "" || (objetivo === "" || objetivo.length > 100) || (alergias === "" || alergias.length > 150) || (medicamentos === "" || medicamentos.length > 150 )){
                Alert.alert("Error", "Verifica los campos solicitados");
            }else{
                let enfermedadesIDS = [], enfermedadesFamIDS = [];
                console.log(enfermedades);
                if(Array.isArray(enfermedades) && enfermedades.length > 0){
                    //caso donde obtenemos una enfermedad
                    for(let i = 0; i < enfermedades.length; i++){
                        enfermedadesIDS.push(enfermedades[i].id);
                    }
                }else if(Array.isArray(enfermedades) && enfermedades.length <= 0){
                    //no se cuenta con enfermedades dentrod el arreglo, de modo que se coloca como no aplica
                    enfermedadesIDS.push("No aplica");
                }
                if(Array.isArray(enfermedadesFam) && enfermedadesFam.length > 0){
                    //caso donde obtenemos una enfermedad
                    for(let i = 0; i < enfermedadesFam.length; i++){
                        enfermedadesFamIDS.push(enfermedadesFam[i].id);
                    }
                }else if(Array.isArray(enfermedadesFam) && enfermedadesFam.length <= 0){
                    //no se cuenta con enfermedades dentrod el arreglo, de modo que se coloca como no aplica
                    enfermedadesFamIDS.push("No aplica");
                }
                const data = {
                    "id_paciente" : id,
                    "estatura" : estatura,
                    "imc" : imc,
                    "objetivo" : objetivo,
                    "alergias" : alergias,
                    "medicamentosC" : medicamentos,
                    "enferm" : enfermedadesIDS,
                    "enfermFam" : enfermedadesFamIDS
                };
                console.log(data);
            }
        }else{
            let regFloat = /\d+\.\d+/;
            if((estatura === '' || regFloat.test(estatura) === false) || (ocupacion === "" || ocupacion.length > 50) || imc === "" || (objetivo === "" || objetivo.length > 100) || (alergias === "" || alergias.length > 150) || (medicamentos === "" || medicamentos.length > 150 )){
                console.log(estatura === '',  regFloat.test(estatura) === false, ocupacion === "",  ocupacion.length > 50, imc === "",  objetivo === "", objetivo.length > 100,  alergias === "",  alergias.length > 150, medicamentos === "",  medicamentos.length > 150 );
                Alert.alert("Error", "Verifica los campos solicitados");
            }else{
                let enfermedadesIDS = [], enfermedadesFamIDS = [];
                console.log(enfermedades);
                if(Array.isArray(enfermedades) && enfermedades.length > 0){
                    for(let i = 0; i < enfermedades.length; i++){
                        enfermedadesIDS.push(enfermedades[i].id);
                    }
                }else if(Array.isArray(enfermedades) && enfermedades.length <= 0){
                    enfermedadesIDS.push("No aplica");
                }
                if(Array.isArray(enfermedadesFam) && enfermedadesFam.length > 0){
                    for(let i = 0; i < enfermedadesFam.length; i++){
                        enfermedadesFamIDS.push(enfermedadesFam[i].id);
                    }
                }else if(Array.isArray(enfermedadesFam) && enfermedadesFam.length <= 0){
                    enfermedadesFamIDS.push("No aplica");
                }
                const data = {
                        "id_paciente" : id,
                        "estatura" : estatura,
                        "ocupacion" : ocupacion,
                        "imc" : imc,
                        "objetivo" : objetivo,
                        "alergias" : alergias,
                        "medicamentosC" : medicamentos,
                        "enferm" : enfermedadesIDS,
                        "enfermFam" : enfermedadesFamIDS
                };
                console.log(data);
            }
        }
    }
    
    if(dataApi === "No hay registro"){
        //mostramos el formulario
        if(enfermedadesOptions != null){
            for(let i = 0; i < enfermedadesOptions.data.length; i++){
                enfermedadesAPI.push({
                    label : enfermedadesOptions.data[i].descripcion,
                    value : enfermedadesOptions.data[i].id
                });
            }
            return (
                <ScrollView style = {styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.subtitle}>Datos para crear el expediente clinico</Text>
                        <Text style={styles.textoCampo}>Estatura : </Text>
                        <TextInput style={styles.input} value={estatura} onChangeText={text => setEstatura(text)} keyboardType="numbers-and-punctuation" />
                        <Text style={styles.textoCampo}>Ocupación : </Text>
                        <TextInput style={styles.input} value={ocupacion} onChangeText={text => setOcupacion(text)} keyboardType="default" maxLength={50} />
                        <Text style={styles.textoCampo}>IMC : </Text>
                        <TextInput style={styles.input} value={imc} onChangeText={text => setImc(text)} keyboardType="numeric" />
                        <Text style={styles.textoCampo}>Objetivo : </Text>
                        <TextInput style={styles.input} value={objetivo} onChangeText={text => setObjetivo(text)} keyboardType="default" maxLength={100} />
                        <Text style={styles.textoCampo}>Alergias : </Text>
                        <TextInput style={styles.input} value={alergias} onChangeText={text => setAlergias(text)} keyboardType="default" maxLength={150} />
                        <Text style={styles.textoCampo}>Medicamentos que consume: </Text>
                        <TextInput style={styles.input} value={medicamentos} onChangeText={text => setMedicamentos(text)} keyboardType="default" maxLength={150} />
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
                            <Button title="Quitar ultimo elemento" onPress={eliminaUltimoElementoFam} />
                        </ExpandableView>

                        <ButtonGradient titulo={"Carga de información"}></ButtonGradient>

                    </View>
                </ScrollView>
            );
        }
    }else if(dataApi === 'actualiza'){
            if(datosAPICompleto != null){
                let enfermedadesAPI = [];
                if(enfermedadesOptions != null){
                    for(let i = 0; i < enfermedadesOptions.data.length; i++){
                        enfermedadesAPI.push({
                            label : enfermedadesOptions.data[i].descripcion,
                            value : enfermedadesOptions.data[i].id
                        });
                    }
                    /*
                    for(let i = 0; i < dataEnfermedades.length; i++){
                        setEnfermedades({"enfermedades" : dataEnfermedades[i], "id" : ''});
                    }
                    for(let i = 0; i < dataEnfermedadesFam.length; i++){
                        setEnfermedadesFam({"enfermedades" : dataEnfermedadesFam[i], "id" : ''});
                    }
                    */
                    return (
                        <ScrollView style = {styles.container}>
                            <View style={styles.content}>
                                <Text style={styles.subtitle}>Datos para crear el expediente clinico</Text>
                                <Text style={styles.textoCampo}>Estatura : </Text>
                                <TextInput style={styles.input} value={estatura} onChangeText={text => setEstatura(text)}  keyboardType="numeric"/>
                                <Text style={styles.textoCampo}>Ocupación : </Text>
                                <TextInput style={styles.input} value={ocupacion} onChangeText={ocupacion => setOcupacion(ocupacion)} keyboardType="default" />
                                <Text style={styles.textoCampo}>IMC : </Text>
                                <TextInput style={styles.input} value={imc} onChangeText={imc => setImc(imc)} keyboardType="numeric" />
                                <Text style={styles.textoCampo}>Objetivo : </Text>
                                <TextInput style={styles.input} value={objetivo} onChangeText={objetivo => setObjetivo(objetivo)} keyboardType="default" />
                                <Text style={styles.textoCampo}>Alergias : </Text>
                                <TextInput style={styles.input} value={alergias} onChangeText={alergias => setAlergias(alergias)} keyboardType="default" />
                                <Text style={styles.textoCampo}>Medicamentos : </Text>
                                <TextInput style={styles.input} value={medicamentos} onChangeText={medicamentos => setMedicamentos(medicamentos)} keyboardType="default" />
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
                                        //console.log(item)
                                        //agregamos la enfermedad seleccionada a la lista
                                        setEnfermedades([...enfermedades, {"enfermedad" : item.label, "id" : item.value}]);
                                        //limpiamos la seleccion actual
                                        setEnfermedadSeleccionada('');
                                    }}
                                    
                                />
                                <Text style={styles.textoCampoBoton} onPress={() => setShow(!show)}>Mostrar enfermedades seleccionadas</Text>
                                <ExpandableView show={show} style={styles.contenedorDesplegable}>
                                    <Text style={styles.textoDesplegable}>Enfermedades Seleccionadas : </Text>
                                    {enfermedades.map((item)=> <Text style={styles.textoDesplegable} key={item.id}>{item.enfermedad}</Text> )}
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
                                    {enfermedadesFam.map((item)=> <Text key={item.id} style={styles.textoDesplegable}>{item.enfermedad}</Text> )}
                                    <Button title="Quitar ultimo elemento" onPress={eliminaUltimoElementoFam} />
                                </ExpandableView>

                                <ButtonGradient titulo={"Actualizar"}></ButtonGradient>

                            </View>
                        </ScrollView>
                    );
            }
        }
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
        color : 'black'
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
      },
      //ESTILOS DEL BOTON
    containerBUTTON:{          
        alignItems: 'center', 
        width:250,
        marginTop: 30,
        margin: 30,
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
  });

export default InfoMPaciente;