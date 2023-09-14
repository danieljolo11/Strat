import React, { FC, useState } from "react";
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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionic from "react-native-vector-icons/Ionicons";
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w,
} from "react-native-responsive-screen";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

import socket from "../../GlobalApi/Socket";
import authorization from "../../../services/auth_service";
import { routesGetApiAuth, routesPostApiAuth } from "../../../api/api_routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveImageToCloud, pusherEvent } from "../../../api/global_script";
import ImageView from "react-native-image-view";

const { height, width } = Dimensions.get("window");

interface sendMessageParams {
  message?: string;
  roomId: string;
  imageUrl?: string;
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
  const [imageAction, setImageAction] = useState<boolean>(false);
  const [typingVisible, setTypingVisible] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [viewImage, setViewImage] = useState<boolean>(false);
  // const [imageViewDetails, setImageViewDetails] = useState<any>([]);

  useEffect(() => {
    socketReceiveAction();
  }, [socket]);

  useEffect(() => {
    getMessageRoomMessagesAction();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const socketReceiveAction = () => {
    socket.on("message", () => {
      getMessageRoomMessagesAction();
    });

    socket.on("typing-event", (item: { email: string; roomId: string }) => {
      if (!typingVisible) {
        const { email } = userData || {};
        if (email !== item.email) setTypingVisible(true);

        setTimeout(() => {
          setTypingVisible(false);
        }, 2000);
      }
    });
  };

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
    const params = {
      message: writtenMessage ?? "",
      roomId: roomId ?? "",
    } as sendMessageParams;

    const sendMessaceService = async (paramsValue: any) => {
      await routesPostApiAuth("/message/sendmessage", paramsValue)
        .then((res) => {
          const { status } = res || {};
          if (status === 201) {
            setImage("");
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

    if (image) {
      setImageAction(true);
      const { uri, base64 } = image || {};
      const uriArr = uri.split(".");
      const fileType = uriArr[uriArr.length - 1];
      const file = `data:${fileType};base64,${base64}`;

      await saveImageToCloud(file).then((result) => {
        if (result) {
          sendMessaceService({ ...params, imageUrl: result });
          return setImageAction(false);
        }
      });
    }

    return sendMessaceService(params);
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
        const { messageDescription, userDetails, imageUrl, createdAt } =
          item || {};

        const { email: userEmail } = userData || {};
        const { name, email } = userDetails[0] || {};

        return (
          <TouchableOpacity
            style={[
              {
                alignItems: email === userEmail ? "flex-end" : "flex-start",
                paddingVertical: h("1%"),
              },
            ]}
            onPress={() => {
              setImageViewDetails(imageUrl);
              return setViewImage(true);
            }}
          >
            {imageUrl && (
              <View>
                <Image
                  source={{ uri: imageUrl }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  }}
                />
              </View>
            )}
            {/* {imageUrl && (
              <ImageView
                isSwipeCloseEnabled
                onClose={() => setViewImage(false)}
                images={[
                  {
                    source: {
                      uri: imageViewDetails ?? "",
                    },
                    title: "Image",
                    width: 806,
                    height: 720,
                  },
                ]}
                imageIndex={0}
                isVisible={viewImage}
                renderFooter={(currentImage) => (
                  <View>
                    <Text>My footer</Text>
                  </View>
                )}
              />
            )} */}
            {messageDescription && (
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
            )}
            {/* <Text
              style={{
                fontSize: h("1.2%"),
                paddingVertical: h(".5%"),
                paddingHorizontal: w("2%"),
              }}
            >
              {createdAt ? moment(createdAt).format("LT") : null}
            </Text> */}
          </TouchableOpacity>
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
    const textInput = () => {
      return !image ? (
        <>
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Send Message"}
              onChangeText={onHandleMessageAction}
              value={writtenMessage}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={sendMessageAction}>
              <Ionic size={height * 0.04} name="chatbubbles" color="#050505" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingHorizontal: w("2%") }}
              onPress={pickImage}
            >
              <Ionic size={height * 0.04} name="images" color="#050505" />
            </TouchableOpacity>
          </View>
        </>
      ) : null;
    };

    const imageInput = () => {
      return image ? (
        <TouchableOpacity
          disabled={imageAction}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          onPress={sendMessageAction}
        >
          {imageAction && <ActivityIndicator size="small" color="black" />}

          {!imageAction && (
            <>
              <View>
                <Text style={{ fontWeight: "500", fontSize: h("2%") }}>
                  Send Image
                </Text>
              </View>
              <View>
                <Ionic
                  size={height * 0.04}
                  name="document-attach"
                  color="#050505"
                />
              </View>
            </>
          )}
        </TouchableOpacity>
      ) : null;
    };
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: w("1%"),
          borderWidth: 1.5,
          borderColor: "#050505",
          borderRadius: 10,
        }}
      >
        {textInput()}
        {imageInput()}
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

  const imageSelectedDisplay = () => {
    return (
      image && (
        <View
          style={{
            position: "relative",
            alignItems: "flex-end",
            paddingHorizontal: w("5%"),
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View>
            <Ionic
              size={height * 0.03}
              name="close-circle"
              color="#050505"
              style={{
                bottom: 155,
                left: -20,
                // right: 0,
                position: "absolute",
              }}
              onPress={() => setImage("")}
            />
          </View>
          <View>
            <Image
              source={{ uri: image?.uri }}
              style={{
                // top: 0,
                bottom: 10,
                left: -150,
                // right: 100,
                position: "absolute",
                width: 150,
                height: 150,
                borderRadius: 20,
              }}
            />
          </View>
        </View>
      )
    );
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
          {imageSelectedDisplay()}
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
    width: w("70%"),
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
