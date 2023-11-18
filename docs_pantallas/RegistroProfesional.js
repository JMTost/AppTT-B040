import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView, Pressable, Platform, Touchable, TouchableOpacity,Image,picker} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonGradient from './ButtonRegister';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';


export default function RegistroProfesional() {

  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [edad, setEdad] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmacionContrasena, setConfirmacionContrasena] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [date, setDate] = useState (new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null); //Selector SyN
  const [textDireccion, setTextDireccion] = useState('');
  

  const handleRegistro = () => {
    // Aquí puedes agregar la lógica de registro de usuario
    // Puedes acceder a los datos ingresados en los estados correspondientes.
    console.log('Datos de registro:');
    console.log('Nombre:', nombre);
    console.log('Apellido Paterno:', apellidoPaterno);
    console.log('Apellido Materno:', apellidoMaterno);
    console.log('Edad:', edad);
    console.log('Fecha de Nacimiento:', fechaNacimiento);
    console.log('Número Telefónico:', telefono);
    console.log('Correo Electrónico:', email);
    console.log('Contraseña:', contrasena);
    console.log('Confirmación de Contraseña:', confirmacionContrasena);
    console.log('Selección:', selectedOption);
  };

  const toggleDatePicker = () =>{
    setShowPicker(!showPicker);
  };

  const onChange = ({type}, selectedDate) =>{
    if (type == "set"){
        const currentDate = selectedDate; 
        setDate (currentDate);
    }else {
        toggleDatePicker();
    }
  };

  const confirmDate = () => {
    setFechaNacimiento(formatDate(date));
    toggleDatePicker();
  }

  const formatDate = (rawDate) =>{
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    return `${day} / ${month} / ${year}`;

  }

  const data = [
    { label: 'Nutriólogo', value: '1' },
    { label: 'Preparador Físico', value: '2' },
    { label: 'Ambos', value: '3' },
  ];
    
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Acceder a la imagen seleccionada a través del nuevo array 'assets'
      setSelectedImage(result.assets[0].uri);
    }
  };

  const options = [
    { label: 'Sí', value: 'option1' },
    { label: 'No', value: 'option2' },

  ];

  return (

    <ScrollView style={styles.container}>
        <View style={styles.content}>

        <Text style={styles.title}>REGISTRO</Text>
        <TextInput
            style={styles.input}
            placeholder="Nombre(s)"
            onChangeText={(text) => setNombre(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Apellido Paterno"
            onChangeText={(text) => setApellidoPaterno(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Apellido Materno"
            onChangeText={(text) => setApellidoMaterno(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Edad"
            keyboardType="numeric"
            onChangeText={(text) => setEdad(text)}
        />
       
        {showPicker && (
            <DateTimePicker 
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                style={styles.datePicker}
                locale={'es'}>
            
            </DateTimePicker>
        )}

        
        {!showPicker && (
            <Pressable onPress={toggleDatePicker}>
                <TextInput
                    style={styles.inputDate}
                    placeholder="Fecha de Nacimiento"
                    value={fechaNacimiento}
                    onChangeText={setFechaNacimiento}
                    editable={false}
                    onPressIn={toggleDatePicker}
                />
            </Pressable>
        )}

        {showPicker && Platform.OS === "ios" && (
             <View
              style={{ flexDirection: "row", justifyContent: "space-around"}}>

                <TouchableOpacity style={[styles.button, styles.pickerButton]}
                    onPress={toggleDatePicker}>
                    <Text>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.pickerButton]}
                    onPress={confirmDate}>
                    <Text>Confirmar</Text>
                </TouchableOpacity>
            </View>
        )}
       
        
        <TextInput
            style={styles.input}
            placeholder="Número Telefónico"
            keyboardType="phone-pad"
            onChangeText={(text) => setTelefono(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={(text) => setContrasena(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Confirmación de Contraseña"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmacionContrasena(text)}
        />

        <View style={styles.containerDrop}>
            <Text style={styles.text}>Tipo de profesinal:</Text>
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
                setValue(item.value);
                setIsFocus(false);
            }}
        />
        </View>

        <TextInput
            style={styles.input}
            placeholder="Cedula Profesional"
            onChangeText={(text) => setApellidoMaterno(text)}
            placeholderTextColor="#b5b5b5"
        />

      <TouchableOpacity style={styles.containerConstancia} onPress={pickImage} >
            <LinearGradient
                // Button Linear Gradient
                colors={['#67b5ad','#67b5ad']}   
                start={{x:0, y:0}}
                end={{x:1, y:1}} 
                style={styles.button}      
            >           
                <Text style={styles.textConstancia}>Selecciona la imagen de tu Constancia Profesional</Text>
            </LinearGradient>
        </TouchableOpacity>
        {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
        
        <View style={styles.containerS}>
          <Text style={styles.labelS}>¿Cuena con consultorio propio?</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedValue(value)}
            items={options}
            value={selectedValue}
            style={pickerSelectStyles}
          />
        </View>
          
        <TextInput
          style={styles.inputDireccion}
          multiline={true}
          numberOfLines={4} // Puedes ajustar la cantidad de líneas visibles
          value={textDireccion}
          onChangeText={(newText) => setTextDireccion(newText)}
          placeholder="Escribe aquí tu dirección..."
        />

        <ButtonGradient></ButtonGradient>
        </View>
    </ScrollView>

    
  );
}


//--------- ESTILOS ----------//

const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        fontWeight: 'bold'
    },

  container: {
    flex: 1,
    backgroundColor: '#93ccc6',
  },

  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop:20,
  },

  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    marginTop: 10,
  },

  inputDate: {
    width: 330,
    height: 50,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    marginTop: 10,
  },

  picker: {
    width: 320,
    height: 50,
    marginBottom: 70,
    backgroundColor: 'white',
    marginTop: 10,
  },

  datePicker:{
    height: 120,
    width: '100%',
    marginTop: -10,
  },

  pickerButton:{
    paddingHorizontal: 20,
    width: 100,
  },

  button:{},

  containerDrop:{
    borderRadius:30,
    flex: 1,
    backgroundColor: '#93ccc6',
  },

  dropdown: {
    height: 50,
    width: 330,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginTop:10,
  },

  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
    borderRadius: 30,
  },

  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 30,
  },
  text:{
    marginTop:10,
    width: 320,
    marginLeft: 10,
  },

  image: {
    width: 200,
    height: 200,
  },
  containerConstancia:{          
    alignItems: 'center', 
    width:410,
    marginTop: 15,
    marginBottom: 15,
},

textConstancia: {
  fontSize: 14,  
},
button:{
    width: '80%',
    height: 35,
    borderRadius: 25, 
    padding: 10,        
    alignItems: 'center', 
    justifyContent: 'center'
},
containerS: {
  flex: 1,
  marginRight:130,
  width: 200,
},
labelS: {
    width: 320,
    marginLeft: 10,
    marginTop: 10,
},
selectedOptionS: {
  fontSize: 16,
  marginTop: 10,
  width:100,
},
inputDireccion: {
  width: '80%',
  height: 80,
  backgroundColor: 'white', // Color de fondo del campo de entrada
  paddingStart: 30,
  borderRadius: 30,
  marginTop: 10,
},

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignContent: 'center',
    alignContent:'center',
    width: 330,
    height: 50,
    backgroundColor: 'white', // Color de fondo del campo de entrada
    paddingStart: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
  },
});
