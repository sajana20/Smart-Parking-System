import React from "react";
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";

function NavigationScreen({ navigation, route }) {
  return (
    //     <WebView

    //   originWhitelist={['*']}
    //   source={{ html: '<h1><center>Hello world</center></h1>' }}
    // />

    <WebView
      scalesPageToFit={true}
      bounces={false}
      javaScriptEnabled
      //   style={{ height: '100vh', width: '100%' }}
      source={{
        html: `
                  <!DOCTYPE html>
                  <html>
                    <head></head>
                    <body>
                      <div id="baseDiv" style="height: 100vh"><iframe width="100%" height="100%" frameborder="0" scrolling="yes" marginheight="0" marginwidth="0" src="https://anyplace.cs.ucy.ac.cy/viewer/?buid=building_5bb0eeb3-57a3-4919-851a-739ad0309db4_1710218746927&floor=0&selected=poi_066548c1-1bf3-4afc-9a33-c6ea4717fe2c"></iframe></div>
                    </body>
                  </html>
            `,
      }}
      automaticallyAdjustContentInsets={false}
    />

    // <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, backgroundColor: '#0C1020' }}>
    //     <Image  style={{height:'100%', width:'100%'}} source={require('../../assets/navigation.png')}/>
    // </SafeAreaView>
  );
}

export default NavigationScreen;
