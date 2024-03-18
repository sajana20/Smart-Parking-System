import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import userService from "../../service/user-service";

function RegisterScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignup = async (userName, email) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await userService.register(userName, email, password);
    //check the condition not sure
    console.log("response12");

    console.log(response);

    if (response !== null) {
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome To Smart Parking System </Text>
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
      <View>
        <TouchableOpacity
          style={styles.signupBtn}
          onPress={onSignup.bind(this, userName, email)}
        >
          <Text>SignUp</Text>
        </TouchableOpacity>
      </View>
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
  signupBtn: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#cc0000",
    justifyContent: "center",
    borderRadius: 6,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#0C1020",
  },
  signupContainer: {
    alignItems: "center",
  },
  forgot: {
    fontSize: 11,
  },
  title: {
    fontSize: 46,
    color: "white",
  },
});

export default RegisterScreen;
