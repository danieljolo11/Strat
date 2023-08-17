import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import React, { Fragment } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionic from "react-native-vector-icons/Ionicons";
import Header from "../Components/Header/Header";
import Container from "../Components/Container/Container";

const { height, width } = Dimensions.get("window");

interface headerContainer {
  title: string;
}

const Home = ({ navigation }: NavigationParams) => {
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

  const searchHeader = () => {
    const propsContainer = {
      title: "Messages",
    } as headerContainer;

    return <Header {...propsContainer} />;
  };

  const body = () => {
    const messagesListDisplay = () => {
      const messageList = (props: any) => {
        const { item } = props;
        return (
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
        );
      };

      return <FlatList data={friends} renderItem={messageList} />;
    };
    return (
      <>
        {searchHeader()}
        {messagesListDisplay()}
      </>
    );
  };

  return <Container display={body} />;
};

export default Home;
