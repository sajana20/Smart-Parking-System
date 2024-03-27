import React from "react";
import { WebView } from "react-native-webview";
import { Text, StyleSheet, View } from "react-native";

export const showNavigation = () => {
  return `
    (function() {
      let navLookupInterval = setInterval(() => {
        let navigationBtn = document.querySelector('.poi-action-btn .btn-primary');
        if(navigationBtn) {
          navigationBtn.click();
          document.querySelector('img[src="https://maps.gstatic.com/mapfiles/transparent.png"]').click();
          document.querySelector('button[title="Close"]').click();
          clearInterval(navLookupInterval);
        }
      }, 1000);
      
    })();
  `;
};

function NavigationScreen({ route }) {
  let webview = null;
  const onRef = (ref) => {
    webview = ref;
  };

  return route.params && route.params.poi ? (
    <WebView
      injectedJavaScript={showNavigation()}
      javaScriptEnabled={true}
      geolocationEnabled={true}
      source={{
        uri:
          "http://anyplace.cs.ucy.ac.cy/viewer/?buid=building_5bb0eeb3-57a3-4919-851a-739ad0309db4_1710218746927&floor=0&selected=" +
          route.params.poi,
      }}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.messageContainer}>Please Select a Slot</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  messageContainer: {
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
    fontSize: 30,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
  },
});

export default NavigationScreen;
