import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import ListaPacientes from "./ListaPacientes";
import UserProfileScreenProfesional from "./UserProfileScreen";
import CitasProfesional from "./CitasProfesional";
import ExpedientePaciente from "./ExpedientePaciente";

const Tab = createBottomTabNavigator();

const  PrincipalProfesional = ({navigation}) => {
    return(
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
      
              if (route.name === 'ListaPacientes') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if(route.name === 'CitasProfesional'){
                iconName = focused ? 'body' : 'body-outline';
              } else if (route.name === 'UserScreen') {
                iconName = focused ? 'person' : 'person-outline';
              }

              if(route.name === 'ExpedientePaicente'){
                navigation.setOptions({tabBarVisiable : false});
              }

              return <Ionicons name={iconName} size={15} color={color} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'black',
        })}>
          <Tab.Screen name="ListaPacientes" component={ListaPacientes} options={{title : "Lista de pacientes"}}/>
          {
            <Tab.Screen name="UserScreen" component={UserProfileScreenProfesional} options={{title:"Perfil" }} />
          }
          <Tab.Screen name="CitasProfesional" component={CitasProfesional} options={{title : "Citas profesional"}} />
          {
            //<Tab.Screen name="VideoScreen" component={CargaVideosRutina} />
          }
          {
            //<Tab.Screen name="VisualizaVideo" component={VisualizacionVideos} />
          }

          {/*<Tab.Screen name="Formulario" component={FormularioExpedienteClinico} />*/}
          {
            /*<Tab.Screen name="FormularioInfoMPaciente" component={InfoMPaciente} />*/
          }
          {
            //<Tab.Screen name="Settings" component={SettingsScreen} options={{title:"Perfil"}} />
          }
      </Tab.Navigator>
    );
};

export default PrincipalProfesional;
/*
<Tab.Navigator initialRouteName="Pacientes" screenOptions={({route}) => ({
            tabBarIcon : ({focused, color, size}) => {
                let iconName;

                if(route.name === 'Pacientes'){
                    iconName = focused ? 'person' : 'person-outline';
                }else if(route.name === 'Perfil'){
                    iconName = focused ? 'home' : 'home-outline';
                }else if(route.name === 'Citas'){
                    iconName = focused ? 'calendar' : 'calendar-outline';
                }
                return <Ionicons name={iconName} size={15} color={color} />;
            }, tabBarActiveTintColor : 'green', tabBarInactiveTintColor : 'blue',
        })}>
            <Tab.Screen name="Pacientes" component={ListaPacientes} options={{title : "Pacientes"}}/>
            */
            {/* <Tab.Screen name="Perfil" options={{title : "Perfil"}} /> */}
            //{/* <Tab.Screen name="Citas" option={{title : "Citas"}} /> */}
            //</Tab.Navigator>
 