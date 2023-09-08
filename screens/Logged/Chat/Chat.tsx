import React, { FC, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
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
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

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
  const { userData } = authorization() as any;
  const { _id, roomDetails } = route?.params as any;
  const { roomId } = _id || {};

  const [writtenMessage, setWrittenMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<any[]>([]);
  const [typingVisible, setTypingVisible] = useState<boolean>(false);

  const socketReceiveAction = () => {
    socket.on("message", () => {
      getMessageRoomMessagesAction();
    });
    socket.on("typing-event", (item: any) => {
      if (!typingVisible) {
        const { email } = userData || {};
        if (email !== item) setTypingVisible(true);

        setTimeout(() => {
          setTypingVisible(false);
        }, 3000);
      }
    });
  };

  useEffect(() => {
    socketReceiveAction();
  }, [socket]);

  useEffect(() => {
    getMessageRoomMessagesAction();
  }, []);

  // const typingActionListener =

  const onHandleMessageAction = (value: string) => {
    const { email } = userData || {};
    socket.emit("typing-action-room", { roomId, email });
    return setWrittenMessage(value);
  };

  const getMessageRoomMessagesAction = async () => {
    socket.emit("join-room", roomId);

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
          setTypingVisible(false);
          return socket.emit("send-message", roomId);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const headerDisplay = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: w("10%") }}>
          <Ionic
            size={height * 0.03}
            name="chevron-back"
            color="#050505"
            onPress={() => navigation.navigate("home")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
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
      </View>
    );
  };

  const bodyDisplay = () => {
    const chatListView = () => {
      const chatMessageDisplay = (item: any, index: any) => {
        const { messageDescription, userDetails, createdAt } = item || {};
        const { email: userEmail } = userData || {};
        const { name, email } = userDetails[0] || {};

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
                borderRadius: 23,
                overflow: "hidden",
                paddingVertical: h("1.5%"),
                paddingHorizontal: w("5%"),
                backgroundColor: email === userEmail ? "#F3F4F6" : "#050505",
                color: email === userEmail ? "#050505" : "#FFF",
                fontWeight: 500,
              }}
            >
              {messageDescription ?? null}
            </Text>
            <Text
              style={{
                fontSize: h("1.2%"),
                paddingVertical: h(".5%"),
                paddingHorizontal: w("2%"),
              }}
            >
              {createdAt ? moment(createdAt).format("LT") : null}
            </Text>
          </View>
        );
      };

      return (
        <View>
          <FlatList
            inverted={true}
            data={messageList}
            renderItem={({ item, index }) => chatMessageDisplay(item, index)}
          />
        </View>
      );
    };

    return <View style={{ flex: 1 }}>{chatListView()}</View>;
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
            onChangeText={onHandleMessageAction}
            value={writtenMessage}
          />
        </View>

        <TouchableOpacity onPress={sendMessageAction}>
          <Ionic size={height * 0.04} name="chatbubbles" color="#050505" />
        </TouchableOpacity>
      </View>
    );
  };

  const typingActionDisplay = () => {
    return typingVisible ? (
      <View
        style={{
          padding: h("1%"),
          flexBasis: 75,
          flexGrow: 0,
        }}
      >
        <Image
          style={{
            resizeMode: "contain",
            width: w("30%"),
            height: h("6%"),
            borderRadius: 20,
          }}
          source={{
            uri: "https://media.tenor.com/VinSlhZc6jIAAAAC/meme-typing.gif",
          }}
        />
      </View>
    ) : null;
  };

  const chatBody = () => {
    const headerHeight = 5;
    const keyboardVerticalOffset = Platform.OS === "ios" ? headerHeight : 0;
    const behavior = Platform.OS === "ios" ? "padding" : "height";

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardVerticalOffset}
          behavior={behavior}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{ flexBasis: 50, flexGrow: 0, paddingHorizontal: w("3%") }}
          >
            {headerDisplay()}
          </View>
          <View style={{ flexGrow: 1, paddingHorizontal: w("3%") }}>
            {bodyDisplay()}
          </View>

          {typingActionDisplay()}

          <View
            style={{
              padding: h("1%"),
              flexBasis: 80,
              flexGrow: 0,
            }}
          >
            {footerDisplay()}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };

  return chatBody();
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
