import React, { FC, useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Container from "../../Components/Container/Container";
import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionic from "react-native-vector-icons/Ionicons";
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w,
} from "react-native-responsive-screen";
import { routesGetApiAuth, routesPostApiAuth } from "../../../api/api_routes";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import socket from "../../GlobalApi/Socket";
import authorization from "../../../services/auth_service";

const { height, width } = Dimensions.get("window");

interface sendMessageParams {
  message?: string;
  roomId: string;
}

type HttpResponse = AxiosResponse<any, any> | { data: {}; status: any };

interface Props extends NativeStackScreenProps<any, "chat"> {
  // other props ...
}

const Chat: FC<Props> = ({ route, navigation }) => {
  const { userData } = authorization();
  const { params } = route;
  const { _id, roomDetails } = params as any;
  const { roomId } = _id || {};

  const [writtenMessage, setWrittenMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<any[]>([]);

  useEffect(() => {
    socket.on("message", () => {
      getMessageRoomMessagesAction();
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("join-room", roomId);
    getMessageRoomMessagesAction();
  }, []);

  const getMessageRoomMessagesAction = async () => {
    await routesGetApiAuth(`/message/${roomId}`)
      .then((res) => {
        const { status, data } = res || {};
        if (status === 200) return setMessageList(data);
      })
      .catch((err) => {
        return console.log(`err:`, err);
      });
  };

  const sendMessageAction = async (): Promise<void | null> => {
    if (writtenMessage === "") return null;
    const params = {
      message: writtenMessage ?? "",
      roomId: roomId ?? "",
    } as sendMessageParams;

    await routesPostApiAuth("/message/sendmessage", params)
      .then((res) => {
        const { status } = res || {};
        if (status === 201) {
          setWrittenMessage("");
          getMessageRoomMessagesAction();
          return socket.emit("send-message", roomId);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const headerDisplay = () => {
    return (
      <View
        style={{
          flex: 1,
          // flexGrow: 1,
          flexBasis: "10%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Ionic size={height * 0.04} name="chatbubbles" color="#050505" />
        </View>
        <View>
          <Text
            style={{
              fontSize: h("2.5%"),
              fontFamily: "Poppins600",
              paddingTop: h(".7%"),
              paddingHorizontal: w("1%"),
            }}
          >
            {roomDetails[0].roomName ?? "New"} Room
          </Text>
        </View>
      </View>
    );
  };

  const bodyDisplay = () => {
    const chatListView = () => {
      const chatMessageDisplay = (item: any, index: any) => {
        const { messageDescription, userDetails } = item || {};
        // console.log(`item:`, item)
        const { email: userEmail } = userData || {};
        // console.log(`userEmail:`, userEmail)
        const { name, email } = userDetails[0] || {};
        console.log(`userDetails[0]:`, userDetails[0])
        // console.log(`email:`, email)

        return (
          <View
            style={[
              {
                alignItems: email === userEmail ? "flex-end" : "flex-start",
                paddingVertical: h("1%"),
              },
            ]}
          >
            <Text
              style={{
                borderRadius: 20,
                overflow: "hidden",
                paddingVertical: h("2%"),
                paddingHorizontal: w("3%"),
                backgroundColor: email === userEmail ? "#F3F4F6" : "#050505",
                color: email === userEmail ? "#050505" : "#FFF",
              }}
            >
              {messageDescription ?? null}
            </Text>
            <Text>{name ?? null}</Text>
          </View>
        );
      };

      return (
        <FlatList
          progressViewOffset={0}
          inverted={true}
          data={messageList}
          renderItem={({ item, index }) => chatMessageDisplay(item, index)}
        />
        // <FlatList
        //   inverted={true}
        //   data={messageList}
        //   renderItem={({ item, index }) => chatMessageDisplay(item, index)}
        // />
      );
    };
    return (
      <View
        style={{
          flex: 1,
          // flexGrow: 1,
          flexBasis: "80%",
          //   height: height * 0.84,
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        {chatListView()}
      </View>
    );
  };

  const footerDisplay = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          // flexGrow: 1,
          flexBasis: "10%",
          borderWidth: 1.5,
          borderColor: "#050505",
          borderRadius: 10,
        }}
      >
        <View>
          <TextInput
            style={styles.input}
            placeholder={"Send Message"}
            onChangeText={(value) => setWrittenMessage(value)}
            value={writtenMessage}
          />
        </View>

        <TouchableOpacity onPress={sendMessageAction}>
          <Ionic size={height * 0.04} name="chatbubbles" color="#050505" />
        </TouchableOpacity>
      </View>
    );
  };

  const chatBody = () => {
    return (
      <View>
        {headerDisplay()}
        {bodyDisplay()}
        {footerDisplay()}
      </View>
    );
  };

  return <Container display={chatBody} />;
};

export default Chat;

const styles = StyleSheet.create({
  input: {
    width: w("80%"),
    height: 50,
    marginVertical: h("2.2%"),
    padding: 10,
  },
  btntxtdisplay: {
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: height * 0.0175,
  },
  btntext: {
    fontFamily: "Poppins500",
    fontSize: 16,
    lineHeight: 26,
    color: "#050505",
  },
});
