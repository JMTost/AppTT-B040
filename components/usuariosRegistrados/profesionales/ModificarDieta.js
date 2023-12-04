import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Pressable, Platform, Touchable, TouchableOpacity, Image, picker, SafeAreaView, FlatList, ViewBase, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import infoApp from '../../../infoApp.json';
import { ExpandableView } from '@pietile-native-kit/expandable-view';


const ModificarDieta = ({navigation, route}) => {

    const {dataDieta} = route.params;

 

    
    const [selectedtipoAlimento, setSelectedValuetipoAlimento] = useState(null);
    const [selectedalimento, setSelectedValueAlimento] = useState(null);
    const [cantidad, setCantidad] = useState('');
    
    const [proteinasAPI, setProteinasAPI] = useState(null);
    const [verdurasAPI, setVerdurasAPI] = useState(null);
    const [lacteosAPI, setLacteosAPI] = useState(null);
    const [frutasAPI, setFrutasAPI] = useState(null);
    const [granosAPI, setGranosAPI] = useState(null);

    const [nuevoAlimento, setNuevoAlimento] = useState('');
    const [nuevaCantidad, setNuevaCantidad] = useState('');
    //console.log(dataDieta)

    useEffect( () => {
        const fetchObtenAlimentos = async () => {
            try {
                const response = await fetch(`${infoApp.APIurl}/obtenAlimentos`);
                const data = await response.json();
                let proteAPI = [], lacteosAPI = [], frutasAPI = [], verdurasAPI = [], granosAPI = [];
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

    const cantidades = {
        proteinas: dataDieta.cantidadesproteinas[0].split(','),
        lacteos: dataDieta.cantidadesLacteos[0].split(','),
        frutas: dataDieta.cantidadesFrutas[0].split(','),
        verduras: dataDieta.cantidadesverduras[0].split(','),
        granos: dataDieta.cantidadesGranos[0].split(','),
      };
      const alimentoComidas = {
        proteinas: dataDieta.comidasproteinas[0].split(','),
        lacteos: dataDieta.comidasLacteos[0].split(','),
        frutas: dataDieta.comidasfrutas[0].split(','),
        verduras: dataDieta.comidasVerduras[0].split(','),
        granos: dataDieta.comidasgranos[0].split(','),
      };

    let alimentos = [];
    let proteinas = [], verduras = [], lacteos = [], frutas = [], granos = [];
    let proteinasDieta = [], verdurasDieta = [], lacteosDieta = [], frutasDieta = [], granosDieta = [];
    if(dataDieta.comidasproteinas[0] != '0'){
        proteinas = dataDieta.comidasproteinas[0].split(',');
        let cantidadesProteinas = dataDieta.cantidadesproteinas[0].split(',');
        for(let i = 0; i < proteinas.length; i++){
            alimentos.push({
                tipoAlimento : "Proteina",
                alimento : proteinas[i],
                cantidad : cantidadesProteinas[i],
                value : '1'
            });
            proteinasDieta.push({
                tipoAlimento : "Proteina",
                alimento : proteinas[i],
                cantidad : cantidadesProteinas[i],
                value : '1'
            });
        }
    }
    if(dataDieta.comidasVerduras[0] != '0'){
        verduras = dataDieta.comidasVerduras[0].split(',');
        let cantidadesVerduras = dataDieta.cantidadesverduras[0].split(',');
        for(let i = 0; i < verduras.length; i++){
            alimentos.push({
                tipoAlimento : "Verduras",
                alimento : verduras[i],
                cantidad : cantidadesVerduras[i],
                value : '2'
            });
            verdurasDieta.push({
                tipoAlimento : "Verduras",
                alimento : verduras[i],
                cantidad : cantidadesVerduras[i],
                value : '2'
            });
        }
    }
    if(dataDieta.comidasLacteos[0] != '0'){
        lacteos = dataDieta.comidasLacteos[0].split(',');
        let cantidadesLacteos = dataDieta.cantidadesLacteos[0].split(',');
        for(let i = 0; i < lacteos.length; i++){
            alimentos.push({
                tipoAlimento : "Lacteos",
                alimento : lacteos[i],
                cantidad : cantidadesLacteos[i],
                value : '3'
            });
            lacteosDieta.push({
                tipoAlimento : "Lacteos",
                alimento : lacteos[i],
                cantidad : cantidadesLacteos[i],
                value : '3'
            });
        }
    }
    if(dataDieta.comidasfrutas[0] != '0'){
        frutas = dataDieta.comidasfrutas[0].split(',');
        let cantidadesFrutas = dataDieta.cantidadesFrutas[0].split(',');
        for(let i = 0; i < frutas.length; i++){
            alimentos.push({
                tipoAlimento : "Frutas",
                alimento : frutas[i],
                cantidad : cantidadesFrutas[i], 
                value : '4'
            });
            frutasDieta.push({
                tipoAlimento : "Frutas",
                alimento : frutas[i],
                cantidad : cantidadesFrutas[i], 
                value : '4'
            });
        }
    }
    if(dataDieta.comidasgranos[0] != '0'){
        granos = dataDieta.comidasgranos[0].split(',');
        let cantidadesGranos = dataDieta.cantidadesGranos[0].split(',');
        for(let i = 0; i < granos.length; i++){
            alimentos.push({
                tipoAlimento : "Granos",
                alimento : granos[i],
                cantidad : cantidadesGranos[i],
                value : '5'
            });
            granosDieta.push({
                tipoAlimento : "Granos",
                alimento : granos[i],
                cantidad : cantidadesGranos[i],
                value : '5'
            });
        }
    }
    const tipoAlimento = [
        { label: 'Proteina', value: '1' },
        { label: 'Verduras', value: '2' },
        { label: 'Lacteos', value: '3' },
        { label: 'Frutas', value: '4' },
        { label : 'Granos', value : '5'}

    ];

    const alimento = [
        { label: 'alimento1', value: '1' },
        { label: 'alimento2', value: '2' },

    ];
    
    const myListEmpty = () => {
        return (
            <View style={{ alignItems: "center", flex: 1, marginTop: 320 }}>
                <Text style={{ fontWeight: "bold" }}>No existen ingredientes</Text>
            </View>
        );
    };

    const filtrarAlimentos = (seleccionValor) => {
        const alimentosPorValor = {
            1 : proteinasAPI,
            2 : verdurasAPI,
            3 : lacteosAPI,
            4 : frutasAPI,
            5 : granosAPI
        };

        const listaAlimentos = alimentosPorValor[seleccionValor] || null;

        return listaAlimentos;
    };

    const handleModificar = () => {
        // Realizar la lógica para enviar las cantidades modificadas al servidor o realizar la acción deseada
        onModificar(cantidades);
      };
    
      const handleAgregar = () => {
        // Realizar la lógica para agregar un nuevo alimento a la lista
        onAgregar({ alimento: nuevoAlimento, cantidad: nuevaCantidad });
        setNuevoAlimento('');
        setNuevaCantidad('');
      };

      const handleModificarComida = (nuevasCantidades) =>{
        //comprobamos que no haya elementos vacios 
        
        let cantidadesMOD= {}, idsComidasNoCero = {};
        for (const [tipo, cantidades] of Object.entries(nuevasCantidades.cantidades)) {
            const cantidadesFiltradas = cantidades.filter((cantidad) => parseFloat(cantidad) !== 0);
            if (cantidadesFiltradas.length > 0) {
              cantidadesMOD[tipo] = cantidadesFiltradas;
            }
          }
        
        for (const [tipo, alimentos] of Object.entries(alimentoComidas)) {
            //console.log("alimentos: ", alimentos)
            
            const tipoLowerCase = tipo.toLowerCase();
            let tipoData = [];
            if(tipoLowerCase === 'proteinas')
                tipoData = proteinasAPI;
            else if(tipoLowerCase === 'verduras')
                tipoData = verdurasAPI;
            else if(tipoLowerCase === 'lacteos')
                tipoData = lacteosAPI;
            else if(tipoLowerCase === 'frutas')
                    tipoData = frutasAPI;
            else if(tipoLowerCase === 'granos')
                    tipoData = granosAPI;
            if(tipoData){
                const ids = [];
                for (const alimento of alimentos) {
                    let alimentoData;
                    if(tipoLowerCase === 'proteinas')
                        alimentoData = proteinasAPI.find((dato) => dato.label === alimento);
                    else if(tipoLowerCase === 'verduras')
                        alimentoData = verdurasAPI.find((dato) => dato.label === alimento);
                    else if(tipoLowerCase === 'lacteos')
                        alimentoData = lacteosAPI.find((dato) => dato.label === alimento);
                    else if(tipoLowerCase === 'frutas')
                        alimentoData = frutasAPI.find((dato) => dato.label === alimento);
                    else if(tipoLowerCase === 'granos')
                        alimentoData = granosAPI.find((dato) => dato.label === alimento);
                    if(alimentoData && cantidadesMOD[tipoLowerCase] && cantidadesMOD[tipoLowerCase].length > 0){
                        //console.log("alimentoData: ", alimentoData)
                        ids.push(alimentoData.value)
                    }
                    
                  }
                  if(ids.length > 0){
                    
                    if(tipoLowerCase === 'proteinas')
                        idsComidasNoCero["proteinas"] = ids.toString();
                    else if(tipoLowerCase === 'verduras')
                        idsComidasNoCero["verduras"] = ids.toString();
                    else if(tipoLowerCase === 'lacteos')
                        idsComidasNoCero["lacteos"] = ids.toString();
                    else if(tipoLowerCase === 'frutas')
                        idsComidasNoCero["frutas"] = ids.toString();
                    else if(tipoLowerCase === 'granos')
                        idsComidasNoCero["granos"] = ids.toString();
                  }
                
            }
           
        }
        //console.log("nuevas: ", nuevasCantidades.cantidades)
        let data = {
            "idProfesional": infoApp.usuarioProfesional.idUsuario,
            "idPaciente": dataDieta.idpaciente,
            "idComida": dataDieta.idComida,
            "proteinas": idsComidasNoCero.proteinas !== undefined && idsComidasNoCero.proteinas.length > 0 ? [idsComidasNoCero.proteinas] : ["0"],
            "cantidadesProteinas": cantidadesMOD.proteinas !== undefined && cantidadesMOD.proteinas.length > 0 ? cantidadesMOD.proteinas : ["0"],
            "lacteos": idsComidasNoCero.lacteos !== undefined && idsComidasNoCero.lacteos.length > 0 ? [idsComidasNoCero.lacteos] : ["0"],
            "cantidadesLacteos": cantidadesMOD.lacteos !== undefined && cantidadesMOD.lacteos.length > 0 ? cantidadesMOD.lacteos : ["0"],
            "frutas": idsComidasNoCero.frutas !== undefined && idsComidasNoCero.frutas.length > 0 ? [idsComidasNoCero.frutas] : ["0"],
            "cantidadesFrutas": cantidadesMOD.frutas !== undefined && cantidadesMOD.frutas.length > 0 ? cantidadesMOD.frutas : ["0"],
            "verduras": idsComidasNoCero.verduras !== undefined && idsComidasNoCero.verduras.length > 0 ? [idsComidasNoCero.verduras] : ["0"],
            "cantidadesVerduras": cantidadesMOD.verduras !== undefined && cantidadesMOD.verduras.length > 0 ? cantidadesMOD.verduras : ["0"],
            "granos": idsComidasNoCero.granos !== undefined && idsComidasNoCero.granos.length > 0 ? [idsComidasNoCero.granos] : ["0"],
            "cantidadesGranos": cantidadesMOD.granos !== undefined && cantidadesMOD.granos.length > 0 ? cantidadesMOD.granos : ["0"],
            "duracion": nuevasCantidades.duracion,
            "vigencia": nuevasCantidades.vigencia
          };
        
        const realizaModificacion = async () => {
            const response = await fetch(`${infoApp.APIurl}/alimentodieta/actualiza`, {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                }, body : JSON.stringify(data),
            });
            if(response.ok){
                const data = await response.json();
                Alert.alert("Exito", data.mensaje, [
                    {
                      text : 'OK',
                      onPress : () => navigation.navigate('PrincipalProfesional')
                    }
                  ], {cancelable : false});
            }else{
                let mensaje = await response.json();
                console.log("info : error", mensaje);
                Alert.alert("Error", response.statusText);
            }
        };
        realizaModificacion();

      }

      const handleAgregarAlimento = (nuevoAlimento, nuevasCantidades) => {
      //!ARREGLAR METODO
      //console.log("Nuevo alumento: ", nuevoAlimento);
      for(let i = 0; i < nuevoAlimento.length; i++){
        if(nuevoAlimento[i].tipo === 'proteinas' && nuevoAlimento[i].alimento != null){
            nuevasCantidades.cantidades.proteinas.push(nuevoAlimento[i].cantidad);
            let dato  = proteinasAPI.find((dato) => dato.value === nuevoAlimento[i].alimento);
            alimentoComidas.proteinas.push(dato.label);
            dataDieta.comidasproteinas.push(dato.value)
            dataDieta.cantidadesproteinas.push(nuevoAlimento[i].cantidad.toString());
        }
        if(nuevoAlimento[i].tipo === 'verduras' && nuevoAlimento[i].alimento != null){
            nuevasCantidades.cantidades.verduras.push(nuevoAlimento[i].cantidad);
            let dato  = verdurasAPI.find((dato) => dato.value === nuevoAlimento[i].alimento);
            alimentoComidas.verduras.push(dato.label);
            dataDieta.comidasVerduras.push(dato.value.toString())
            dataDieta.cantidadesverduras.push(nuevoAlimento[i].cantidad.toString());
        }
        if(nuevoAlimento[i].tipo === 'lacteos' && nuevoAlimento[i].alimento != null){
            nuevasCantidades.cantidades.lacteos.push(nuevoAlimento[i].cantidad);
            let dato  = lacteosAPI.find((dato) => dato.value === nuevoAlimento[i].alimento);
            alimentoComidas.lacteos.push(dato.label);
            dataDieta.comidasLacteos.push(dato.value.toString())
            dataDieta.cantidadesLacteos.push(nuevoAlimento[i].cantidad.toString());
        }
        if(nuevoAlimento[i].tipo === 'frutas' && nuevoAlimento[i].alimento != null){
            
            nuevasCantidades.cantidades.frutas.push(nuevoAlimento[i].cantidad);
            let dato  = frutasAPI.find((dato) => dato.value === nuevoAlimento[i].alimento);
            alimentoComidas.frutas.push(dato.label);
            dataDieta.comidasfrutas.push(dato.value.toString())
            dataDieta.cantidadesFrutas.push(nuevoAlimento[i].cantidad.toString());
        }
        if(nuevoAlimento[i].tipo === 'granos' && nuevoAlimento[i].alimento != null){
            
            nuevasCantidades.cantidades.granos.push(nuevoAlimento[i].cantidad);
            let dato  = granosAPI.find((dato) => dato.value === nuevoAlimento[i].alimento);
            alimentoComidas.granos.push(dato.label);
            dataDieta.comidasgranos.push(dato.value.toString())
            dataDieta.cantidadesGranos.push(nuevoAlimento[i].cantidad.toString());
        }
      }
        /*
        console.log("Nuevo alumento: ", nuevoAlimento);
        console.log("cantidades: ", nuevasCantidades);
        */
        
        /*
        console.log("ALIMENTOS COMIDAS ",alimentoComidas);
        console.log("Alimentos dieta: ", dataDieta);
        */
        let proteinas = [], verduras = [], lacteos = [], frutas = [], granod = [];
        let comidasProteinas = dataDieta.comidasproteinas[0].toString();
        
        if(comidasProteinas.includes(',')){
            let comidasArr = dataDieta.comidasproteinas[0].split(',');
            //console.log(comidasArr);
            for (const alimento of comidasArr) {
                let alimentoData;
                //console.log("dato", alimento);
                if(alimento != 0){
                    const dato = proteinasAPI.find((data) => data.label === alimento || data.value === alimento);
                    if(dato){
                        proteinas.push(dato.value.toString());
                    }
                }
            }
        }else{
            for (const alimento of dataDieta.comidasproteinas) {
                let alimentoData;
                //console.log("dato", alimento);
                if(alimento != 0){
                    const dato = proteinasAPI.find((data) => data.label === alimento || data.value === alimento);
                    if(dato){
                        proteinas.push(dato.value.toString());
                    }
                }
            }
        }
    
        if(dataDieta.comidasVerduras[0].includes(',')){
            let comidasArr = dataDieta.comidasVerduras[0].split(',');
            for (const alimento of comidasArr) {
                let alimentoData;
                if(alimento != 0){
                    const dato = verdurasAPI.find((data) => data.label === alimento || data.value === alimento);
                    if(dato){
                        verduras.push(dato.value.toString());
                    }
                }
            }
        }else{
            for (const alimento of dataDieta.comidasVerduras) {
                let alimentoData;
                if(alimento != 0){
                    const dato = verdurasAPI.find((data) => data.label === alimento || data.value === alimento);
                    if(dato){
                        verduras.push(dato.value.toString());
                    }
                }
            }
        }
        if(dataDieta.comidasfrutas[0].includes(',')){
            let comidasArr = dataDieta.comidasfrutas[0].split(',');
            for (const alimento of comidasArr) {
                let alimentoData;
                if(alimento != 0){
                    const dato = frutasAPI.find((data) => data.label === alimento || data.value === alimento);
                    if(dato){
                        frutas.push(dato.value.toString());
                    }
                }
            }
        }else{
            for (const alimento of dataDieta.comidasfrutas) {
                let alimentoData;
                if(alimento != 0){
                    const dato = frutasAPI.find((data) => data.label === alimento || data.value === alimento);
                    if(dato){
                        frutas.push(dato.value.toString());
                    }
                }
            }
        }
        if(dataDieta.comidasLacteos[0].includes(',')){
            let comidasArr = dataDieta.comidasLacteos[0].split(',');
            for (const alimento of comidasArr) {
                let alimentoData;
                if(alimento != 0){
                    const dato = lacteosAPI.find((data) => data.label === alimento || data.value === alimento);
                    if(dato){
                        lacteos.push(dato.value.toString());
                    }
                }
            }        
        }else{
            for (const alimento of dataDieta.comidasLacteos) {
                let alimentoData;
                if(alimento != 0){
                    const dato = lacteosAPI.find((data) => data.label === alimento || data.value === alimento);
                    if(dato){
                        lacteos.push(dato.value.toString());
                    }
                }
            }
        }
        if(dataDieta.comidasgranos[0].includes(',')){
            let comidasArr = dataDieta.comidasgranos[0].split(',');
            for (const alimento of comidasArr) {
                let alimentoData;
                if(alimento != 0){
                    console.log(alimento);
                    const dato = granosAPI.find((data) => data.label === alimento || data.value === alimento);
                    if(dato){
                        granos.push(dato.value.toString());
                    }
                }
            }
        }else{
            for (const alimento of dataDieta.comidasgranos) {
                console.log("dato que entra: ", alimento);
                if(alimento != 0){
                    const dato = granosAPI.find((data) => {//data.label === alimento || data.value === alimento
                    console.log(alimento === data.label);
                    //console.log(data.label === alimento || data.value === alimento);
                    });
                    console.log(dato);
                    if(dato){
                    console.log(dato);
                        granos.push(dato.value.toString());
                    }
                }
            }
        }
        
        console.log(proteinas, verduras, frutas, lacteos, granos);
        
        /*
        console.warn("nuevascantidades: ", nuevasCantidades);
        console.log("alimentos: ", dataDieta);
        */
      }

      function eliminarElementosPorCantidadYAlimento(array, cantidad, nombreAlimento) {
        return array.filter(item => item.cantidad !== cantidad || item.alimento !== nombreAlimento);
      }

      const renderItem = ({item}) => {
        return(
            <ScrollView>
            <View style={styles.content}>
        <Text>     </Text>
        <View style={styles.containerS}>
          <Text style={styles.labelS}>Tipo de Alimento:</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedValuetipoAlimento(value)}
            items={tipoAlimento}
            value={item.value}
            style={pickerSelectStyles}
          />
        </View>
  
        <View style={styles.containerS}>
          <Text style={styles.labelS}>Alimento:               </Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedValueAlimento(value)}
            items={filtrarAlimentos(item.value)}
            value={selectedalimento}
            style={pickerSelectStyles}
          />
        </View>
  
        <View style={styles.containerS}>
          <Text style={styles.labelS}>Cantidad:               </Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            onChangeText={(text) => setCantidad(text)}
            value={item.cantidad}
          />
        </View>
  
        <View style={styles.containerS}>
          <TouchableOpacity style={styles.containerButton} onPress={() => { alert('Modificar registro'); console.log(item) }}>
            <LinearGradient
              colors={['#a87b05', '#efb810']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.text}>MODIFICAR</Text>
            </LinearGradient>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.containerButton} onPress={() => { alert('Eliminar registro'); alimentos = eliminarElementosPorCantidadYAlimento(alimentos, item.cantidad, item.alimentos)}}>
            <LinearGradient
              colors={['#670010', '#e2504c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.text}>ELIMINAR</Text>
            </LinearGradient>
          </TouchableOpacity>
          
        </View>
        <Text>     </Text>
      </View>
        </ScrollView>
        );
      }

    if(proteinasAPI != null && lacteosAPI != null && frutasAPI != null && verdurasAPI != null && granosAPI != null){
    return (
        <ScrollView>
        <ModificarComidaForm comida={cantidades} 
            alimentos={alimentoComidas}
            dataDieta = {dataDieta}
            onModificar={handleModificarComida}
            onAgregar={handleAgregarAlimento}
        /> 
        </ScrollView>
        
    );
    }

};

const ModificarComidaForm = ({comida, alimentos, dataDieta, onModificar, onAgregar}) => {
    
    const [selectedalimento, setSelectedValueAlimento] = useState(null);
    //variables para cada uno de los alimentos
    const [selectedAlimentoProteinas, setSelectedValueAlimentoProteinas] = useState(null);
    const [selectedAlimentoVerduras, setSelectedValueAlimentoVerduras] = useState(null);
    const [selectedAlimentoLacteos, setSelectedValueAlimentoLacteos] = useState(null);
    const [selectedAlimentoFrutas, setSelectedValueAlimentoFrutas] = useState(null);
    const [selectedAlimentoGranos, setSelectedValueAlimentoGranos] = useState(null);

    const [nuevaCantidadProteinas, setNuevaCantidadProteinas] = useState('');
    const [nuevaCantidadVerduras, setNuevaCantidadVerduras] = useState('');
    const [nuevaCantidadLacteos, setNuevaCantidadLacteos] = useState('');
    const [nuevaCantidadFrutas, setNuevaCantidadFrutas] = useState('');
    const [nuevaCantidadGranos, setNuevaCantidadGranos] = useState('');
    const [vigencia, setVigencia] = useState('1');
    const [duracion, setDuracion] = useState(dataDieta.duracion.toString());

    const [proteinasAPI, setProteinasAPI] = useState(null);
    const [verdurasAPI, setVerdurasAPI] = useState(null);
    const [lacteosAPI, setLacteosAPI] = useState(null);
    const [frutasAPI, setFrutasAPI] = useState(null);
    const [granosAPI, setGranosAPI] = useState(null);

    //variables para mostrar el contenido de agregar
    const [showProteinas, setShowProteinas] = useState(false);
    const [showVerduras, setShowVerduras] = useState(false);
    const [showLacteos, setShowLacteos] = useState(false);
    const [showFrutas, setShowFrutas] = useState(false);
    const [showGranos, setShowGranos] = useState(false);

    useEffect( () => {
        const fetchObtenAlimentos = async () => {
            try {
                const response = await fetch(`${infoApp.APIurl}/obtenAlimentos`);
                const data = await response.json();
                let proteAPI = [], lacteosAPI = [], frutasAPI = [], verdurasAPI = [], granosAPI = [];
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

    const [cantidades, setCantidades] = useState({
        proteinas: comida.proteinas || null,
        lacteos: comida.lacteos || null ,
        frutas: comida.frutas || null,
        verduras: comida.verduras || null,
        granos: comida.granos || null,
      });
    const [alimentosAPI, setAlimentosAPI] = useState({
        proteinas: alimentos.proteinas || null,
        lacteos: alimentos.lacteos || null ,
        frutas: alimentos.frutas || null,
        verduras: alimentos.verduras || null,
        granos: alimentos.granos || null,
    });
    const [nuevoAlimento, setNuevoAlimento] = useState('');
    const [nuevaCantidad, setNuevaCantidad] = useState('');

    const handleModificar = () => {
    onModificar({cantidades: cantidades, vigencia : vigencia, duracion : duracion});
    };

    const handleAgregar = () => {
    //console.log(selectedAlimentoProteinas);
            onAgregar([
                { alimento: parseFloat(selectedAlimentoProteinas) || null, cantidad: nuevaCantidadProteinas || null, tipo : "proteinas" },
                { alimento: parseFloat(selectedAlimentoVerduras) || null, cantidad: nuevaCantidadVerduras || null, tipo : "verduras" },
                { alimento: parseFloat(selectedAlimentoLacteos) || null, cantidad: nuevaCantidadLacteos || null, tipo : "lacteos" },
                { alimento: parseFloat(selectedAlimentoFrutas) || null, cantidad: nuevaCantidadFrutas || null, tipo : "frutas" },
                { alimento: parseFloat(selectedAlimentoGranos) || null, cantidad: nuevaCantidadGranos || null, tipo : "granos" },
            ], {cantidades: cantidades, vigencia : vigencia, duracion : duracion});
            setSelectedValueAlimentoProteinas('');
            setNuevaCantidadProteinas('');
            setSelectedValueAlimentoVerduras('');
            setNuevaCantidadVerduras('');
            setSelectedValueAlimentoLacteos('');
            setNuevaCantidadLacteos('');
            setSelectedValueAlimentoFrutas('');
            setNuevaCantidadFrutas('');
            setSelectedValueAlimentoGranos('');
            setNuevaCantidadGranos('');
        
    };

    const filtrarAlimentos = (seleccionValor) => {
        const alimentosPorValor = {
            1 : proteinasAPI,
            2 : verdurasAPI,
            3 : lacteosAPI,
            4 : frutasAPI,
            5 : granosAPI
        };

        const listaAlimentos = alimentosPorValor[seleccionValor] || null;

        return listaAlimentos;
    };
    if(proteinasAPI != null && lacteosAPI != null && frutasAPI != null && verdurasAPI != null && granosAPI != null){
        return (
            <ScrollView style={styles.containerScroll}>
            <View style={styles.content}>
                <Text>Si desea eliminar un elemento, debe colocar en la cantidad un cero y seleccionar la opción de modificar</Text>
                <Text style={styles.labelS}>Cantidades de Proteínas:</Text>
                <View>    
                    {cantidades.proteinas.map((cantidad, index) => (
                        <View>
                            <Text style={styles.labelS}>{alimentosAPI.proteinas[index]}:</Text>
                        <TextInput
                            key={`proteina-${index}`}
                            value={cantidad}
                            onChangeText={(text) => {
                            const nuevasCantidades = [...cantidades.proteinas];
                            nuevasCantidades[index] = text;
                            setCantidades({ ...cantidades, proteinas: nuevasCantidades });
                            }}
                            placeholder={`Proteína ${index + 1}`}
                            style={styles.input}
                            keyboardType='numeric'
                        />
                        </View>
                    ))}
                </View>
                <View style={styles.botonDesplegable}>
                    <Text style={styles.textoDesplegable} onPress={() => setShowProteinas(!showProteinas)}>Agregar Nuevo Alimento</Text>
                        <ExpandableView show={showProteinas}>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedValueAlimentoProteinas(value)}
                                items={filtrarAlimentos(1)}
                                value={selectedAlimentoProteinas}
                                style={pickerSelectStyles}
                            />
                            <TextInput
                            value={nuevaCantidadProteinas}
                            onChangeText={(text) => setNuevaCantidadProteinas(text)}
                            placeholder="Cantidad"
                            style={styles.input}
                            keyboardType='numeric'
                            />
                        </ExpandableView>
                </View>

                {/* Otros bloques de código similares para lacteos, frutas, verduras y granos */}
                {/* VERDURAS */}
                <Text style={styles.labelS}>Cantidades de Verduras:</Text>
                <View>
                    {cantidades.verduras.map((cantidad, index) => (
                            <View >
                            <Text style={styles.labelS}>{alimentosAPI.verduras[index]}:</Text>
                            <TextInput
                                key={`verduras-${index}`}
                                value={cantidad}
                                onChangeText={(text) => {
                                const nuevasCantidades = [...cantidades.verduras];
                                nuevasCantidades[index] = text;
                                setCantidades({ ...cantidades, verduras: nuevasCantidades });
                                }}
                                placeholder={`verduras ${index + 1}`}
                                style={styles.input}
                                keyboardType='numeric'
                            />
                            </View>
                        ))}
                </View>
                <View style={styles.botonDesplegable}>
                    <Text style={styles.textoDesplegable} onPress={() => setShowVerduras(!showVerduras)}>Agregar Nuevo Alimento</Text>
                    <ExpandableView show={showVerduras}>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedValueAlimentoVerduras(value)}
                            items={filtrarAlimentos(2)}
                            value={selectedAlimentoVerduras}
                            style={pickerSelectStyles}
                        />
                        <TextInput
                        value={nuevaCantidadVerduras}
                        onChangeText={(text) => setNuevaCantidadVerduras(text)}
                        placeholder="Cantidad"
                        style={styles.input}
                        keyboardType='numeric'
                        />
                    </ExpandableView>
                </View>
                {/* lACTEOS */}
                <Text style={styles.labelS}>Cantidades de Lacteos:</Text>
                <View>
                    {cantidades.lacteos.map((cantidad, index) => (
                        <View>
                            <Text style={styles.labelS}>{alimentosAPI.lacteos[index]}:</Text>
                            <TextInput
                                key={`lacteos-${index}`}
                                value={cantidad}
                                onChangeText={(text) => {
                                const nuevasCantidades = [...cantidades.lacteos];
                                nuevasCantidades[index] = text;
                                setCantidades({ ...cantidades, lacteos: nuevasCantidades });
                                }}
                                placeholder={`lacteos ${index + 1}`}
                                style={styles.input}
                                keyboardType='numeric'
                            />
                        </View>
                    ))}
                </View>
                <View style={styles.botonDesplegable}>
                    <Text style={styles.textoDesplegable}onPress={() => setShowLacteos(!showLacteos)}>Agregar Nuevo Alimento</Text>
                    <ExpandableView show={showLacteos}>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedValueAlimentoLacteos(value)}
                            items={filtrarAlimentos(3)}
                            value={selectedAlimentoLacteos}
                            style={pickerSelectStyles}
                        />
                        <TextInput
                        value={nuevaCantidadLacteos}
                        onChangeText={(text) => setNuevaCantidadLacteos(text)}
                        placeholder="Cantidad"
                        style={styles.input}
                        keyboardType='numeric'
                        />
                    </ExpandableView>
                    </View>
                {/* FRUTAS */}
                <Text style={styles.labelS}>Cantidades de Frutas:</Text>
                <View>
                    {cantidades.frutas.map((cantidad, index) => (
                        <View >
                        <Text style={styles.labelS}>{alimentosAPI.frutas[index]}</Text>
                        <TextInput
                            key={`frutas-${index}`}
                            value={cantidad}
                            onChangeText={(text) => {
                            const nuevasCantidades = [...cantidades.frutas];
                            nuevasCantidades[index] = text;
                            setCantidades({ ...cantidades, frutas: nuevasCantidades });
                            }}
                            placeholder={`frutas ${index + 1}`}
                            style={styles.input}
                            keyboardType='numeric'
                        />
                        </View>
                    ))}
                </View>
                <View style={styles.botonDesplegable}>
                    <Text style={styles.textoDesplegable} onPress={() => setShowFrutas(!showFrutas)}>Agregar Nuevo Alimento</Text>
                    <ExpandableView show={showFrutas}>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedValueAlimentoFrutas(value)}
                            items={filtrarAlimentos(4)}
                            value={selectedAlimentoFrutas}
                            style={pickerSelectStyles}
                        />
                        <TextInput
                        value={nuevaCantidadFrutas}
                        onChangeText={(text) => setNuevaCantidadFrutas(text)}
                        placeholder="Cantidad"
                        style={styles.input}
                        keyboardType='numeric'
                        />
                    </ExpandableView>
                </View>
                {/* GRANOS */}
                <Text style={styles.labelS}>Cantidades de Granos:</Text>
                <View>
                    {cantidades.granos.map((cantidad, index) => (
                        <View>
                        <Text style={styles.labelS}>{alimentosAPI.granos[index]}:  </Text>
                        <TextInput
                            key={`granos-${index}`}
                            value={cantidad}
                            onChangeText={(text) => {
                            const nuevasCantidades = [...cantidades.granos];
                            nuevasCantidades[index] = text;
                            setCantidades({ ...cantidades, granos: nuevasCantidades });
                            }}
                            placeholder={`granos ${index + 1}`}
                            style={styles.input}
                            keyboardType='numeric'
                        />
                        </View>
                    ))}
                </View>

                <View style={styles.botonDesplegable}>
                    <Text style={styles.textoDesplegable} onPress={() => setShowGranos(!showGranos)}>Agregar Nuevo Alimento</Text>
                    <ExpandableView show={showGranos} style={styles.contenedorDesplegable}>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedValueAlimentoGranos(value)}
                            items={filtrarAlimentos(5)}
                            value={selectedAlimentoGranos}
                            style={pickerSelectStyles}
                        />
                        <TextInput
                        value={nuevaCantidadGranos}
                        onChangeText={(text) => setNuevaCantidadGranos(text)}
                        placeholder="Cantidad"
                        style={styles.input}
                        keyboardType='numeric'
                        />
                    </ExpandableView>
                    </View>
                    {/* VIGENCIA */}
                    <View style={styles.containerS}>
                        <Text style={styles.labelS}>Vigencia: </Text>
                        <TextInput value={vigencia}
                            onChangeText={(text) => setVigencia(text)}
                            placeholder='Vigencia'
                            style={styles.input}
                            keyboardType='numeric'
                            />
                    </View>
                    {/* duración */}
                    <View style={styles.containerS}>
                        <Text style={styles.labelS}>Duración: </Text>
                        <TextInput value={duracion}
                            onChangeText={(text) => setDuracion(text)}
                            placeholder='Duración'
                            style={styles.input}
                            keyboardType='numeric'
                            />
                    </View>
                {/*botones para capturar el funcionamiento */}
                <View style={styles.containerS}>
                    <TouchableOpacity style={styles.containerButton} onPress={handleModificar}>
                        <LinearGradient colors={['#a87b05', '#efb810']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={styles.button}
                                        >
                            <Text style={styles.text}>Modificar Cantidades</Text>
                        </LinearGradient>
                    </TouchableOpacity>
            
                    <TouchableOpacity style={styles.containerButton} onPress={handleAgregar}>
                        <LinearGradient colors={['#670010', '#e2504c']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.button}
                                    >
                            <Text style={styles.text}>Agregar Alimento</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c7f7f7',
        alignContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
        backgroundColor:"#96c4c4",
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
        width: 260,
        height: 50,
        backgroundColor: 'white', // Color de fondo del campo de entrada
        paddingStart: 30,
        borderRadius: 30,
        marginTop: 0,
    },
    containerButton: {
        alignItems: 'center',
        width: 200,
        marginTop: 10,
    },
    text: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        width: '80%',
        height: 40,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contenedorDesplegable : {
        alignSelf : 'baseline',
        paddingLeft : 20,
      },
      textoDesplegable: {
        color : 'white',
        fontSize : 15,
        fontWeight : 'bold'
      },
    botonDesplegable : {
        paddingTop : 10,
        paddingBottom : 10,
        right : 20,
    }

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignContent: "flex-end",
        width: 260,
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

export default ModificarDieta;
/*  ULTIMA MODIFICACION
<View style={styles.container}>
                
                <Text>Cantidades de proteinas: </Text>
                {
                    proteinasDieta.map((cantidad, index) => (

                        <View>
                            <Text>{cantidad.alimento}</Text>
                            <TextInput key={`proteina-${index}`} value={cantidad.cantidad} onChangeText={(text) => {
                                const nuevasCantidades = [...cantidades.proteinas];
                                nuevasCantidades[index] = text;
                                setCantidad({...cantidad, proteinas : nuevasCantidades});
                            }}
                            placeholder={`Proteinas ${index + 1 }`}
                            style={styles.input} />
                        </View>
                    ))
                }

                <Text>Cantidades de verduras: </Text>
                {
                    verdurasDieta.map((cantidad, index) => (

                        <View>
                            <Text>{cantidad.alimento}</Text>
                            <TextInput key={`verdura-${index}`} value={cantidad.cantidad} onChangeText={(text) => {
                                const nuevasCantidades = [...cantidades.proteinas];
                                nuevasCantidades[index] = text;
                                setCantidad({...cantidad, proteinas : nuevasCantidades});
                            }}
                            placeholder={`verdura ${index + 1 }`}
                            style={styles.input} />
                        </View>
                    ))
                }

                <Text>Cantidades de lacteos: </Text>
                {
                    lacteosDieta.map((cantidad, index) => (

                        <View>
                            <Text>{cantidad.alimento}</Text>
                            <TextInput key={`lacteos-${index}`} value={cantidad.cantidad} onChangeText={(text) => {
                                const nuevasCantidades = [...cantidades.proteinas];
                                nuevasCantidades[index] = text;
                                setCantidad({...cantidad, proteinas : nuevasCantidades});
                            }}
                            placeholder={`lacteos ${index + 1 }`}
                            style={styles.input} />
                        </View>
                    ))
                }

                <Text>Cantidades de frutas: </Text>
                {
                    frutasDieta.map((cantidad, index) => (

                        <View>
                            <Text>{cantidad.alimento}</Text>
                            <TextInput key={`frutas-${index}`} value={cantidad.cantidad} onChangeText={(text) => {
                                const nuevasCantidades = [...cantidades.proteinas];
                                nuevasCantidades[index] = text;
                                setCantidad({...cantidad, proteinas : nuevasCantidades});
                            }}
                            placeholder={`frutas ${index + 1 }`}
                            style={styles.input} />
                        </View>
                    ))
                }

                <Text>Cantidades de granos: </Text>
                {
                    granosDieta.map((cantidad, index) => (

                        <View>
                            <Text>{cantidad.alimento}</Text>
                            <TextInput key={`granos-${index}`} value={cantidad.cantidad} onChangeText={(text) => {
                                const nuevasCantidades = [...cantidades.proteinas];
                                nuevasCantidades[index] = text;
                                setCantidad({...cantidad, proteinas : nuevasCantidades});
                            }}
                            placeholder={`granos ${index + 1 }`}
                            style={styles.input} />
                        </View>
                    ))
                }

                
                <TouchableOpacity style={styles.button} onPress={handleModificar}>
                <Text style={styles.buttonText}>Modificar Cantidades</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleAgregar}>
                <Text style={styles.buttonText}>Agregar Alimento</Text>
                </TouchableOpacity>

            </View>

 */
/*
<ScrollView style={styles.containerScroll}>
                        <View style={styles.content}>
                            <Text>     </Text>
                            <View style={styles.containerS}>
                                <Text style={styles.labelS}>Tipo de Alimento:</Text>
                                <RNPickerSelect
                                    onValueChange={(value) => {setSelectedValuetipoAlimento(value)
                                    }}
                                    items={tipoAlimento}
                                    value={item.value}
                                    style={pickerSelectStyles}
                                />
                            </View>

                            <View style={styles.containerS}>
                                <Text style={styles.labelS}>Alimento:               </Text>
                                <RNPickerSelect
                                    onValueChange={(value) => setSelectedValueAlimento(value)}
                                    items={filtrarAlimentos(item.value)}
                                    value={selectedalimento}
                                    style={pickerSelectStyles}
                                />
                            </View>

                            <View style={styles.containerS}>
                                <Text style={styles.labelS}>Cantidad:               </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Cantidad"
                                    onChangeText={(text) => setCantidad(text)}
                                    value={item.cantidad}
                                />
                            </View>

                            <View style={styles.containerS}>
                                <TouchableOpacity style={styles.containerButton} onPress={() => {alert('Modificar registro'); console.log(item)}}>
                                    <LinearGradient
                                        // Button Linear Gradient
                                        colors={['#a87b05', '#efb810']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.button}
                                    >
                                        <Text style={styles.text}>MODIFICAR</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.containerButton} onPress={() => {alert('Eliminar registro'); alimentos = eliminarElementosPorCantidadYAlimento(alimentos, item.cantidad, item.alimento)}}>
                                    <LinearGradient
                                        // Button Linear Gradient
                                        colors={['#670010', '#e2504c']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.button}
                                    >
                                        <Text style={styles.text}>ELIMINAR</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>
                            <Text>     </Text>

                        </View>
                    </ScrollView>
 */