import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionic from "react-native-vector-icons/Ionicons";

const { height, width } = Dimensions.get("window");

const Home = () => {
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
      <View
        style={{
          flex: 0.07,
          paddingHorizontal: width * 0.05,
          paddingVertical: height * 0.02,
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
            size={height * 0.055}
            name="person-circle-sharp"
            color="#050505"
          />
          <Ionic size={height * 0.03} name="search" color="#050505" />
        </View>
      </View>
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

export default Home;
