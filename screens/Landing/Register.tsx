import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionic from "react-native-vector-icons/Ionicons";
import { routesPostApi } from "../../api/api_routes";

const { height, width } = Dimensions.get("window");

interface ParamsInterface {
  name?: string;
  email?: string;
  password?: string;
}

const Register = ({ navigation }: NavigationParams) => {
  const [formValues, setFormValues] = useState<ParamsInterface>({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const registerAction = async (): Promise<void> => {
    const params = {
      ...formValues,
    } as ParamsInterface;

    await routesPostApi("/user/register", params).then((response) => {
      if (response.status === 200) {
        return navigation.navigate("login");
      } else {
        alert("Fill up all required fields");
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[StyleSheet.absoluteFillObject, { backgroundColor: "white" }]}
      />
      <View style={{ paddingVertical: height * 0.02 }}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("landingpage")}
        >
          <Ionic name="chevron-back" size={height * 0.035} color="#050505" />
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 0.28 }}>
        <Text style={styles.signuptext}>Sign up</Text>
        <Text style={styles.signupdesc}>Join strat for better experience</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.textinputdisplay}
          placeholder="name"
          autoCapitalize="none"
          keyboardType="default"
          cursorColor="#474A56"
          value={formValues.name}
          onChangeText={(text) => setFormValues({ ...formValues, name: text })}
        />
        <TextInput
          style={styles.textinputdisplay}
          placeholder="email"
          autoCapitalize="none"
          keyboardType="email-address"
          cursorColor="#474A56"
          value={formValues.email}
          onChangeText={(text) => setFormValues({ ...formValues, email: text })}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={[styles.textinputdisplay, { width: "100%" }]}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={showPassword}
            cursorColor="#474A56"
            value={formValues.password}
            onChangeText={(text) =>
              setFormValues({ ...formValues, password: text })
            }
          />
          <Ionic
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconDesign}
            color="#050505"
            size={height * 0.03}
            name={showPassword ? "md-eye-off" : "md-eye"}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: height * 0.02,
          }}
        >
          <TouchableOpacity
            style={styles.btntxtdisplay}
            onPress={registerAction}
          >
            <Text style={styles.btntext}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  signuptext: {
    fontFamily: "Poppins600",
    fontSize: height * 0.04,
    lineHeight: height * 0.07,
    color: "#050505",
  },
  signupdesc: {
    fontFamily: "Poppins",
    fontSize: height * 0.0225,
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
    backgroundColor: "#F7F7F7",
  },
  iconDesign: {
    position: "absolute",
    right: width * 0.03,
    top: height * 0.027,
    elevation: 2,
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
});

export default Register;
