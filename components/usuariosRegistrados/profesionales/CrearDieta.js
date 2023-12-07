import React, {useState, useEffect} from "react";
import infoApp from '../../../infoApp.json';
import { ScrollView, View, Text, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Pressable} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {Dropdown} from 'react-native-element-dropdown';
import { ExpandableView } from "@pietile-native-kit/expandable-view";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const CrearDieta = ({navigation, route}) => {
    const {id} = route.params;

    const [duracion, setDuracion] = useState('');

    const [showProteinasLista, setShowProteinasLista] = useState(false);
    const [showVerdurasLista, setShowVerdurasLista] = useState(false);
    const [showLacteosLista, setShowLacteosLista] = useState(false);
    const [showFrutasLista, setShowFrutasLista] = useState(false);
    const [showGranosLista, setShowGranosLista] = useState(false);
    
    const [selectedTipoAlimento, setSelectedTipoAlimento] = useState(null);
    const [selectedValueProteina, setSelectedValueProteina ] = useState(null);
    const [selectedValueVerdura, setSelectedValueVerdura ] = useState(null);
    const [selectedValueLacteo, setSelectedValueLacteo ] = useState(null);
    const [selectedValueFruta, setSelectedValueFruta ] = useState(null);
    const [selectedValueGrano, setSelectedValueGrano ] = useState(null);

    const [cantidadProteina, setCantidadProteina] = useState('');
    const [cantidadVerdura, setCantidadVerdura] = useState('');
    const [cantidadLacteo, setCantidadLacteo] = useState('');
    const [cantidadFruta, setCantidadFruta] = useState('');
    const [cantidadGrano, setCantidadGrano] = useState('');

    const [tiposComia, setTiposComida] = useState(null);
    const [proteinasAPI, setProteinasAPI] = useState(null);
    const [verdurasAPI, setVerdurasAPI] = useState(null);
    const [lacteosAPI, setLacteosAPI] = useState(null);
    const [frutasAPI, setFrutasAPI] = useState(null);
    const [granosAPI, setGranosAPI] = useState(null);
    
    const [listaProteinasSeleccionadas, setListaProteinasSeleccinadas] = useState([]);
    const [listaVerdurasSeleccionadas, setListaVerdurasSeleccionadas] = useState([]);
    const [listaLacteosSeleccionadas, setListaLacteosSeleccionadas] = useState([]);
    const [listaFrutasSeleccionadas, setListaFrutasSeleccionadas] = useState([]);
    const [listaGranosSeleccionadas, setListaGranosSeleccionadas] = useState([]);
    

    useEffect( () => {
        const fetchObtenAlimentos = async () => {
            try {
                const response = await fetch(`${infoApp.APIurl}/obtenAlimentos`);
                const data = await response.json();
                let tipoComida = [], proteAPI = [], lacteosAPI = [], frutasAPI = [], verdurasAPI = [], granosAPI = [];
                for(let i = 0; i < data.objeto.tiposComida.length; i++){
                    tipoComida.push({
                        label : data.objeto.tiposComida[i].descripcion,
                        value : data.objeto.tiposComida[i].id
                    });
                }
                for(let i = 0; i < data.objeto.proteinas.length; i++){
                    //console.log("-<", data.objeto.proteinas[i]);
                    proteAPI.push({
                        label : data.objeto.proteinas[i].descripcion,
                        value : data.objeto.proteinas[i].id
                    });
                }
                for(let i = 0; i < data.objeto.lacteos.length; i++){
                    //console.log("-<", data.objeto.proteinas[i]);
                    lacteosAPI.push({
                        label : data.objeto.lacteos[i].descripcion,
                        value : data.objeto.lacteos[i].id
                    });
                }
                for(let i = 0; i < data.objeto.frutas.length; i++){
                    //console.log("-<", data.objeto.proteinas[i]);
                    frutasAPI.push({
                        label : data.objeto.frutas[i].descripcion,
                        value : data.objeto.frutas[i].id
                    });
                }
                for(let i = 0; i < data.objeto.verduras.length; i++){
                    //console.log("-<", data.objeto.proteinas[i]);
                    verdurasAPI.push({
                        label : data.objeto.verduras[i].descripcion,
                        value : data.objeto.verduras[i].id
                    });
                }
                for(let i = 0; i < data.objeto.granos.length; i++){
                    //console.log("-<", data.objeto.proteinas[i]);
                    granosAPI.push({
                        label : data.objeto.granos[i].descripcion,
                        value : data.objeto.granos[i].id
                    });
                }
                setTiposComida(tipoComida);
                setProteinasAPI(proteAPI);
                setLacteosAPI(lacteosAPI);
                setFrutasAPI(frutasAPI);
                setVerdurasAPI(verdurasAPI);
                setGranosAPI(granosAPI);
                //setApiMusculos(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchObtenAlimentos();
    }, []);
    let dato, regexNumero = /^(?:\d+|\d*\.\d+)$/;
    //proteinas
    const agregarProteina = (elementos) => {
        if(proteinasAPI != null){
            if(elementos.cantidadProteina != "" && elementos.selectedValueProteina != null && regexNumero.test(elementos.cantidadProteina) === true){
                dato = proteinasAPI.find((dato) => dato.value === elementos.selectedValueProteina);
                setListaProteinasSeleccinadas([...listaProteinasSeleccionadas, {"cantidad" : elementos.cantidadProteina, "id" : elementos.selectedValueProteina, "nombre" : dato.label}]);
                setSelectedValueProteina('');
                setCantidadProteina('');
            }else{
                Alert.alert("Error", "Comprueba el dato ingresado");
            }
        }
    }

    const eliminaProteina = () => {
        listaProteinasSeleccionadas.pop();
        Alert.alert("Eliminación de proteina", "Eliminación exitosa de proteina");
        setShowProteinasLista(!showProteinasLista);
        setShowProteinasLista(!showProteinasLista);
    }
    //verduras
    const agregaVerdura = (elementos) => {
        if(verdurasAPI != null){
            if(elementos.cantidadVerdura != "" && elementos.selectedValueVerdura != null && regexNumero.test(elementos.cantidadVerdura) === true){
                dato = verdurasAPI.find((dato) => dato.value === elementos.selectedValueVerdura);
                setListaVerdurasSeleccionadas([...listaVerdurasSeleccionadas, {"cantidad" : elementos.cantidadVerdura, "id" : elementos.selectedValueVerdura, "nombre" : dato.label}]);
                setSelectedValueVerdura('');
                setCantidadVerdura('');
            }else{
                Alert.alert("Error", "Comprueba el dato ingresado");
            }
        }
    }

    const eliminaVerdura = () => {
        listaVerdurasSeleccionadas.pop();
        Alert.alert("Eliminación de verdura", "Eliminación exitosa de verdura");
        setShowVerdurasLista(!showVerdurasLista);
        setShowVerdurasLista(!showVerdurasLista);
    }
    //lacteos
    const agregaLacteo = (elementos) => {
        if(lacteosAPI != null){
            if(elementos.cantidadLacteo != "" && elementos.selectedValueLacteo != null && regexNumero.test(elementos.cantidadLacteo) === true){
                dato = lacteosAPI.find((dato) => dato.value === elementos.selectedValueLacteo);
                setListaLacteosSeleccionadas([...listaLacteosSeleccionadas, {"cantidad" : elementos.cantidadLacteo, "id" : elementos.selectedValueLacteo, "nombre" : dato.label}]);
                setSelectedValueLacteo('');
                setCantidadLacteo('');
            }else{
                Alert.alert("Error", "Comprueba el dato ingresado");
            }
        }
    }

    const eliminaLacteo = () => {
        listaLacteosSeleccionadas.pop();
        Alert.alert("Eliminación de lacteo", "Eliminación exitosa de lacteo");
        setShowLacteosLista(!showLacteosLista);
        setShowLacteosLista(!showLacteosLista);
    }
    //frutas
    const agregaFruta = (elementos) => {
        if(frutasAPI != null){
            if(elementos.cantidadFruta != "" && elementos.selectedValueFruta != null && regexNumero.test(elementos.cantidadFruta)){
                dato = frutasAPI.find((dato) => dato.value === elementos.selectedValueFruta);
                setListaFrutasSeleccionadas([...listaFrutasSeleccionadas, {"cantidad" : elementos.cantidadFruta, "id" : elementos.selectedValueFruta, "nombre" : dato.label}]);
                setSelectedValueFruta('');
                setCantidadFruta('');
            }else{
                Alert.alert("Error", "Comprueba el dato ingresado");
            }
        }
    }

    const eliminaFruta = () => {
        listaFrutasSeleccionadas.pop();
        Alert.alert("Eliminación de frutas", "Eliminación exitosa de frutas");
        setShowFrutasLista(!showFrutasLista);
        setShowFrutasLista(!showFrutasLista);
    }
    //granos
    const agregaGrano = (elementos) => {
        if(granosAPI != null){
            if(elementos.cantidadGrano != "" && elementos.selectedValueGrano != null && regexNumero.test(elementos.cantidadGrano)){
                dato = granosAPI.find((dato) => dato.value === elementos.selectedValueGrano);
                setListaGranosSeleccionadas([...listaGranosSeleccionadas, {"cantidad" : elementos.cantidadGrano, "id" : elementos.selectedValueGrano, "nombre" : dato.label}]);
                setSelectedValueGrano('');
                setCantidadGrano('');
            }else{
                Alert.alert("Error", "Comprueba el dato ingresado");
            }
        }
    }

    const eliminaGrano = () => {
        listaGranosSeleccionadas.pop();
        Alert.alert("Eliminación de grano", "Eliminación exitosa de grano");
        setShowGranosLista(!showGranosLista);
        setShowGranosLista(!showGranosLista);
    }

    const handleCarga = () => {
        if(selectedTipoAlimento === null || duracion === "" || listaProteinasSeleccionadas.length === 0 && listaVerdurasSeleccionadas.length === 0 && listaLacteosSeleccionadas.length === 0 && listaFrutasSeleccionadas.length === 0 && listaGranosSeleccionadas.length === 0){
            Alert.alert("Error", "Ingrese por lo menos un elemento dentro de una sección de los alimentos");
        }else{
            let listaProteina = [], listaVerduras = [], listaLacteos = [], listaFrutas = [], listaGranos = [];
            let listaProteinacantidades = [], listaVerdurascantidades = [], listaLacteoscantidades = [], listaFrutascantidades = [], listaGranoscantidades = [];
            if(listaProteinasSeleccionadas.length > 0){
                for(let i = 0; i < listaProteinasSeleccionadas.length; i++){
                    listaProteina.push(listaProteinasSeleccionadas[i].id);
                    listaProteinacantidades.push(listaProteinasSeleccionadas[i].cantidad);
                }
            }else{
                listaProteina.push('');
                listaProteinacantidades.push('');
            }
            if(listaVerdurasSeleccionadas.length > 0){
                for(let i = 0; i < listaVerdurasSeleccionadas.length; i++){
                    listaVerduras.push(listaVerdurasSeleccionadas[i].id);
                    listaVerdurascantidades.push(listaVerdurasSeleccionadas[i].cantidad);
                }
            }else{
                listaVerduras.push('');
                listaVerdurascantidades.push('');
            }
            if(listaLacteosSeleccionadas.length > 0){
                for(let i = 0; i < listaLacteosSeleccionadas.length; i++){
                    listaLacteos.push(listaLacteosSeleccionadas[i].id);
                    listaLacteoscantidades.push(listaLacteosSeleccionadas[i].cantidad);
                }
            }else{
                listaLacteos.push('');
                listaLacteoscantidades.push('');
            }
            if(listaFrutasSeleccionadas.length > 0){
                for(let i = 0; i < listaFrutasSeleccionadas.length; i++){
                    listaFrutas.push(listaFrutasSeleccionadas[i].id);
                    listaFrutascantidades.push(listaFrutasSeleccionadas[i].cantidad);
                }
            }else{
                    listaFrutas.push('');
                    listaFrutascantidades.push('');
            }
            if(listaGranosSeleccionadas.length > 0){
                for(let i = 0; i < listaGranosSeleccionadas.length; i++){
                    listaGranos.push(listaGranosSeleccionadas[i].id);
                    listaGranoscantidades.push(listaGranosSeleccionadas[i].cantidad);
                }
            }else{
                listaGranos.push('');
                    listaGranoscantidades.push('');
            }
            
            const dataPost = {
                "idProfesional" : infoApp.usuarioProfesional.idUsuario,
                "idPaciente" : id,
                "idComida" : selectedTipoAlimento,
                "proteinas" : listaProteina,
                "cantidadesProteinas" : listaProteinacantidades,
                "lacteos" : listaLacteos,
                "cantidadesLacteos" : listaLacteoscantidades,
                "frutas" : listaFrutas,
                "cantidadesFrutas" : listaFrutascantidades,
                "verduras" : listaVerduras,
                "cantidadesVerduras" : listaVerdurascantidades,
                "granos" : listaGranos,
                "cantidadesGranos" : listaGranoscantidades,
                "duracion" : duracion,
                "vigencia" : "1"
            };
            const realizaSubidaAPI = async () => {
                const response = await fetch(`${infoApp.APIurl}/alimentodieta/alta`, {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                    }, body : JSON.stringify(dataPost),
                });
                if(response.ok){
                    const data = await response.json();
                    Alert.alert("Exito", data.mensaje, [
                        {
                            text : 'OK',
                            onPress : navigation.navigate('PrincipalProfesional')
                        }
                    ], {cancelable : false})
                }else{
                    const data = await response.json();
                    console.log("info : error", data);
                    Alert.alert("Error", data.mensaje);
                }
            };
            realizaSubidaAPI();
        }
    }

    //comprobamos que obtenemos la información de la API
    if(tiposComia != null && proteinasAPI != null && verdurasAPI != null && lacteosAPI != null && frutasAPI != null && granosAPI != null){
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.containerScroll}>
                    <View style={styles.content}>
                        <View style={styles.containerS}>
                            <Text style={styles.labelS}>Tipo de alimento: </Text>
                            <RNPickerSelect items={tiposComia}      
                                style={pickerSelectStyles}
                                onValueChange={(value) => setSelectedTipoAlimento(value)}
                                value={selectedTipoAlimento}
                            />
                        </View>
                        <View style={styles.containerS}>
                            <Text>     </Text>
                            <Text style={styles.labelS}>Proteina:               </Text>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedValueProteina(value)}
                                items={proteinasAPI}
                                value={selectedValueProteina}
                                style={pickerSelectStyles}
                            />
                            <Text>     </Text>
                        </View>
                        <View style={styles.containerS}>
                            <Text>     </Text>
                            <Text style={styles.labelS}>Cantidad de proteinas:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Cantidad"
                                onChangeText={(text) => setCantidadProteina(text)}
                                value={cantidadProteina}
                                keyboardType="numeric"
                            />
                            <Text>     </Text>
                        </View>
                        <View style={styles.bottonAlinea}>
                            <Button title="Agregar a la lista" onPress={ () => agregarProteina({selectedValueProteina, cantidadProteina})}/>
                        </View>
                        <View>
                            <Text style={styles.textoCampoBoton} onPress={() => setShowProteinasLista(!showProteinasLista)}>Mostrar lista de proteinas</Text>
                            <ExpandableView show={showProteinasLista} style={styles.contenedorDesplegable}>
                                {listaProteinasSeleccionadas.length > 0 ? listaProteinasSeleccionadas.map((item) => <Text key={item.id} style={styles.textoDesplegable}>Alimento: {item.nombre}, cantidad: {item.cantidad}</Text>): <Text>No se cuenta con elementos</Text>}
                                {listaProteinasSeleccionadas.length > 0 ? <Button title="Quitar último elmento" style={styles.button} onPress={eliminaProteina} /> : null}
                            </ExpandableView>
                        </View>
                        {/* VERDURAS */}
                        <View style={styles.containerS}>
                            <Text>     </Text>
                            <Text style={styles.labelS}>Verduras:               </Text>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedValueVerdura(value)}
                                items={verdurasAPI}
                                value={selectedValueVerdura}
                                style={pickerSelectStyles}
                            />
                            <Text>     </Text>
                        </View>
                        <View style={styles.containerS}>
                            <Text>     </Text>
                            <Text style={styles.labelS}>Cantidad de verduras:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Cantidad"
                                onChangeText={(text) => setCantidadVerdura(text)}
                                value={cantidadVerdura}
                                keyboardType="numeric"
                            />
                            <Text>     </Text>
                        </View>
                        <View style={styles.bottonAlinea}>
                            <Button title="Agregar a la lista" onPress={ () => agregaVerdura({selectedValueVerdura, cantidadVerdura})}/>
                        </View>
                        <View>
                            <Text style={styles.textoCampoBoton} onPress={() => setShowVerdurasLista(!showVerdurasLista)}>Mostrar lista de verduras</Text>
                            <ExpandableView show={showVerdurasLista} style={styles.contenedorDesplegable}>
                                {listaVerdurasSeleccionadas.length > 0 ? listaVerdurasSeleccionadas.map((item) => <Text key={item.id} style={styles.textoDesplegable}>Alimento: {item.nombre}, cantidad: {item.cantidad}</Text>): <Text>No se cuenta con elementos</Text>}
                                {listaVerdurasSeleccionadas.length > 0 ? <Button title="Quitar último elmento" style={styles.button} onPress={eliminaVerdura} /> : null}
                            </ExpandableView>
                        </View>
                        {/* LACTEOS */}
                        <View style={styles.containerS}>
                            <Text>     </Text>
                            <Text style={styles.labelS}>Lacteos:               </Text>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedValueLacteo(value)}
                                items={lacteosAPI}
                                value={selectedValueGrano}
                                style={pickerSelectStyles}
                            />
                            <Text>     </Text>
                        </View>
                        <View style={styles.containerS}>
                            <Text>     </Text>
                            <Text style={styles.labelS}>Cantidad de lacteos:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Cantidad"
                                onChangeText={(text) => setCantidadLacteo(text)}
                                value={cantidadLacteo}
                                keyboardType="numeric"
                            />
                            <Text>     </Text>
                        </View>
                        <View style={styles.bottonAlinea}>
                            <Button title="Agregar a la lista" onPress={ () => agregaLacteo({selectedValueLacteo, cantidadLacteo})}/>
                        </View>
                        <View>
                            <Text style={styles.textoCampoBoton} onPress={() => setShowLacteosLista(!showLacteosLista)}>Mostrar lista de lacteos</Text>
                            <ExpandableView show={showLacteosLista} style={styles.contenedorDesplegable}>
                                {listaLacteosSeleccionadas.length > 0 ? listaLacteosSeleccionadas.map((item) => <Text key={item.id} style={styles.textoDesplegable}>Alimento: {item.nombre}, cantidad: {item.cantidad}</Text>): <Text>No se cuenta con elementos</Text>}
                                {listaLacteosSeleccionadas.length > 0 ? <Button title="Quitar último elmento" style={styles.button} onPress={eliminaLacteo} /> : null}
                            </ExpandableView>
                        </View>
                        {/* FRUTAS */}
                        <View style={styles.containerS}>
                            <Text>     </Text>
                            <Text style={styles.labelS}>Frutas:               </Text>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedValueFruta(value)}
                                items={frutasAPI}
                                value={selectedValueFruta}
                                style={pickerSelectStyles}
                            />
                            <Text>     </Text>
                        </View>
                        <View style={styles.containerS}>
                            <Text>     </Text>
                            <Text style={styles.labelS}>Cantidad de fruta:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Cantidad"
                                onChangeText={(text) => setCantidadFruta(text)}
                                value={cantidadFruta}
                                keyboardType="numeric"
                            />
                            <Text>     </Text>
                        </View>
                        <View style={styles.bottonAlinea}>
                            <Button title="Agregar a la lista" onPress={ () => agregaFruta({selectedValueFruta, cantidadFruta})}/>
                        </View>
                        <View>
                            <Text style={styles.textoCampoBoton} onPress={() => setShowFrutasLista(!showFrutasLista)}>Mostrar lista de frutas</Text>
                            <ExpandableView show={showFrutasLista} style={styles.contenedorDesplegable}>
                                {listaFrutasSeleccionadas.length > 0 ? listaFrutasSeleccionadas.map((item) => <Text key={item.id} style={styles.textoDesplegable}>Alimento: {item.nombre}, cantidad: {item.cantidad}</Text>): <Text>No se cuenta con elementos</Text>}
                                {listaFrutasSeleccionadas.length > 0 ? <Button title="Quitar último elmento" style={styles.button} onPress={eliminaFruta} /> : null}
                            </ExpandableView>
                        </View>
                        {/* GRANOS */}
                        <View style={styles.containerS}>
                            <Text>     </Text>
                            <Text style={styles.labelS}>Granos:               </Text>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedValueGrano(value)}
                                items={granosAPI}
                                value={selectedValueGrano}
                                style={pickerSelectStyles}
                            />
                            <Text>     </Text>
                        </View>
                        <View style={styles.containerS}>
                            <Text>     </Text>
                            <Text style={styles.labelS}>Cantidad de grano:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Cantidad"
                                onChangeText={(text) => setCantidadGrano(text)}
                                value={cantidadGrano}
                                keyboardType="numeric"
                            />
                            <Text>     </Text>
                        </View>
                        <View style={styles.bottonAlinea}>
                            <Button title="Agregar a la lista" onPress={ () => agregaGrano({selectedValueGrano, cantidadGrano})}/>
                        </View>
                        <View>
                            <Text style={styles.textoCampoBoton} onPress={() => setShowGranosLista(!showGranosLista)}>Mostrar lista de granos</Text>
                            <ExpandableView show={showGranosLista} style={styles.contenedorDesplegable}>
                                {listaGranosSeleccionadas.length > 0 ? listaGranosSeleccionadas.map((item) => <Text key={item.id} style={styles.textoDesplegable}>Alimento: {item.nombre}, cantidad: {item.cantidad}</Text>): <Text>No se cuenta con elementos</Text>}
                                {listaGranosSeleccionadas.length > 0 ? <Button title="Quitar último elmento" style={styles.button} onPress={eliminaGrano} /> : null}
                            </ExpandableView>
                        </View>
                        {/* CASO PARA LA DURACIÓN */}
                        <View style={styles.containerS}>
                            <Text>     </Text>
                            <Text style={styles.labelS}>Duración:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Duración en semanas"
                                onChangeText={(text) => setDuracion(text)}
                                value={duracion}
                                keyboardType="numeric"
                            />
                            <Text>     </Text>
                        </View>
                        {/* BOTONES PARA CREAR */}
                        <View style={styles.containerS}>
                            <TouchableOpacity style={styles.containerButton} onPress={handleCarga}>
                                <LinearGradient
                                    // Button Linear Gradient
                                    colors={['#42ab49', '#5dc460']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.button}
                                >
                                    <Text style={styles.text}>AGREGAR INGREDIENTE</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>
                        <Text>     </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c7f7f7',
        alignContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
        backgroundColor: "#96c4c4",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    containerS: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 5,
        marginTop: 0,

    },
    labelS: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 10,
        justifyContent: "flex-start",
        marginRight: 15,
    },
    input: {
        width: 150,
        height: 50,
        backgroundColor: 'white', // Color de fondo del campo de entrada
        paddingStart: 30,
        borderRadius: 30,
        marginTop: 0,
    },
    containerButton: {
        alignItems: 'center',
        width: 250,
        marginTop: 10,
    },
    text: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        width: '80%',
        height: 45,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
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
      contenedorDesplegable : {
        alignSelf : 'baseline',
        paddingLeft : 20,
      },
      bottonAlinea : {
        justifyContent : 'center',
        alignItems : 'center',
        paddingTop : 5,
        paddingBottom : 5
      }

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignContent: "flex-end",
        width: 230,
        height: 50,
        backgroundColor: 'white', // Color de fondo del campo de entrada
        paddingStart: 30,
        borderRadius: 30,
        marginTop: 0,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
    },
});

export default CrearDieta;