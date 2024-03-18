import {StyleSheet} from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import ParkingArea from "./src/screens/ParkingArea";
import NavigationScreen from "./src/screens/NavigationScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ReservationScreen from "./src/screens/ReservationScreen";


import React, { useEffect } from "react";
import Firebase from "./Firebase";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LiveStreamScreen from "./src/screens/LiveStreamScreen";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
export default function App() {
  // const requestUserPermission = async () => {
  //   const authorizationStatus = await messaging().requestPermission();

  //   if (authorizationStatus) {
  //     // Register App with FCM
  //     await messaging().registerDeviceForRemoteMessages();

  //     // Generate FCM Token
  //     const token =  await messaging().getToken();
  //     console.log("Authorization Status - ", token);
  //   }
  // };

  useEffect(() => {
    // requestUserPermission();
  }, []);

  return (
    <NavigationContainer>
      <Firebase />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LiveStream" component={LiveStreamScreen} />
        <Stack.Screen name="MainContent" component={MainContent} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

const MainContent = ({ navigation, route }) => (
  <Tab.Navigator>
    <Tab.Screen
      name="ParkingArea"
      component={ParkingArea}
      initialParams={{ userId: route.params.userId }}
    />
    <Tab.Screen name="NavigationScreen" component={NavigationScreen} />
    <Tab.Screen name="ReservationScreen" component={ReservationScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
