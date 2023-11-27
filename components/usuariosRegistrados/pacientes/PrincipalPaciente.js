import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import infoApp from '../../../infoApp.json';

export default function PrincipalPaciente({navigation}) {
    const [user, setUser] = useState({
        name: infoApp.usuarioPaciente.nombreC,
    });

    //elemento para resetear la imagen
    const [imagenPerfil, setImagenPerfil] = useState(infoApp.usuarioPaciente.urlImagen_usuario);
    const handleFocus = useCallback( () => {
        //actualizamos la imagen de usuario cuando regresamos al componente
      setImagenPerfil(infoApp.usuarioPaciente.urlImagen_usuario);
    }, []);
    
    useEffect(() => {
        // Agregamos un listener para el evento de enfoque
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);

        // Limpiamos el listener cuando el componente se desmonta
        return () => {
            unsubscribeFocus();
        };
    }, [handleFocus, navigation]);

    return (
        <ScrollView style={styles.container}>
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => navigation.navigate('PerfilUsuario')} >
                    <Image
                            source={require("../../../Imagenes/edit.png")}
                            style={styles.iconEdit}                            
                    />
                 </TouchableOpacity>

                <Text style={styles.title}>¡Bienvenido!</Text>
                <Image
                    source={{uri : imagenPerfil}}
                    style={styles.userImage}
                />
                <Text style={styles.userName}>{user.name}</Text>
            </View>

            <TouchableOpacity style={styles.content2} onPress={() => navigation.navigate('RutinaEjerciciosPaciente')} >
                <View style={styles.container2}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../../../Imagenes/exercise.png')}
                            style={styles.icon}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title2}>Rutina de Ejercicios</Text>
                        <Text style={styles.description}>En esta sección podrás visualizar la rutina de ejercicios que tu profesional de la salud ha creado específicamente para ti, con el fin de cumplis tus objetivos.</Text>
                    </View>
                </View>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#6cbdb5', '#93ccc6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button}
                >
                </LinearGradient>
            </TouchableOpacity>


            <TouchableOpacity style={styles.content2} onPress={() => navigation.navigate('DietaPaciente')}>
                <View style={styles.container2}>    
                    <View style={styles.iconContainer}>
                        <Image
                            source={require("../../../Imagenes/diet.png")}
                            style={styles.icon}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title2}>Dieta Alimenticia</Text>
                        <Text style={styles.description}>En esta sección podrás ver la dieta que tu profesional ha creado para ti con base en tus gustos alimenticios y tus objeivos.</Text>
                    </View>
                </View>    
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#6cbdb5', '#93ccc6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button}
                >
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.content2} onPress={() => navigation.navigate('ProgresoPaciente')}>
                <View style={styles.container2}>  
                    <View style={styles.iconContainer}>
                        <Image
                            source={require("../../../Imagenes/progress.png")}
                            style={styles.icon}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title2}>Progreso Personal</Text>
                        <Text style={styles.description}>Dentro de esta sección podrás visualizar el progreso que has tenido al paso de los meses con respecto a tus medidas corporales.</Text>
                    </View>
                </View>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#6cbdb5', '#93ccc6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button}
                >
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.content2} onPress={() => navigation.navigate('CitaPaciente')}>
                <View style={styles.container2}>    
                    <View style={styles.iconContainer}>
                        <Image
                            source={require("../../../Imagenes/calendar.png")}
                            style={styles.icon}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title2}>Próxima Cita</Text>
                        <Text style={styles.description}>Dentro de esta sección podrás visualizar tu próxima cita con tu profesional de la salud.</Text>
                    </View>
                </View>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#6cbdb5', '#93ccc6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button}
                >
                </LinearGradient>
            </TouchableOpacity>


        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#93ccc6',
        paddingTop : 15
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        fontWeight: 'bold',
        backgroundColor: '#93ccc6',
    },
    content2: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        fontWeight: 'bold',
        backgroundColor: '#93ccc6',
    },
    userImage: {
        width: 100,
        height: 100,
        marginTop: 5,
        marginBottom: 10,
        borderRadius : 50
    },
    title: {
        fontSize: 30,
    },
    userName: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },

    options: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        marginBottom: 20,
    },

    container2: {
        height: 120,
        backgroundColor: "#fff",
        borderRadius: 20,
        flexDirection: "row",
        marginTop: 3,
        alignItems: "center",
    },
    iconContainer: {
        marginLeft: 20,
        alignItems: "flex-start",
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 15,
    },
    iconEdit: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 380
    },
    titleContainer: {
        flex: 1,
        alignItems: "center",
        margin: 25,
    },

    title2: {
        fontSize: 28,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 13,
        textAlign: "justify",
    },

});
