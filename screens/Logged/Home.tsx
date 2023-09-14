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
import Header from "../Components/Header/Header";
import Container from "../Components/Container/Container";
import { routesGetApiAuth, ResponseType } from "../../api/api_routes";
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w,
} from "react-native-responsive-screen";
import socket from "../GlobalApi/Socket";
import moment from "moment";
import ChatList from "./Chat/List/ChatList";
import ImageView from 'react-native-image-view';

const { height, width } = Dimensions.get("window");

interface headerContainer {
  title: string;
  navigate: any;
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
  messageData: any[];
}

const Home = ({ navigation }: NavigationParams) => {
  const { navigate } = navigation;

  // Local State
  const [roomData, setRoomData] = useState<userListDetailsType[] | undefined>(
    []
  );

  const getRoomDataAction = async () => {
    await routesGetApiAuth("/room/chatRoom")
      .then((res) => {
        const { data, status } = res || {};
        if (status === 200) return setRoomData(data);
      })
      .catch((err) => {
        console.log(`err:`, err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      getRoomDataAction();
    }, [])
  );

  const searchHeader = () => {
    const propsContainer = {
      title: "Messages",
      navigate,
    } as headerContainer;

    return <Header {...propsContainer} />;
  };

  const body = () => {
    const messagesListDisplay = () => {
      return (
        <FlatList
          data={roomData}
          renderItem={(item) => <ChatList {...item} navigate={navigate} />}
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
