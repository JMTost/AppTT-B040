import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ResizeMode, Video } from 'expo-av';

const DescargaVideos = ({videoUrl}) => {
    const [downloadedUri, setDownloadedUri] = useState(null);
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});

    useEffect ( () => {
        const descargaVideo = async () => {
            try {
                //Verificamos si existe para eliminar el archivo

                if(downloadedUri && (await FileSystem.getInfoAsync(downloadedUri)).exists){
                    await FileSystem.deleteAsync(downloadedUri);
                }

                const downloadResumable = FileSystem.createDownloadResumable(
                    videoUrl,
                FileSystem.documentDirectory + 'downloadedVideo.mp4'
                );
        
                const { uri } = await downloadResumable.downloadAsync();
        
                setDownloadedUri(uri);
            } catch (error) {
                console.error('Error downloading video:', error);
            }
        };
        descargaVideo();
    }, [videoUrl]);

    const playPauseVideo = () => {
        if (status.isPlaying) {
            videoRef.current.pauseAsync();
          } else {
            videoRef.current.playAsync();
          }
    };

    return (
        <View style={styles.container}>
            {downloadedUri ? (
            <Video
                ref={videoRef}
                style={styles.video}
                source={{ uri: downloadedUri }}
                useNativeControls
                resizeMode={ResizeMode.STRETCH}
                onPlaybackStatusUpdate={(newStatus) => setStatus(newStatus)}
                shouldPlay
            />
            ) : (
            <Text>Descargando video...</Text>
            )}

            <View style={styles.buttons}>
                <Button title={status.isPlaying ? 'Pause' : 'Play'} onPress={playPauseVideo} />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
      width: 200,
      height: 300,
    },
    buttons: {
      marginTop: 20,
    },
  });

  export default DescargaVideos;