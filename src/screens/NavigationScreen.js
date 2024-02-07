import React from 'react';
import {View, Text, Image, Platform, StatusBar, SafeAreaView} from 'react-native';


function NavigationScreen(props) {
    return (
        
        <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, backgroundColor: '#0C1020' }}>
            <Image  style={{height:'100%', width:'100%'}} source={require('../../assets/navigation.png')}/>
        </SafeAreaView>
        
        
    );
}

export default NavigationScreen;

