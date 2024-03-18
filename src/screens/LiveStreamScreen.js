import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

function LiveStreamScreen({ navigation }) {
  const onLiveStream = async (email, password) => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: "http://192.168.1.13:5000/" }} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#0C1020",
  },
});

export default LiveStreamScreen;
