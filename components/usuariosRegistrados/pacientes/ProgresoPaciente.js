import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import infoApp from '../../../infoApp.json'
import InfoApiMed from '../../graficas/InfoApiMedica';
export default function PacientScreen(){//pagina principal
    return (
        <ScrollView>
            <View style={{flex : 1, justifyContent:'center', alignItems : 'center', paddingTop : 50}}>
                <Text>Pagina de pacientes otro archivo</Text>
                <InfoApiMed />
            </View>
        </ScrollView>
    );
};