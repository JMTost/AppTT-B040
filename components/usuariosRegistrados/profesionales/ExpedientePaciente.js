import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import infoApp from '../../../infoApp.json';
import FormularioExpedienteClinico from "./FormularioExpedienteClinico";
import InfoMPaciente from "./formulariosPaciente/InfoMPaciente";
const persons = [
    /* List of person data from earlier */
];

const ExpedientePaciente = ({route, navigation}) => {
    const [dataExpediente, setDataExpediente] = useState(null);
    //!agregar la funcionalidad de los expedientes, lo de los formularios para crearlos
    //!AGREAR LOS DEMAS FORMULARIOS Y TERMINAR LA FUNCIONALIDAD DEL OTRO
    const {id} = route.params;
    console.log(id);
    useEffect( () => {
        //Función para hacer la API
        const obtenReporteMed = async () => {
            try {
                const response = await fetch(`${infoApp.APIurl}/obtenReporteMedico/${id}`);
                if(response.ok){
                    const data = await response.json();
                    console.log("DATA: ", data.objeto);
                    if(  JSON.stringify(data.objeto.mediciones) === '{}' || JSON.stringify(data.objeto.habitoAlimenticio) === '{}'  || JSON.stringify(data.objeto.habitoPersonal) === '{}' || JSON.stringify(data.objeto.mediciones) === '{}'){
                      //console.log("info API: ", data);
                      setDataExpediente({mensaje : "No se cuenta con toda la información para realizar el reporte de este usuario, llene los elementos que falten, compruebe que el paciente cuente con mediciones (al menos dos) o si es un error pongase en contacto con el administrado."});
                    }else{
                      setDataExpediente(data.objeto);
                    }
                }else if(response.status === 404){
                    const data = await response.json();
                    setDataExpediente(data);
                }
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        obtenReporteMed();
    }, []);
    
    if(!dataExpediente){
        return <Text>Cargando la información</Text>
    }
    if(dataExpediente.hasOwnProperty('mensaje')){
      //console.log(dataExpediente.mensaje)
        {/*<View style={{flex : 1, alignContent : 'center', alignItems : 'center', justifyContent : 'center'}}>*/}
                    {/*<Text style={{fontWeight: 'bold'}}>{dataExpediente.mensaje}</Text>*/}
                {/*</View>*/}
        return(
                <View style={{flex : 1, alignContent : 'center', alignItems : 'center', justifyContent : 'center'}}>
                <Text>{dataExpediente.mensaje}</Text>
                <View style={styles.sectionEnlace}>
                    <TouchableOpacity onPress={() => navigation.navigate('InfoMpaciente', {id : id})}>
                        <Text style={styles.textEnlace}>Ir al formulario de información médica</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('HabitoPersonal', {id : id})}>
                        <Text style={styles.textEnlace}>Ir al formulario de hábito personal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('HabitoAlimenticio', {id : id})}>
                        <Text style={styles.textEnlace}>Ir al formulario de hábito alimenticio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('VisualizaMediciones', {id : id})}>
                      <Text style={styles.textEnlace}>Mostrar mediciones del paciente</Text>
                    </TouchableOpacity>
                </View>
                    
                </View>
            
        );
    }else{
        return (
            <ScrollView style={styles.container}>
              <Text style={styles.title}>Información del Reporte Médico</Text>
        
              <View style={styles.section}>
                <Text style={{fontWeight : 'bold'}}>Datos personales</Text>
                <Text style={styles.text}>Nombre: {dataExpediente.nombreCompleto}</Text>
                <Text style={styles.text}>Edad: {dataExpediente.edad}</Text>
                <Text style={styles.text}>Fecha nacimiento: {dataExpediente.fechaNacimiento}</Text>
                <Text style={styles.text}>Correo electrónico: {dataExpediente.email}</Text>
                <Text style={styles.text}>Número de teléfono: {dataExpediente.numeroTel}</Text>
                <Text style={styles.text}>Ocupación: {dataExpediente.ocupacion}</Text>
                {/* Agrega más detalles según sea necesario */}
              </View>

              <View style={styles.section}>
                <Text style={{fontWeight : 'bold'}}>Información médica</Text>
                <Text style={styles.text}>Objetivo: {dataExpediente.objetivo}</Text>
                <Text style={styles.text}>IMC: {dataExpediente.imc}</Text>
                <Text style={styles.text}>Alergias: {dataExpediente.alergias}</Text>
                <Text style={styles.text}>Medicamentos que comsume: {dataExpediente.medicamentosC}</Text>
              </View>
        
              <View style={styles.section}>
                <Text style={{fontWeight : 'bold'}}>Hábitos personales:</Text>
                <Text style={styles.text}>Hora de despertar: {dataExpediente.habitoPersonal.horaDespierto}</Text>
                <Text style={styles.text}>Hora en la que duerme: {dataExpediente.habitoPersonal.horaSueno}</Text>
                <Text style={styles.text}>Descripción de su rutina física: {dataExpediente.habitoPersonal.descFisica}</Text>
                <Text style={styles.text}>Rutna del día: {dataExpediente.habitoPersonal.rutinaDiaria}</Text>
                {/* Agrega más detalles según sea necesario */}
              </View>

              <View style={styles.section}>
                <Text style={{fontWeight : 'bold'}}>Hábitos alimenticios:</Text>
                <Text>Alimentos que más consume: {dataExpediente.habitoAlimenticio.alimentosMasConsumidos}</Text>
                <Text>Alimentos a los que presenta alergia: {dataExpediente.habitoAlimenticio.alimentosAlergia}</Text>
                <Text>Cantidad de consumo de agua: {dataExpediente.habitoAlimenticio.cantidadConsumoAgua}</Text>
                <Text>Cantidad de comidas que realiza: {dataExpediente.habitoAlimenticio.cantidadComidas}</Text>
                <Text>Cantidad de colaciones que realiza: {dataExpediente.habitoAlimenticio.cantidad_colaciones}</Text>
                <Text>Hora que realiza el desayuno: {dataExpediente.habitoAlimenticio.horaDesayuno}</Text>
                <Text>Hora que realiza la comida: {dataExpediente.habitoAlimenticio.horaComida}</Text>
                <Text>Hora que realiza la cena: {dataExpediente.habitoAlimenticio.horaCena}</Text>
                {/* Agrega más detalles según sea necesario */}
              </View>
        
              <View style={styles.section}>
                <Text style={{fontWeight : 'bold'}}>Mediciones:</Text>
                <Text>Primera Fecha: {dataExpediente.mediciones.primeraFecha}</Text>
                <Text>Primeras mediciones: </Text>
                <Text style={styles.text}>Peso: {dataExpediente.mediciones.primeraMedicion.peso}</Text>
                <Text style={styles.text}>Axiliar media: {dataExpediente.mediciones.primeraMedicion.axiliar_media}</Text>
                <Text style={styles.text}>Abdominal: {dataExpediente.mediciones.primeraMedicion.abdominal}</Text>
                <Text style={styles.text}>Bicipital: {dataExpediente.mediciones.primeraMedicion.bicipital}</Text>
                <Text style={styles.text}>Muslo: {dataExpediente.mediciones.primeraMedicion.muslo}</Text>
                <Text style={styles.text}>Suprailiaco: {dataExpediente.mediciones.primeraMedicion.suprailiaco}</Text>
                <Text style={styles.text}>Triceps: {dataExpediente.mediciones.primeraMedicion.triceps}</Text>
                <Text style={styles.text}>Subescapular: {dataExpediente.mediciones.primeraMedicion.subescapular}</Text>
                <Text style={styles.text}>Toracica: {dataExpediente.mediciones.primeraMedicion.toracica}</Text>
                <Text style={styles.text}>Pantorrilla medial: {dataExpediente.mediciones.primeraMedicion.pantorrilla_medial}</Text>
                <Text style={styles.text}>Cintura: {dataExpediente.mediciones.primeraMedicion.cintura}</Text>

                <Text>Última Fecha: {dataExpediente.mediciones.ultimaFecha}</Text>
                <Text>Últimas mediciones: </Text>
                <Text style={styles.text}>Peso: {dataExpediente.mediciones.ultimaMedicion.peso}</Text>
                <Text style={styles.text}>Axiliar media: {dataExpediente.mediciones.ultimaMedicion.axiliar_media}</Text>
                <Text style={styles.text}>Abdominal: {dataExpediente.mediciones.ultimaMedicion.abdominal}</Text>
                <Text style={styles.text}>Bicipital: {dataExpediente.mediciones.ultimaMedicion.bicipital}</Text>
                <Text style={styles.text}>Muslo: {dataExpediente.mediciones.ultimaMedicion.muslo}</Text>
                <Text style={styles.text}>Suprailiaco: {dataExpediente.mediciones.ultimaMedicion.suprailiaco}</Text>
                <Text style={styles.text}>Triceps: {dataExpediente.mediciones.ultimaMedicion.triceps}</Text>
                <Text style={styles.text}>Subescapular: {dataExpediente.mediciones.ultimaMedicion.subescapular}</Text>
                <Text style={styles.text}>Toracica: {dataExpediente.mediciones.ultimaMedicion.toracica}</Text>
                <Text style={styles.text}>Pantorrilla medial: {dataExpediente.mediciones.ultimaMedicion.pantorrilla_medial}</Text>
                <Text style={styles.text}>Cintura: {dataExpediente.mediciones.ultimaMedicion.cintura}</Text>
                {/* Agrega más detalles según sea necesario */}
              </View>
        
              <View style={styles.section}>
                <Text style={{fontWeight : 'bold'}}>Enfermedades:</Text>
                {dataExpediente.enfermedadesPaciente.map(enfermedad => (
                  <Text key={enfermedad.id} style={styles.text}>•{enfermedad.descripcion}</Text>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={{fontWeight : 'bold'}}>Enfermedades familiares:</Text>
                {dataExpediente.enfermedadesFamiliares.length > 0 ? dataExpediente.enfermedadesFamiliares.map(enfermedad => (
                  <Text key={enfermedad.id} style={styles.text}>•{enfermedad.descripcion}</Text>
                )): <Text style={styles.text}>No aplica</Text>}
              </View>

              <View style={styles.sectionEnlace}>
                    <TouchableOpacity onPress={() => navigation.navigate('InfoMpaciente', {id : id})}>
                        <Text style={styles.textEnlace}>Ir al formulario de información médica</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('HabitoPersonal', {id : id})}>
                        <Text style={styles.textEnlace}>Ir al formulario de hábito personal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('HabitoAlimenticio', {id : id})}>
                        <Text style={styles.textEnlace}>Ir al formulario de hábito alimenticio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('VerProgresoPacienteProfesional', {id : id, nombreC : dataExpediente.nombreCompleto})}>
                      <Text style={styles.textEnlace}>Mostrar progreso del paciente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('VisualizaMediciones', {id : id})}>
                      <Text style={styles.textEnlace}>Mostrar mediciones del paciente</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
          );
    }
    /*
    return (
        <Text>Hols</Text>
    );

    const myItemSeparator = () => {
        return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10}} />;
    };
      
    const myListEmpty = () => {
        return (
            <View style={{ alignItems: "center" }}>
                <Text style={styles.item}>No existe expediente</Text>
            </View>
        );
    };
    <SafeAreaView style={styles.container}>
          <FlatList
            data={persons}
            renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={myItemSeparator}
            
            ListEmptyComponent={myListEmpty}
            
            ListHeaderComponent={() => (
              <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
                List of Persons
              </Text>
            )}
            ListFooterComponent={() => (
              <Text style={{ fontSize: 30, textAlign: "center",marginBottom:20,fontWeight:'bold' }}>Thank You</Text>
            )}
          />
        </SafeAreaView>
    */

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      section: {
        marginBottom: 20,
      },
      text : {
        marginLeft : 10
      },
      sectionEnlace : {
        marginBottom: 20,
        paddingBottom : 20, 
        paddingTop : 10
      },
      textEnlace : {
        fontWeight : 'bold',
        color : 'blue', 
        paddingTop: 10, 
      }
  });

export default ExpedientePaciente;