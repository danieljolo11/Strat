import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { shallow } from "zustand/shallow";
import { tokenStore } from "../../zustand/logintoken";

import Ionic from "react-native-vector-icons/Ionicons";

const { height, width } = Dimensions.get("window");

const Home = () => {
  // zustand
  const { storeTokenAction } = tokenStore((state) => state, shallow);

  const [showSearch, setShowSearch] = useState<boolean>(false);

  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem("token");
    storeTokenAction("");
  };

  const friends = [
    {
      id: 1,
      image: require("../../assets/testimage2.png"),
      name: "Dolce Amore",
      desc: "Lorem Ipsum is lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 2,
      image: require("../../assets/testimage2.png"),
      name: "Dolce Amore",
      desc: "Lorem Ipsum is lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 3,
      image: require("../../assets/testimage2.png"),
      name: "Dolce Amore",
      desc: "Lorem Ipsum is lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 4,
      image: require("../../assets/testimage2.png"),
      name: "Dolce Amore",
      desc: "Lorem Ipsum is lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 5,
      image: require("../../assets/testimage2.png"),
      name: "Dolce Amore",
      desc: "Lorem Ipsum is lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 6,
      image: require("../../assets/testimage2.png"),
      name: "Dolce Amore",
      desc: "Lorem Ipsum is lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[StyleSheet.absoluteFillObject, { backgroundColor: "white" }]}
      />
      {!showSearch && (
        <View
          style={{
            height: height * 0.07,
            marginVertical: height * 0.015,
            paddingHorizontal: width * 0.05,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Ionic
              onPress={logout}
              size={height * 0.055}
              name="person-circle-sharp"
              color="#050505"
            />
            <Ionic
              onPress={() => setShowSearch(!showSearch)}
              size={height * 0.03}
              name="search"
              color="#050505"
            />
          </View>
        </View>
      )}

      {showSearch && (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={styles.serachinput}
              placeholder="Search..."
              autoCapitalize="none"
              cursorColor="#474A56"
              autoFocus={true}
            />
            <Ionic
              onPress={() => setShowSearch(false)}
              style={styles.iconDesign}
              size={height * 0.025}
              name="arrow-back-outline"
            />
          </View>
        </View>
      )}

      <View style={{ flex: 1, paddingHorizontal: width * 0.05 }}>
        {friends.map((item) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: height * 0.01,
            }}
            key={item.id}
          >
            <Image
              style={{
                height: height * 0.075,
                width: width * 0.15,
                borderRadius: 100,
              }}
              source={item.image}
            />
            <View
              style={{
                paddingLeft: width * 0.02,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    fontFamily: "Poppins500",
                    fontSize: height * 0.019,
                    color: "#050505",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    width: width * 0.62,
                    fontFamily: "Poppins",
                    fontSize: height * 0.015,
                    color: "#050505",
                  }}
                >
                  {item.desc}
                </Text>
              </View>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text>3:05 PM</Text>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontSize: height * 0.0125,
                    borderRadius: 100,
                    backgroundColor: "#050505",
                    paddingHorizontal: width * 0.02,
                    paddingVertical: height * 0.001,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  1
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  serachinput: {
    width: width,
    // borderWidth: 1,
    height: height * 0.07,
    paddingVertical: height * 0.015,
    paddingLeft: width * 0.15,
    paddingRight: width * 0.05,
    fontFamily: "Poppins",
    fontSize: 15,
    lineHeight: 27,
    color: "#050505",
    marginVertical: height * 0.015,
  },
  iconDesign: {
    position: "absolute",
    left: width * 0.05,
    top: height * 0.035,
    elevation: 2,
  },
});

export default Home;
