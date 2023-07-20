import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { shallow } from "zustand/shallow";
import { tokenStore } from "../../zustand/logintoken";
import { useFocusEffect } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Ionic from "react-native-vector-icons/Ionicons";
import { routesGetApi } from "../../api/api_routes";

const { height, width } = Dimensions.get("window");

interface FriendsInterface {
  email?: string;
  name?: string;
  _id?: string;
}

const Home = () => {
  // zustand
  const { clearToken } = tokenStore((state) => state, shallow);

  const [loading, setLoading] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [friends, setFriends] = useState<FriendsInterface[]>([]);
  const [allUsers, setAllUsers] = useState<FriendsInterface[]>([]);
  const [displayType, setDisplayType] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      getUserFriends();
      getAllUsers();
    }, [])
  );

  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem("token");
    clearToken();
  };

  const getUserFriends = async (): Promise<void> => {
    setLoading(true);
    await routesGetApi("/user")
      .then((response) => {
        if (response.status === 200) {
          setFriends(response.data.data);
        }
      })
      .finally(() => setLoading(false));
  };

  const getAllUsers = async (): Promise<void> => {
    await routesGetApi("/user").then((response) => {
      if (response.status === 200) {
        setAllUsers(response.data.data);
      }
    });
  };

  const renderFriendList = () => {
    return (
      displayType !== "search" && (
        <View style={{ flex: 1, paddingHorizontal: width * 0.05 }}>
          {friends.map((item) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: height * 0.01,
              }}
              key={item?._id}
            >
              <Image
                style={{
                  height: height * 0.075,
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
                      fontFamily: "Poppins500",
                      fontSize: height * 0.019,
                      color: "#050505",
                    }}
                  >
                    {item?.name}
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
                    {/* {desc} */}
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
          ))}
        </View>
      )
    );
  };

  const renderSearchList = () => {
    return (
      displayType === "search" && (
        <View
          style={{
            paddingHorizontal: wp("5%"),
            paddingVertical: hp("1%"),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allUsers}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingBottom: hp("1%"),
                  }}
                  key={item?._id}
                >
                  <Image
                    style={styles.userimage}
                    source={require("../../assets/testimage2.png")}
                  />
                  <Text style={styles.textname}>{item?.name}</Text>
                </View>
              );
            }}
          />
        </View>
      )
    );
  };

  const display = () => {
    return !loading ? (
      <View style={{ flex: 1 }}>
        {renderFriendList()}
        {renderSearchList()}
      </View>
    ) : (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[StyleSheet.absoluteFillObject, { backgroundColor: "white" }]}
      />
      {!showSearch && (
        <View
          style={{
            height: height * 0.07,
            marginVertical: height * 0.015,
            paddingHorizontal: width * 0.05,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Ionic
              onPress={logout}
              size={height * 0.055}
              name="person-circle-sharp"
              color="#050505"
            />
            <Ionic
              onPress={() => {
                setDisplayType("search");
                setShowSearch(!showSearch);
              }}
              size={height * 0.03}
              name="search"
              color="#050505"
            />
          </View>
        </View>
      )}

      {showSearch && (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={styles.serachinput}
              placeholder="Search..."
              autoCapitalize="none"
              cursorColor="#474A56"
              autoFocus={true}
            />
            <Ionic
              onPress={() => {
                setDisplayType("");
                setShowSearch(false);
              }}
              style={styles.iconDesign}
              size={height * 0.025}
              name="arrow-back-outline"
            />
          </View>
        </View>
      )}

      {display()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  serachinput: {
    width: width,
    height: height * 0.07,
    paddingVertical: height * 0.015,
    paddingLeft: width * 0.15,
    paddingRight: width * 0.05,
    fontFamily: "Poppins",
    fontSize: 15,
    lineHeight: 27,
    color: "#050505",
    marginVertical: height * 0.015,
  },
  iconDesign: {
    position: "absolute",
    left: width * 0.05,
    top: height * 0.035,
    elevation: 2,
  },
  textname: {
    fontFamily: "Poppins500",
    fontSize: hp("1.8%"),
    lineHeight: hp("2.7%"),
    color: "#050505",
    paddingLeft: wp("2.5%"),
  },
  userimage: {
    height: hp("5%"),
    width: wp("10%"),
    borderRadius: 100,
  },
});

export default Home;
