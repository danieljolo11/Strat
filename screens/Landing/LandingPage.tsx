import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

const LandingPage = ({ navigation }: NavigationParams) => {
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.container}>
      <View
        style={[StyleSheet.absoluteFillObject, { backgroundColor: "white" }]}
      />
      {/* Main Container */}
      <View style={styles.display}>
        {/* Header Container */}
        <View style={styles.headercontainer} />
        {/* Logo Container */}
        <View style={styles.logocontainer}>
          <Text>LOGO</Text>
        </View>
        {/* Title Container */}
        <View style={styles.titlecontainer}>
          <Text style={styles.titletext}>Strat</Text>
          <Text style={styles.titledesc}>
            A platform that connect you to your friends
          </Text>
        </View>
        {/* Button Container */}
        <View style={styles.btncontainer}>
          <View
            style={{ flexDirection: "column", paddingHorizontal: width * 0.05 }}
          >
            <TouchableOpacity
              style={[styles.btntxtdisplay, { marginBottom: height * 0.01 }]}
              onPress={() => navigation.navigate("login")}
            >
              <Text style={styles.btntext}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btntxtdisplay}
              onPress={() => navigation.navigate("register")}
            >
              <Text style={styles.btntext}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  display: {
    flex: 1,
  },
  headercontainer: {
    backgroundColor: "#050505",
    height: height * 0.4,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  logocontainer: {
    alignSelf: "center",
    flexDirection: "column",
    marginTop: height * -0.07,
    backgroundColor: "#F7F7F7",
    borderRadius: 200,
    padding: 40,
  },
  titlecontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titletext: {
    fontFamily: "Poppins500",
    fontSize: 46,
    lineHeight: 58,
    color: "#050505",
  },
  titledesc: {
    fontFamily: "Poppins",
    fontSize: 14,
    lineHeight: 22,
    color: "#050505",
  },
  btncontainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: height * 0.03,
  },
  btntxtdisplay: {
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    borderRadius: 40,
    paddingVertical: height * 0.0175,
  },
  btntext: {
    fontFamily: "Poppins500",
    fontSize: 16,
    lineHeight: 26,
    color: "#050505",
  },
});

export default LandingPage;
