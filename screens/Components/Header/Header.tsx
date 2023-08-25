import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC } from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as SecureStore from "expo-secure-store";

// Icon
import Ionic from "react-native-vector-icons/Ionicons";

const { height } = Dimensions.get("window");

interface headerContainer {
  title: string;
}
const Header: FC<headerContainer> = (props) => {
  const { title } = props;

  const logoutAction = async (): Promise<void> => {
    try {
      return await SecureStore.deleteItemAsync("token", {});
    } catch (e) {
      return console.log("AsyncStorage Error", e);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <View>
          <Ionic
            size={height * 0.04}
            name="person-circle-sharp"
            color="#050505"
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: hp("3%"),
              fontFamily: "Poppins600",
              paddingTop: hp(".7%"),
            }}
          >
            {title}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={logoutAction}>
          <Text
            style={{
              fontSize: hp("2%"),
              fontFamily: "Poppins600",
              paddingTop: hp(".7%"),
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
