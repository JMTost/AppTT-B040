import  React, { useEffect, useRef, useState } from 'react';
import { Text, View, Alert, Button, ScrollView, StyleSheet, Platform} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import infoApp from '../../../infoApp.json';
import DescargaVideos from './ios_videos/DescargaVideos';
import {Video, ResizeMode} from 'expo-av';

const VisualizacionVideos = ({route, navigation}) => {
  const {id} = route.params;

    const [selectedVideo, setSelectedVideo] = useState(null);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [status, setStatus] = useState({});
    const [nombre, setNombre] = useState(null);
    const videoRef = useRef(null);
    //console.log(infoApp.usuarioProfesional)
    const data = [];
    for(let i = 0; i < infoApp.usuarioProfesional.idVideos.length; i++){
        data.push({
            label : infoApp.usuarioProfesional.nombreVideos[i],
            value : infoApp.usuarioProfesional.idVideos[i]
        });
    }
    const handleObtencion = () => {
        
        if(value != null){
            setSelectedVideo(true);
        }
        
    }
    //handleObtencion();
    //console.log(infoApp.usuarioProfesional)
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
                    id && <DescargaVideos key={value} videoUrl={`${infoApp.APIurl}/obtenVideoPorId/${value}`} />
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
    /*
    if(Platform.OS === 'android'){
      return (
        <View style={{flex : 1, alignContent : 'center', alignItems : 'center', justifyContent : 'center'}}>
            <Text>VER Video</Text>
            <Text style={{paddingTop : 10}}>Seleccione el tipo de usuario:</Text>
          <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Selecciona una opción' : '...'}
                searchPlaceholder="Buscar..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    //console.log(item)
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />
        <Button title="Mostrar video" onPress={handleObtencion} />
        {value && <Video key={value} ref={videoRef} style={styles.video} source={{  uri : `${infoApp.APIurl}/obtenVideoPorId/${value}` }} 
        useNativeControls 
        resizeMode={ResizeMode.STRETCH} 
        onPlaybackStatusUpdate={status => setStatus(() => status)} 
        shouldPlay
        />}
        <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()
          }
        />
        </View>
        </View>
    );
    }else if(Platform.OS === 'ios'){
      return(
        <View style={{flex : 1, alignContent : 'center', alignItems : 'center', justifyContent : 'center'}}>
            <Text>VER Video</Text>
            <Text style={{paddingTop : 10}}>Seleccione el tipo de usuario:</Text>
          <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Selecciona una opción' : '...'}
                searchPlaceholder="Buscar..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    //console.log(item)
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />
        <Button title="Mostrar video" onPress={handleObtencion} />
        {value && <DescargaVideos key={value} videoUrl={`${infoApp.APIurl}/obtenVideoPorId/${value}`} />}
    
        </View>
      );
    }
    */
}

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

export default VisualizacionVideos;

//{ localUri : selectedVideo }