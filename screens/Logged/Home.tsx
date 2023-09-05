import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionic from "react-native-vector-icons/Ionicons";
import Header from "../Components/Header/Header";
import Container from "../Components/Container/Container";
import { routesGetApiAuth, ResponseType } from "../../api/api_routes";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import socket from "../GlobalApi/Socket";

const { height, width } = Dimensions.get("window");

interface headerContainer {
  title: string;
}

interface userDetails {
  roomId: string;
  userType: "Admin" | "SuperAdmin";
}

interface roomDetails {
  _id: string;
  roomName: string;
  createdAt: string;
  updatedAt: string;
}

interface userListDetailsType {
  _id: userDetails;
  roomDetails: [roomDetails];
  count: number;
}

const Home = ({ navigation }: NavigationParams) => {
  const { navigate } = navigation;

  // Local State
  const [roomData, setRoomData] = useState<userListDetailsType[] | undefined>(
    []
  );

  const getRoomDataAction = async () => {
    await routesGetApiAuth("/room/chatRoom").then((res) => {
      const { data, status } = res || {};
      if (status === 200) return setRoomData(data);
    }).catch((err) => {
      console.log(`err:`, err)
    })
  };

  useFocusEffect(
    useCallback(() => {
      getRoomDataAction();
    }, [])
  );

  const searchHeader = () => {
    const propsContainer = {
      title: "Messages",
    } as headerContainer;

    return <Header {...propsContainer} />;
  };

  const body = () => {
    const messagesListDisplay = () => {
      const messageList = (item: userListDetailsType, index: number) => {
        const { roomDetails } = item;
        return (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: height * 0.013,
            }}
            key={index}
            onPress={() => navigate("chat", { ...item })}
          >
            <Image
              style={{
                height: height * 0.071,
                width: width * 0.15,
                borderRadius: 100,
              }}
              source={require("../../assets/testimage2.png")}
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
                    fontFamily: "Poppins600",
                    fontSize: height * 0.018,
                    color: "#050505",
                  }}
                >
                  {roomDetails[0]?.roomName}
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
                ></Text>
              </View>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text>3:05 PM</Text>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontSize: height * 0.0125,
                    borderRadius: 30,
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
          </TouchableOpacity>
        );
      };

      return (
        <FlatList
          data={roomData}
          renderItem={({ item, index }) => messageList(item, index)}
        />
      );
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
