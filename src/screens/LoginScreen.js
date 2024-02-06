import React, {useState} from 'react';
import { SafeAreaView, TextInput, StyleSheet, Button, View, TouchableOpacity, Text } from 'react-native';
// import userService from '../../service/user-service'


function LoginScreen(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    

    return (
        <SafeAreaView style={styles.container}>
            <View >
               <Text style={styles.title}>Welcome To Smart Parking System </Text>
            </View>
            <View style={styles.useNamePassContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail} 
                    value={email}
                    placeholder='User Name'
                    placeholderTextColor={'white'}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    placeholderTextColor={'white'}
                    keyboardType="numeric"
                />
            </View>
        <View>
            <TouchableOpacity style={styles.loginbtn}>
                <Text>Login</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.loginbtn} onPress={onSignup}>
                <Text>SignUp</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.forgot} onPress = {onPressForgotPassword}>
                <Text style= {{color: 'white'}}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>

      </SafeAreaView>
       
    );
}

const onLogin = (email, password) => {
    ValidityState = userService.login(email, password)
    if (ValidityState){
        //navigate home screen
    }


}
const onSignup = () => {
}

const onPressForgotPassword = () => {
    // Do something about forgot password operation
    };

const styles = StyleSheet.create({
    input: { 
      height: 40,
      margin: 10,
      borderWidth: 1,
      borderRadius: 6,
      padding: 5,
      width: '100%',
      borderColor: 'white',
      color: 'white',
    },
    loginbtn: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: '100%',
        height: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        borderRadius: 6,
        marginBottom: 10
        
        
      },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#0C1020'

        // alignItems: 'center',
        // justifyContent: 'center',
    },
    useNamePassContainer: {
        alignItems: 'center',
    },
    forgot:{
        fontSize:11
    },
    title: {
        fontSize: 46,
        color:"white",
    }
  });

export default LoginScreen;