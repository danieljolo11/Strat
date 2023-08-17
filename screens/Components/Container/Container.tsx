import React, { FC } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { height, width } = Dimensions.get("window");

interface bodyContainer {
  display: any;
  modal?: any;
}

const Container: FC<bodyContainer> = (props) => {
  const { display, modal } = props;

  const viewModalCondition = () => {
    if(modal) return modal();
    return null;
  }

  return (
    <GestureHandlerRootView  style={{ flex: 1, paddingVertical: hp("3%") }}>
      <View
        style={[StyleSheet.absoluteFillObject, { backgroundColor: "white" }]}
      />
      <View
        style={{
          paddingHorizontal: width * 0.05,
          paddingVertical: height * 0.02,
        }}
      >
        {display()}
      </View>
      {viewModalCondition()}
    </GestureHandlerRootView>
  );
};

export default Container;
