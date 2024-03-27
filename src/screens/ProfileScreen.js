import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import sessionStorageService from "../../service/session-storage-service";

function ProfileScreen({ navigation }) {
  const onLogout = () => {
    sessionStorageService.remove("user_id");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#060E1B" }}>
      <LinearGradient
        colors={["#004B6B", "#001C29", "#002738"]}
        style={[styles.card, styles.shadowProp, styles.container]}
      >
        <View>
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.logoutBtn}>Logout</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#0C1020",
  },

  textContainer: {
    color: "white",
  },
  logoutBtn: {
    padding: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#00B2FF",
    justifyContent: "center",
    borderRadius: 6,
    marginBottom: 10,
  },
});

export default ProfileScreen;
