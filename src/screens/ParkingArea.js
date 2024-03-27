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
import sessionStorageService from "../../service/session-storage-service";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";

function ParkingArea({ navigation, route }) {
  const [zoneA, setZoneA] = useState([]);
  const [zoneB, setZoneB] = useState([]);
  const [zoneC, setZoneC] = useState([]);
  const [zoneD, setZoneD] = useState([]);
  const getAvailability = async () => {
    const chunks = [];
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
              chunks[0][i].slotId,
              chunks[0][i].poi
            )}
            key={chunks[0][i].slotId}
          >
            <ParkingSlot
              slotId={chunks[0][i].slotId}
              isAvailable={chunks[0][i].availability}
              userId={chunks[0][i].userId}
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
              chunks[1][i].slotId,
              chunks[1][i].poi
            )}
            key={chunks[1][i].slotId}
          >
            <ParkingSlot
              slotId={chunks[1][i].slotId}
              isAvailable={chunks[1][i].availability}
              userId={chunks[1][i].userId}
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
              chunks[2][i].slotId,
              chunks[2][i].poi
            )}
            key={chunks[2][i].slotId}
          >
            <ParkingSlot
              slotId={chunks[2][i].slotId}
              isAvailable={chunks[2][i].availability}
              userId={chunks[2][i].userId}
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
              chunks[3][i].slotId,
              chunks[3][i].poi
            )}
            key={chunks[3][i].slotId}
          >
            <ParkingSlot
              slotId={chunks[3][i].slotId}
              isAvailable={chunks[3][i].availability}
              userId={chunks[3][i].userId}
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

  const startBackgroundTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status == "granted") {
      await Location.requestBackgroundPermissionsAsync();
    }
  };

  const clickSlot = (availability, userId, slotId, poi) => {
    sessionStorageService.get("user_id").then((user) => {
      if (availability === 0 && user.toString() === userId.toString()) {
        Alert.alert(
          "Cancel Reservation",
          "Do you want to cancel the reservation",
          [
            {
              text: "Yes",
              onPress: () => {
                parkingAreaService
                  .updateSlotAvailability(0, slotId, 1)
                  .then(() => {
                    getAvailability().then(() => {});
                  });
              },
            },
            {
              text: "No",
              onPress: () => {},
            },
          ]
        );
      } else if (availability === 0) {
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
              startBackgroundTracking().then(() => {});

              navigation.navigate("Navigation", { poi: poi });
            },
          },
          {
            text: "No",
            onPress: () => {},
          },
        ]);
      }
    });
  };

  const onPressSlot = async (userId, slotId) => {
    await parkingAreaService.updateSlotAvailability(userId, slotId, 0);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#004B6B", "#001C29", "#002738"]}
        style={[styles.card, styles.shadowProp, styles.container]}
      >
        <View style={{ flex: 5 }}>
          <View style={styles.Upcontainer}>{zoneA}</View>

          <View style={styles.Downcontainer}>{zoneC}</View>
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 5 }}>
          <View style={styles.Upcontainer}>{zoneB}</View>

          <View style={styles.Downcontainer}>{zoneD}</View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const ParkingSlot = ({ slotId, isAvailable, userId }) => {
  const [LoggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    sessionStorageService.get("user_id").then((uld) => {
      setLoggedUser(uld);
    });
  }, []);

  return (
    <View
      style={{
        height: 100,
        borderColor: "#CEFBFF",
        borderWidth: 2,
        backgroundColor:
          LoggedUser === userId && !isAvailable
            ? "rgba(0, 179, 255, 0.3)"
            : "#002738",
      }}
    >
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
};

const styles = StyleSheet.create({
  Upcontainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#0C1020",
  },
  Downcontainer: {
    flex: 1,
    flexDirection: "column-reverse",
  },
});

export default ParkingArea;
