import LoginScreen from "./src/screens/LoginScreen";
import ParkingArea from "./src/screens/ParkingArea";
import NavigationScreen from "./src/screens/NavigationScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ReservationScreen from "./src/screens/ReservationScreen";
import VideoScreen from "./src/screens/VideoScreen";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import React from "react";
import Firebase from "./Firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LiveStreamScreen from "./src/screens/LiveStreamScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#004B6B" barStyle="light-content" />
      <Firebase />
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Live Stream"
          component={LiveStreamScreen}
          options={{
            headerBackTitle: "Back",
            headerTintColor: "white",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#001C29",
            },
            headerTitleStyle: {
              color: "white",
            },
          }}
        />

        <Stack.Screen
          name="Recordings"
          component={VideoScreen}
          options={{
            headerBackTitle: "Back",
            headerTintColor: "white",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#001C29",
            },
            headerTitleStyle: {
              color: "white",
            },
          }}
        />

        <Stack.Screen
          name="MainContent"
          component={MainContent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainContent = ({ navigation, route }) => (
  <Tab.Navigator
    screenOptions={() => ({
      tabBarStyle: {
        backgroundColor: "#001C29",
        paddingBottom: 6,
        height: 60,
      },
      headerStyle: {
        backgroundColor: "#001C29",
      },
      headerTitleStyle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 27,
      },
    })}
  >
    <Tab.Screen
      name="Parking Area"
      component={ParkingArea}
      options={{
        unmountOnBlur: true,
        tabBarIcon: () => (
          <FontAwesome5 name="car-alt" size={26} color="#005D85" />
        ),
      }}
      initialParams={{ userId: route.params.userId }}
    />
    <Tab.Screen
      name="Navigation"
      component={NavigationScreen}
      options={{
        unmountOnBlur: true,
        tabBarIcon: () => (
          <MaterialIcons
            name="assistant-navigation"
            size={24}
            color="#005D85"
          />
        ),
      }}
    />
    <Tab.Screen
      name="Reservations"
      component={ReservationScreen}
      options={{
        unmountOnBlur: true,
        tabBarIcon: () => (
          <FontAwesome5 name="receipt" size={24} color="#005D85" />
        ),
      }}
    />
     <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        unmountOnBlur: true,
        tabBarIcon: () => (
          <MaterialCommunityIcons name="face-man-profile" size={24} color="#005D85" />
        ),
      }}
    />
  </Tab.Navigator>
);
