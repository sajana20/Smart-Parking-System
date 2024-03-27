import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import userService from "../../service/user-service";
import { LinearGradient } from "expo-linear-gradient";

function RegisterScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignup = async (userName, email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      } else {
        const response = await userService.register(userName, email, password);

        if (response !== null) {
          navigation.navigate("Login");
        }
      }
    } else {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
  };

  const onLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#004B6B", "#001C29", "#002738"]}
        style={[styles.card, styles.shadowProp, styles.container]}
      >
        <View>
          <Text style={styles.title}>Register to ParkShield </Text>
        </View>
        <View style={styles.signupContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setUserName}
            value={userName}
            placeholder="User Name"
            placeholderTextColor={"white"}
          />

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
          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor={"white"}
            keyboardType="numeric"
            secureTextEntry={true}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={onSignup.bind(this, userName, email)}
          >
            <Text>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    width: "100%",
    borderColor: "white",
    color: "white",
  },
  button: {
    padding: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#00B2FF",
    justifyContent: "center",
    borderRadius: 6,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingTop: 100,

    padding: 30,
  },
  signupContainer: {
    alignItems: "center",
    paddingTop: 70,
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

export default RegisterScreen;
