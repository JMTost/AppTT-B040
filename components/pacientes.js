import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import InfoApiMed from './graficas/InfoApiMedica'; 
export default function PacientScreen(){//pagina principal
    return (
        <ScrollView>
            <View style={{flex : 1, justifyContent:'center', alignItems : 'center'}}>
                <Text>Pagina de pacientes otro archivo</Text>
                <InfoApiMed />
            </View>
        </ScrollView>
    );
};
//npm react-native-chart-kit
//npm react-native-table-component
//npm react-native-svg
