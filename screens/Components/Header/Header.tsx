import React, { FC } from "react";
import { View, Dimensions, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

// Icon
import Ionic from "react-native-vector-icons/Ionicons";

const { height } = Dimensions.get("window");

interface headerContainer {
  title: string;
}
const Header: FC<headerContainer> = (props) => {
  const { title } = props;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
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
  );
};

export default Header;
