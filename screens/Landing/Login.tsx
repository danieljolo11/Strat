import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionic from "react-native-vector-icons/Ionicons";

const { height, width } = Dimensions.get("window");

export default function Login({ navigation }: NavigationParams) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[StyleSheet.absoluteFillObject, { backgroundColor: "white" }]}
      />
      <View style={{ paddingVertical: height * 0.02 }}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Ionic name="chevron-back" size={height * 0.035} color="#050505" />
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 0.3 }}>
        <Text style={styles.signintext}>Let's sign you in</Text>
        <Text style={styles.signindesc}>Welcome back!</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.textinputdisplay}
          placeholder="email or username"
          autoCapitalize="none"
          keyboardType="email-address"
          cursorColor="#474A56"
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={[styles.textinputdisplay, { width: "100%" }]}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
            cursorColor="#474A56"
          />
          <Ionic
            style={styles.iconDesign}
            color="#050505"
            size={height * 0.03}
            name="md-eye"
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: height * 0.02,
          }}
        >
          <Text style={styles.donthaveaccounttext}>
            Don't have an account?{" "}
            <Text style={styles.registertext}>Register</Text>
          </Text>
          <TouchableOpacity
            style={styles.btntxtdisplay}
            onPress={() => console.log("Login")}
          >
            <Text style={styles.btntext}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  signintext: {
    fontFamily: "Poppins600",
    fontSize: height * 0.04,
    lineHeight: height * 0.07,
    color: "#050505",
  },
  signindesc: {
    fontFamily: "Poppins",
    fontSize: height * 0.028,
    lineHeight: height * 0.04,
    color: "#050505",
  },
  textinputdisplay: {
    borderWidth: 1,
    height: height * 0.07,
    borderRadius: 14,
    paddingHorizontal: width * 0.04,
    fontFamily: "Poppins",
    fontSize: 14,
    lineHeight: 22,
    color: "#050505",
    marginVertical: height * 0.01,
    borderColor: "#050505",
    backgroundColor: "#F7F7F7"
  },
  donthaveaccounttext: {
    fontFamily: "Poppins",
    fontSize: 14,
    lineHeight: 22,
    color: "#050505",
    textAlign: "center",
    paddingBottom: height * 0.02,
  },
  registertext: {
    fontFamily: "Poppins500",
    fontSize: 14,
    lineHeight: 22,
    color: "#050505",
  },
  btntxtdisplay: {
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    borderRadius: 40,
    paddingVertical: height * 0.0175,
  },
  btntext: {
    fontFamily: "Poppins500",
    fontSize: 16,
    lineHeight: 26,
    color: "#050505",
  },
  iconDesign: {
    position: "absolute",
    right: width * 0.03,
    top: height * 0.027,
    elevation: 2,
  },
});
