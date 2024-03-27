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
import footageService from "../../service/footage-service";
import { LinearGradient } from "expo-linear-gradient";
import ReactNativeBlobUtil from "react-native-blob-util";

function ReservationScreen({ navigation }) {
  const [data, setData] = useState([]);
  const getBookingDetails = async (userId) => {
    const reservations = await userReservationService.getBookingDetails(userId);
    setData(reservations);
  };
  const onLiveStream = () => {
    navigation.navigate("Live Stream");
  };

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
            <View
              style={{
                borderRadius: 8,
                paddingTop: 2,
                backgroundColor: "#005D85",
                marginVertical: 10,
              }}
            >
              <LinearGradient
                colors={["#004B6B", "#001C29", "#002738"]}
                style={[styles.card, styles.shadowProp]}
              >
                <View key={item.id}>
                  {item.active === 1 ? (
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.liveStreamBtn}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={onLiveStream}
                        >
                          <Text>Live Stream</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.statusBtn}>
                        <Text
                          style={[styles.item, styles.tag, styles.activeTag]}
                        >
                          Inprogress
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.statusBtn}>
                      <Text
                        style={[styles.item, styles.tag, styles.inActiveTag]}
                      >
                        Completed
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      backgroundColor: "rgba(0,0,0,0.2)",
                      borderRadius: 8,
                      marginBottom: 5,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.item}>Reservation Id:{item.id}</Text>
                      <Text style={styles.item}>Slot Id:{item.slotId}</Text>
                    </View>
                    <Text style={[styles.item, styles.reservedDate]}>
                      Date: {item.reservedDate}
                    </Text>
                  </View>

                  <FootageList
                    navigation={navigation}
                    reservationId={item.id}
                  ></FootageList>
                </View>
              </LinearGradient>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const FootageList = ({ navigation, reservationId }) => {
  const [footageFileName, setFileName] = useState([]);

  useEffect(() => {
    footageService.fileName(reservationId).then((fileNames) => {
      setFileName(fileNames);
    });
  }, []);
  return (
    <View>
      <FlatList
        data={footageFileName}
        renderItem={({ item }) => (
          <Footage navigation={navigation} item={item}></Footage>
        )}
      />
    </View>
  );
};

const Footage = ({ navigation, item }) => {
  const [downloadText, setDownloadText] = useState("Download");

  const onDownload = (fileName) => {
    ReactNativeBlobUtil.fs
      .exists(
        "/storage/emulated/0/Android/data/com.sajana_20.SPSystem/files/Download/SPS/" +
          fileName
      )
      .then((exists) => {
        if (exists) {
          console.log("File exists");
          navigation.navigate("Recordings", {
            url:
              "/storage/emulated/0/Android/data/com.sajana_20.SPSystem/files/Download/SPS/" +
              fileName,
          });
        } else {
          setDownloadText("Downloading");
          console.log("File does not exist");
          footageService.download(fileName).then((res) => {
            setDownloadText("Download");
            navigation.navigate("Recordings", { url: res.path() });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View key={item}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold", color: "white" }}>
          {item.fileName.split(".")[0]}
        </Text>
        <TouchableOpacity
          style={styles.downloadBtn}
          onPress={() => {
            onDownload(item.fileName);
          }}
        >
          <Text>{downloadText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: "#060E1B",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    fontWeight: "bold",
    marginRight: "auto",
    color: "white",
  },
  downloadBtn: {
    marginLeft: "auto",
    backgroundColor: "#2D81FF",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  card: {
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
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
    backgroundColor: "#FF9A0E",
  },
  inActiveTag: {
    backgroundColor: "#2E912D",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F3D627",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  statusBtn: {
    borderRadius: 8,
    alignItems: "center",
    padding: 10,
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },
  liveStreamBtn: {
    display: "block",
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "auto",
  },
  reservedDate: {
    marginBottom: 10,
  },
});

export default ReservationScreen;
