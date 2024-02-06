import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Platform, StatusBar, Image, SafeAreaView, Alert} from 'react-native';
import parkingAreaService from '../../service/parking-area-service'

function ParkingArea() {
    // const [zoneA, setZoneA] = useState([]);
    // const [zoneB, setZoneB] = useState([]);
    // const chunks = [];

    // const getAvailability = async () => {
        
    //     const data = parkingAreaService.getparkingAvailability();
    //     const chunkSize = data.length/4;
        
    //         for (let i = 0; i < data.length; i += chunkSize) {
    //             chunks.push(data.slice(i, i + chunkSize))
    //         }
            
    //         if (chunks.length > 0) {
    //             const tempZoneA = [];

    //             for (let i=0; i < chunks[0].length; i++) {
    //                 tempZoneA.push( 
    //                 <TouchableOpacity onPress={onClick} key={chunks[0][i].id}>      
    //                     <ParkingSlot slotId = {chunks[0][i].id} isAvailable={chunks[0][i].availability}/>
    //                 </TouchableOpacity>);
    //             }
    //         setZoneA(tempZoneA);
    //         }
        
    //         if (chunks.length > 1) {
    //             const tempZoneB = [];
        
    //             for (let i=0; i < chunks[1].length; i++) {
    //                 tempZoneB.push( 
    //                 <TouchableOpacity onPress={onClick} key={chunks[1][i].id}>      
    //                     <ParkingSlot slotId = {chunks[1][i].id} isAvailable={chunks[1][i].availability}/>
    //                 </TouchableOpacity>);
    //             } 
    //             setZoneB(tempZoneB);
    //         }
            
    // };

    // useEffect(() => {
    //     getAvailability();
    // }, []);



   
   
  return (
    <SafeAreaView style={{flex:1, flexDirection: 'row', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, backgroundColor: '#0C1020' }}>
    <View style={{flex:5}}>

       
        <View style={styles.Upcontainer}>
        <TouchableOpacity onPress={onClick}>
            <ParkingSlot slotId = {1} isAvailable = 'false' />
        </TouchableOpacity>
            <ParkingSlot slotId = {2}/>
            <ParkingSlot slotId = {3} isAvailable = 'false'/>
        </View>

        <View style={styles.Downcontainer}>
            <ParkingSlot slotId = {6}/>
            <ParkingSlot slotId = {5} isAvailable = 'false'/>
            <ParkingSlot slotId = {4}/>

        </View> 
    </View>
    <View style={{flex:1}}>

    </View>
    <View style={{flex:5}}>
        <View style={styles.Upcontainer}>
        <ParkingSlot slotId = {12} isAvailable = 'false' />
        <ParkingSlot slotId = {11}/>
        <ParkingSlot slotId = {10}/>
        </View>

        <View style={styles.Downcontainer}>
        <ParkingSlot slotId = {7} />
        <ParkingSlot slotId = {8} isAvailable = 'false' />
        <ParkingSlot slotId = {9} />
        </View> 
    </View>
    </SafeAreaView>
 );



};



const onClick = () => {
    Alert.alert("Confirm Reservation", "Are you sure ", [{text: "Yes", onPress: {onConfirm}},{text: "No"}])
   
}

const onConfirm = () => {

}

const ParkingSlot = ({slotId, isAvailable}) => (

    
    <View style={{height:100, borderColor: '#4D5366',borderWidth: 2}} >
        <Text style={{color: 'white', fontSize: 25, fontWeight:'bold', justifyContent: 'center'}}>P{slotId}</Text>
        {isAvailable? <Image  style={{objectFit:'contain', height:100, width:'100%', transform: [{rotate: '90deg'}],position:'absolute'}} source={require('../../assets/car-top-view.png')}/> : null} 
        

        
    </View>

);

const styles = StyleSheet.create({
    Upcontainer: {
        flex:1,
        
        
    },
    Downcontainer: {
        flex:1,
        flexDirection: 'column-reverse',
        
    }
})







export default ParkingArea;