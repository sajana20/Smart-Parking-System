
import { SafeAreaView, StyleSheet, Text, View, sA } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import ParkingArea from './src/screens/ParkingArea';
import NavigationScreen from './src/screens/NavigationScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() { 
     
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
        name = "Login"
        component= {LoginScreen}
        />
        <Stack.Screen
        name = "ParkingArea"
        component= {ParkingArea}
        />
         <Stack.Screen
        name = "NavigationScreen"
        component= {NavigationScreen}
        />
        </Stack.Navigator>
    </NavigationContainer>

  
  ); 
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});