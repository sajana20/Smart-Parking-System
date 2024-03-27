import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import userService from "../../service/user-service";
import sessionStorageService from "../../service/session-storage-service";
import messaging from "@react-native-firebase/messaging";
import userTokenService from "../../service/user-token-service";
import { LinearGradient } from "expo-linear-gradient";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkUser().then(() => {});
  }, []);

  const checkUser = async () => {
    user = await sessionStorageService.get("user_id");

    if (user) navigation.navigate("MainContent", { userId: user });
  };

  const onLogin = async (email, password) => {
    validityState = await userService.login(email, password);
    navigation.navigate("MainContent", { userId: validityState.id });

    await sessionStorageService.save("user_id", validityState.id.toString());

    const token = await messaging().getToken();
    await userTokenService.sendToken(token);

    user = await sessionStorageService.get("user_id");
  };

  const onSignup = () => {
    navigation.navigate("RegisterScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#004B6B", "#001C29", "#002738"]}
        style={[styles.card, styles.shadowProp, styles.container]}
      >
        <View>
          <Text style={styles.title}>Welcome to ParkShield </Text>
        </View>
        <View style={styles.useNamePassContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor={"white"}
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor={"white"}
            keyboardType="numeric"
            secureTextEntry={true}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={styles.loginbtn}
            onPress={onLogin.bind(this, email, password)}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginbtn} onPress={onSignup}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              SignUp
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.forgot}
            onPress={onPressForgotPassword}
          >
            <Text style={{ color: "white" }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const onPressForgotPassword = () => {
  // Do forgot password operation
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    width: "100%",
    borderColor: "white",
    color: "white",
  },
  loginbtn: {
    padding: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#00B2FF",
    justifyContent: "center",
    borderRadius: 6,
    marginBottom: 10,
  },
  container: {
    paddingTop: 100,
    flex: 1,
    padding: 30,
  },
  useNamePassContainer: {
    paddingTop: 70,
    alignItems: "center",
  },
  forgot: {
    fontSize: 11,
  },
  title: {
    fontSize: 46,
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
});

export default LoginScreen;
