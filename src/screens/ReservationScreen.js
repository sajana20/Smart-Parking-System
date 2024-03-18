import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import sessionStorageService from "../../service/session-storage-service";
import userReservationService from "../../service/user-reservation-service";

function ReservationScreen({ navigation }) {
  const [data, setData] = useState([]);
  const getBookingDetails = async (userId) => {
    console.log("useridddd`");
    console.log(userId);
    const reservations = await userReservationService.getBookingDetails(userId);

    setData(reservations);
    console.log(data);
  };
    const onLiveStream = () => {
        navigation.navigate("LiveStream");

    }

  useEffect(() => {
    sessionStorageService.get("user_id").then((userId) => {
      getBookingDetails(userId).then(() => {});
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={[styles.card, styles.shadowProp]} key={item.id}>
              {item.active === 1 ? (
                <Text>
                  <TouchableOpacity style={styles.button} onPress={onLiveStream}>
                    <Text>Live Stream</Text>
                  </TouchableOpacity>
                  <Text style={[styles.item, styles.tag, styles.activeTag]}>
                    Inprogress
                  </Text>
                </Text>
              ) : (
                <Text style={styles.activeBtn}>
                  <Text style={[styles.item, styles.tag, styles.inActiveTag]}>
                    Completed
                  </Text>
                </Text>
              )}

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.item}>Reservation Id:{item.id}</Text>
                <Text style={styles.item}>Slot Id:{item.slotId}</Text>
              </View>
              <Text style={styles.item}>{item.reservedDate}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// Screen styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  card: {
    backgroundColor: "#ACB3CF",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tag: {
    color: "white",
    borderRadius: 8,
  },
  activeTag: {
    backgroundColor: "green",
  },
  inActiveTag: {
    backgroundColor: "blue",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default ReservationScreen;
