import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";

function LiveStreamScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
      <WebView source={{ uri: Constants.expoConfig.raspberryApiUrl }} />
    </SafeAreaView>
  );
}

export default LiveStreamScreen;
