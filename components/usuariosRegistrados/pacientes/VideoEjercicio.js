import  React, { useEffect, useRef, useState } from 'react';
import { Text, View, Alert, Button, ScrollView, StyleSheet, Platform, ActivityIndicator} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import infoApp from '../../../infoApp.json';
import DescargaVideos from './ios_videos/DescargaVideos';
import {Video, ResizeMode} from 'expo-av';

const VideoEjercicio = ({route, navigation}) => {
    const videoRef = useRef(null);

    const id = route.params.id;

    //console.log(id);
    if(Platform.OS === 'android' && id != 0){
        return (
            <View style={{flex : 1, alignItems : 'center', alignContent : 'center',  justifyContent : 'center', backgroundColor : 'gray'}}>
                {id && (
                    <Video key={id} ref={videoRef} style={styles.video} source={{ uri : `${infoApp.APIurl}/obtenVideoPorId/${id}` }}
                        useNativeControls
                        resizeMode={ResizeMode.STRETCH}
                        shouldPlay
                        />
                )
                }
            </View>
        );
    }else if(Platform.OS === 'ios' && id != 0){
        return (
            <View style={{flex : 1, alignItems : 'center', alignContent : 'center', justifyContent : 'center', backgroundColor : 'gray'}}>
                {
                    id && <DescargaVideos key={id} videoUrl={`${infoApp.APIurl}/obtenVideoPorId/${id}`} />
                }
            </View>
        );
    }else if(id == 0){
        return (
            <View style={{flex : 1, alignItems : 'center', alignContent : 'center',  justifyContent : 'center', backgroundColor : 'white'}}>
                <Text>Este ejercicio no cuenta con video que mostrar</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        width: 330,
        backgroundColor: 'white', // Color de fondo del campo de entrada
        paddingStart: 30,
        borderRadius: 30,
        paddingHorizontal: 20,
        marginTop:10,
      },
      video: {
        //alignSelf: 'center',
        width: 300,
        height: 450,
      },
      buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default VideoEjercicio;