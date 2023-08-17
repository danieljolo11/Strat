import React, { FC, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Header/Header";

import { getUserAction } from "../../GlobalApi/GlobalApi";

const { height, width } = Dimensions.get("window");

// Icon
import Ionic from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Modalize } from "react-native-modalize";

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

const SearchUser: FC = () => {
  const modalizeRef = useRef<Modalize>();
  const { userList } = getUserAction();

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
        <View
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
                  paddingLeft: widthPercentageToDP("2%"),
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
        </View>
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

      </Modalize>
    );
  };
  
  return <Container display={searchBodyDisplay} modal={renderModal} />;
};

export default SearchUser;
