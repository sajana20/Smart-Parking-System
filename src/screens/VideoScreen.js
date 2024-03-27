import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import Video from "react-native-video";

function VideoScreen({ route }) {
  let player;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#060E1B" }}>
      <Video
        source={{ uri: route.params.url }}
        ref={(ref) => {
          player = ref;
        }}
        onBuffer={this.onBuffer}
        onError={this.videoError}
        style={styles.backgroundVideo}
        controls={true}
        fullscreen={true}
        resizeMode={"contain"}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#0C1020",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoScreen;
