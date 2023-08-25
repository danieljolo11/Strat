import React, { FC, useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Header/Header";

import { getUserAction } from "../../GlobalApi/GlobalApi";

const { height, width } = Dimensions.get("window");

// Icon
import Ionic from "react-native-vector-icons/Ionicons";
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w,
} from "react-native-responsive-screen";
import { Modalize } from "react-native-modalize";
import { routesPostApi, routesPostApiAuth } from "../../../api/api_routes";
import { AxiosResponse } from "axios";

interface userType {
  _id: string;
  createdAt: string;
  email: string;
  password: string;
  updatedAt: string;
}

interface headerContainer {
  title: string;
}

interface createRoomParameter {
  roomName: string;
  participants?: (string | undefined)[];
}

const SearchUser: FC = () => {
  const modalizeRef = useRef<Modalize>();
  const { userList } = getUserAction();
  const openModal = () => modalizeRef.current?.open();
  const closeModal = () => modalizeRef.current?.close();

  // Local State
  const [userContainer, setUserContainer] = useState<userType>();
  const [roomName, setRoomName] = useState<string>("");

  const createRoomAction = async (): Promise<void> => {
    const path: string = "/room/createroom";

    const participants = [];
    participants.push(userContainer?._id);

    const params: createRoomParameter = {
      roomName: roomName,
      participants: participants,
    };
    
    await routesPostApiAuth(path, params)
      .then((res: AxiosResponse<any, any> | { data: {}; status: any }) =>
        console.log("res", res)
      )
      .catch((err) => console.log("err", err));
  };

  const searchHeader = () => {
    const propsContainer = {
      title: "Search",
    } as headerContainer;

    return <Header {...propsContainer} />;
  };

  const searchBodyDisplay = () => {
    return (
      <View>
        {searchHeader()}
        {searchUserListDisplay()}
      </View>
    );
  };

  const searchUserListDisplay = () => {
    const userListDisplay = (props: { item: userType }) => {
      const { item } = props;
      return (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: height * 0.02,
          }}
          key={item._id}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionic
              size={height * 0.06}
              name="person-circle-sharp"
              color="#aeaeb2"
            />
            <View>
              <Text
                style={{
                  paddingLeft: w("2%"),
                  fontFamily: "Poppins500",
                  fontSize: height * 0.019,
                  color: "#050505",
                }}
              >
                {item.email}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingLeft: width * 0.02,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
              }}
              onPress={() => {
                setUserContainer(item);
                return openModal();
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins600",
                    paddingRight: 5,
                  }}
                >
                  Add To Room
                </Text>
              </View>
              <View>
                <Ionic size={height * 0.02} name="person-add" color="#050505" />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    };

    return <FlatList data={userList} renderItem={userListDisplay} />;
  };

  const renderModal = () => {
    return (
      <Modalize
        ref={modalizeRef}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        adjustToContentHeight={true}
        withHandle={false}
        modalStyle={{ borderTopRightRadius: 32, borderTopLeftRadius: 32 }}
      >
        <View style={{ padding: h("2%") }}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: h("2%"),
            }}
          >
            <View>
              <Text style={{ fontFamily: "Poppins600", fontSize: h("3%") }}>
                Create New Room
              </Text>
            </View>
            <View>
              <Text style={{ fontFamily: "Poppins500", fontSize: h("2%") }}>
                Have Conversation With
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Ionic
                  size={height * 0.03}
                  name="person-circle-sharp"
                  color="#aeaeb2"
                />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins600",
                    fontSize: h("2%"),
                    paddingLeft: w("2%"),
                  }}
                >
                  {userContainer?.email}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Enter Room Name"}
              onChangeText={(value) => setRoomName(value)}
              value={roomName}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.btntxtdisplay}
              onPress={createRoomAction}
            >
              <Text style={styles.btntext}>Create Room</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    );
  };

  return <Container display={searchBodyDisplay} modal={renderModal} />;
};

export default SearchUser;

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginVertical: h("2%"),
    borderWidth: 1,
    borderColor: "#aeaeb2",
    borderRadius: 10,
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
