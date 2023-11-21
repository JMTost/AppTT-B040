import * as React from 'react';
import { Text, View, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './components/home';
import PacientScreen from './components/pacientes';

//import de los archivos para usuarios no registrados
import IniciarSesion from './components/usuariosNoRegistrados/IniciarSesion';
import RegistroPaciente from './components/usuariosNoRegistrados/RegistroPaciente';
import RegistroProfesional from './components/usuariosNoRegistrados/RegistroProfesional';
import recuperarContrasena from './components/usuariosNoRegistrados/RecuperarContrasena';

import infoApp from './infoApp.json';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();


function Home() {
  /*
   <View style={{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
        <Text>Nada que mostrar</Text>
      </View>
  */
  return (
        <Stack.Navigator screenOptions={{headerShown : false}} initialRouteName='InicioSesion'>
        {
          //de esta manera podemos dar servicio a ambos elementos previamente creados
          //este menu es para los usuarios no registrados 
        }
          <Stack.Screen name="InicioSesion" component={IniciarSesion} />
          <Stack.Screen name="Registro de Paciente" component={RegistroPaciente}/>
          <Stack.Screen name="Registro de Profesional" component={RegistroProfesional} />
          <Stack.Screen name="Recuperar contraseña" component={recuperarContrasena} />
        </Stack.Navigator>
  );
}

function MenuUsuario() {
  infoUser = {
    
  };
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if(route.name === 'Pacient'){
          iconName = focused ? 'body' : 'body-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'person' : 'person-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={15} color={color} />;
      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'blue',
  })}>
    <Tab.Screen name= "home" component={HomeScreen} options={{title:"home"}} />
    <Tab.Screen name= "Pacient" component={PacientScreen} options={{title:"Pacientes"}} />
    
  </Tab.Navigator>
  );
}

function MenuUsuarioProfesional(){
  return (
    <View style={{flex :1, alignContent : 'center', alignItems : 'center'}}>
      <Text>Usuario profesional</Text>
    </View>
  );
}


function App(){
  //let isLoggedIn = infoApp.isLogged;
  const infoUser = {
    
  };
  return (
    <NavigationContainer >
      <Stack.Navigator>
        {/*pantallas para usuarios no loggeados*/}
        
          <Stack.Screen name = "Inicio" component={Home} options={{headerShown : false}}/>

      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default App;
/*
{infoApp.isLogged ? (
          infoApp.tipo === 'paciente' ? (
            //pantallas para los usuarios loggeados
            <Stack.Group>
            <Stack.Screen name = "Menu usuario" component={MenuUsuario}/>
            </Stack.Group>
          ) : infoApp.tipo === 'profesional' ? (
            <Stack.Screen name = "Menu usuario" component={MenuUsuarioProfesional}/>
          ) : null
        ) : (
          
        )}
 */

/*//header

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Pagina principal</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
*/



/* //otro navegador
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button
        title="Open drawer"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <Button
        title="Toggle drawer"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
*/


/* //Pasar entre paginas un mensaje
import * as React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/


/*// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ route, navigation }) {
  const {idUsuario} = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Página principal</Text>
      <Text>Valor principal {idUsuario}</Text>
      <Button title='Ir a detalles' onPress={() => {
          navigation.navigate('Detalles', {
            idUsuario: 3,
            tipo: 'profesional',
          });
        }} />
    </View>
  );
}

function DetailScreen({ route, navigation }) {
  //obtenemos los parametros
  const {idUsuario} = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Página de detalles</Text>
      <Button title='Regresar a detalles' onPress={() => navigation.push('Detalles')} />
      <Button title="Ir al inicio" onPress={() => navigation.navigate('Principal')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Text>Id usuario : {JSON.stringify(idUsuario)}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Principal'>
        <Stack.Screen name="Principal" component={HomeScreen} initialParams={{idUsuario : 8}}  />
        <Stack.Screen name="Detalles" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
*/