import  React, { useEffect, useRef, useState } from 'react';
import { Text, View, Alert, Button, ScrollView, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import infoApp from '../../../infoApp.json';

import {Video, ResizeMode} from 'expo-av';

const VisualizacionVideos = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [status, setStatus] = useState({});
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
            console.log("info", value);
        }
        
    }
    //handleObtencion();
    //console.log(infoApp.usuarioProfesional)
    return (
        <View style={{flex : 1, alignContent : 'center', alignItems : 'center', justifyContent : 'center'}}>
            <Text>VER VIDIO</Text>
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
        {selectedVideo && <Video ref={videoRef} style={styles.video} source={{ uri : `${infoApp.APIurl}/obtenVideoPorId/${value}` }} useNativeControls resizeMode={ResizeMode.STRETCH} onPlaybackStatusUpdate={status => setStatus(() => status)} shouldPlay/>}
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
        height: 400,
      },
      buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default VisualizacionVideos;

//{ localUri : selectedVideo }