import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import parkingAreaService from "../../service/parking-area-service";
import userReservationService from "../../service/user-reservation-service";

function ParkingArea({ navigation, route }) {
  const [zoneA, setZoneA] = useState([]);
  const [zoneB, setZoneB] = useState([]);
  const [zoneC, setZoneC] = useState([]);
  const [zoneD, setZoneD] = useState([]);
  const chunks = [];
  const getAvailability = async () => {
    const data = await parkingAreaService.getparkingAvailability();
    const chunkSize = data.length / 4;

    for (var i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }

    if (chunks.length > 0) {
      const tempZoneA = [];

      for (var i = 0; i < chunks[0].length; i++) {
        tempZoneA.push(
          <TouchableOpacity
            onPress={clickSlot.bind(
              this,
              chunks[0][i].availability,
              route.params.userId,
              chunks[0][i].slotId
            )}
            key={chunks[0][i].slotId}
          >
            <ParkingSlot
              slotId={chunks[0][i].slotId}
              isAvailable={chunks[0][i].availability}
            />
          </TouchableOpacity>
        );
      }
      setZoneA(tempZoneA);
    }

    if (chunks.length > 1) {
      const tempZoneB = [];

      for (let i = 0; i < chunks[1].length; i++) {
        tempZoneB.push(
          <TouchableOpacity
            onPress={clickSlot.bind(
              this,
              chunks[1][i].availability,
              route.params.userId,
              chunks[1][i].slotId
            )}
            key={chunks[1][i].slotId}
          >
            <ParkingSlot
              slotId={chunks[1][i].slotId}
              isAvailable={chunks[1][i].availability}
            />
          </TouchableOpacity>
        );
      }
      setZoneB(tempZoneB);
    }
    if (chunks.length > 2) {
      const tempZoneC = [];

      for (let i = 0; i < chunks[1].length; i++) {
        tempZoneC.push(
          <TouchableOpacity
            onPress={clickSlot.bind(
              this,
              chunks[2][i].availability,
              route.params.userId,
              chunks[2][i].slotId
            )}
            key={chunks[2][i].slotId}
          >
            <ParkingSlot
              slotId={chunks[2][i].slotId}
              isAvailable={chunks[2][i].availability}
            />
          </TouchableOpacity>
        );
      }
      setZoneC(tempZoneC);
    }
    if (chunks.length > 3) {
      const tempZoneD = [];

      for (let i = 0; i < chunks[1].length; i++) {
        tempZoneD.push(
          <TouchableOpacity
            onPress={clickSlot.bind(
              this,
              chunks[3][i].availability,
              route.params.userId,
              chunks[3][i].slotId
            )}
            key={chunks[3][i].slotId}
          >
            <ParkingSlot
              slotId={chunks[3][i].slotId}
              isAvailable={chunks[3][i].availability}
            />
          </TouchableOpacity>
        );
      }
      setZoneD(tempZoneD);
    }
  };

  useEffect(() => {
    getAvailability();
  }, []);

  const onSlotClick = () => {
    navigation.navigate("NavigationScreen");
  };

  const clickSlot = (availability, userId, slotId) => {
    if (availability === 0) {
      Alert.alert("Already Resesrved", "Please select an available slot", [
        {
          text: "Ok",
        },
      ]);
    } else {
      Alert.alert("Confirm Reservation", "Are you sure ", [
        {
          text: "Yes",
          onPress: () => {
            onPressSlot(userId, slotId);
            navigation.navigate("NavigationScreen");
          },
        },
        {
          text: "No",
          onPress: () => {},
        },
      ]);
    }
  };

  const onPressSlot = async (userId, slotId) => {
    await parkingAreaService.updateSlotAvailability(userId, slotId, 0);
    // await userReservationService.reservaion(userId, slotId,)
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "row",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#0C1020",
      }}
    >
      <View style={{ flex: 5 }}>
        <View style={styles.Upcontainer}>
          {zoneA}

          {/* <TouchableOpacity onPress={onSlotClick}>
            <ParkingSlot slotId = {1} /> 
        </TouchableOpacity>
            <ParkingSlot slotId = {2}/>
            <ParkingSlot slotId = {3} isAvailable = 'false'/> */}
        </View>

        <View style={styles.Downcontainer}>
          {/* <ParkingSlot slotId = {6}/>
            <ParkingSlot slotId = {5} isAvailable = 'false'/>
            <ParkingSlot slotId = {4}/> */}
          {zoneC}
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 5 }}>
        <View style={styles.Upcontainer}>
          {/* <ParkingSlot slotId = {12} isAvailable = 'false' />
        <ParkingSlot slotId = {11}/>
        <ParkingSlot slotId = {10}/> */}
          {zoneB}
        </View>

        <View style={styles.Downcontainer}>
          {/* <ParkingSlot slotId = {7} />
        <ParkingSlot slotId = {8} isAvailable = 'false' />
        <ParkingSlot slotId = {9} /> */}
          {zoneD}
        </View>
      </View>
    </SafeAreaView>
  );
}
const ParkingSlot = ({ slotId, isAvailable }) => (
  <View style={{ height: 100, borderColor: "#4D5366", borderWidth: 2 }}>
    <Text
      style={{
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        justifyContent: "center",
      }}
    >
      P{slotId}
    </Text>
    {!isAvailable ? (
      <Image 
        style={{
          objectFit: "contain",
          height: 100,
          width: "100%",
          transform: [{ rotate: "90deg" }], 
          position: "absolute",
        }}
        source={require("../../assets/car-top-view.png")}
      />
    ) : null}   
  </View>
);

const styles = StyleSheet.create({
  Upcontainer: {
    flex: 1,
  },
  Downcontainer: {
    flex: 1,
    flexDirection: "column-reverse",
  },
});

export default ParkingArea;
