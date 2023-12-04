import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, SafeAreaView, FlatList, Linking} from 'react-native';
import infoApp from '../../../infoApp.json';

const ListaPacientes = ({navigation}) => {


    const listaVacia = () => {
        return (
            <View style={{alignItems : 'center'}}>
                <Text>No hay información</Text>
            </View>
        );
    };
    if(infoApp.usuarioProfesional.pacientes === "No se cuenta con pacientes"){
        return (
            <View style={{flex : 1, alignContent : 'center', alignItems : 'center', justifyContent : 'center'}}>
                <Text style={{fontSize : 20, fontWeight : 'bold'}}>{infoApp.usuarioProfesional.pacientes}</Text>
            </View>
        );
    }else{
        //!agregar la funcionalidad de los botones, verificar los estilos de los mismos 
        return(
            <SafeAreaView style={styles.container}>
                <FlatList data = {infoApp.usuarioProfesional.pacientes} renderItem={ ({item}) => 
                    <View style={styles.content}>
                        <Image style={styles.icon} source={{uri : `${infoApp.APIurl}/obtenImgPaciente/${item.id}`}} />
                        <Text style={styles.item}>{item.nombreC}</Text>
                        <TouchableOpacity style={styles.iconOption1} onPress={() => Linking.openURL("tel:"+item.num)}>
                            <Image
                                source={require("../../../Imagenes/telefono.png")}
                                style={styles.iconOption1}
                            />    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconOption2} onPress={ () => navigation.navigate("ExpedientePaciente", {id : item.id})}>
                            <Image source={require('../../../Imagenes/expediente.png')} style={styles.iconOption2} />
                        </TouchableOpacity>
    
                        <TouchableOpacity style={styles.iconOption3} onPress={ () => navigation.navigate('RutinaPacienteProfesional', {id : item.id})}>
                            <Image source={require('../../../Imagenes/ejercicio.png')} style={styles.iconOption3} />
                        </TouchableOpacity>
    
                        <TouchableOpacity style={styles.iconOption4} onPress={ () => navigation.navigate('VisualizarDieta', {id : item.id})}>
                            <Image source={require('../../../Imagenes/dieta.png')} style={styles.iconOption4} />
                        </TouchableOpacity>
    
                    </View>
                
                } keyExtractor={(item) => item.id}
                ListEmptyComponent={listaVacia}
                />
            </SafeAreaView>
        );   
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 0,
      fontSize: 30,
    },
    item: {
      padding: 30,
      fontSize: 15,
      marginTop: 10,
      marginBottom: 10,
      left: 45,
      width : 180
    },
    content: {
      backgroundColor: "#fff",
      borderRadius: 20,
      flexDirection: "row",
      marginTop: 3,
      alignItems: "center",
     },
     icon: {
      width: 50,
      height: 50,
      borderRadius: 15,
      position: "absolute",
      top: "auto",
      left: 15,
      zIndex: 10,
      },
      iconOption1: {
          width: 35,
          height: 35,
          borderRadius: 15,
          position: "absolute",
          top: "auto",
          right: 80,
          zIndex: 10,
      },
      iconOption2: {
          width: 35,
          height: 35,
          borderRadius: 15,
          position: "absolute",
          top: "auto",
          right: 55,
          zIndex: 10,
          //backgroundColor : 'black'
      },
      iconOption3: {
          width: 35,
          height: 35,
          borderRadius: 15,
          position: "absolute",
          top: "auto",
          right: 30,
          zIndex: 10,
          //backgroundColor : 'green'
      },
      iconOption4: {
          width: 35,
          height: 35,
          borderRadius: 15,
          position: "absolute",
          top: "auto",
          right: 5,
          zIndex: 10,
          //backgroundColor : 'blue'
      },
  });

export default ListaPacientes;
