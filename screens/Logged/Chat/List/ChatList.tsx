import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w,
} from "react-native-responsive-screen";
import socket from "../../../GlobalApi/Socket";

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

interface chatListType {
  item: userListDetailsType;
  index: number;
  navigate: any;
}

const ChatList = (props: chatListType) => {
  const { item, index, navigate } = props || {};
  const { height, width } = Dimensions.get("window");
  const { roomDetails, messageData } = item || {};

  // Local State
  const [typingVisible, setTypingVisible] = useState<boolean>(false);

  useEffect(() => {
    joinRoomAction();
  }, []);

  const joinRoomAction = () => {
    const { roomDetails } = item || {};
    socket.emit("join-room", roomDetails[0]._id);
  };

  useEffect(() => {
    socketReceiveAction();
  }, [socket]);

  const socketReceiveAction = () => {
    const { roomDetails } = item || {};
    socket.on("typing-event", (item: { roomId: string }) => {
      console.log(`typing-event item:`, item);
      console.log("is room typing", roomDetails[0]._id === item.roomId);
      if (!typingVisible) {
        if (roomDetails[0]._id === item.roomId) setTypingVisible(true);

        setTimeout(() => {
          setTypingVisible(false);
        }, 2000);
      }
    });
  };

  const latestMessageDisplay = () => {
    const { messageDescription } = messageData[0] || {};
    const isChatHaveMessage = messageData.length > 0;
    return (
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
        {isChatHaveMessage ? messageDescription : null}
      </Text>
    );
  };

  const chatInformation = () => {
    const { updatedAt } = messageData[0] || {};
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          paddingRight: w("2%"),
        }}
      >
        <Text style={{ fontWeight: "500" }}>
          {moment(updatedAt).format("LT")}
        </Text>
      </View>
    );
  };

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
        source={require("../../../../assets/testimage2.png")}
      />
      <View
        style={{
          paddingLeft: width * 0.02,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: w("2%"),
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <View>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins600",
                    fontSize: height * 0.02,
                    color: "#050505",
                  }}
                >
                  {roomDetails[0]?.roomName ?? "Unknown"}
                </Text>
              </View>
              {typingVisible && (
                <View style={{ marginHorizontal: w("2%")}}>
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: w("10%"),
                      height: h("3%"),
                      borderRadius: 20,

                    }}
                    source={{
                      uri: "https://media.tenor.com/VinSlhZc6jIAAAAC/meme-typing.gif",
                    }}
                  />
                </View>
              )}
            </View>
          </View>
          {latestMessageDisplay()}
        </View>
        {chatInformation()}
      </View>
    </TouchableOpacity>
  );
};

export default ChatList;
