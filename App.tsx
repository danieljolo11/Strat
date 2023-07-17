import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import AsyncStorage from "@react-native-async-storage/async-storage";

// components
import StackNavigator from "./StackNavigator";
import { tokenStore } from "./zustand/logintoken";
import { shallow } from "zustand/shallow";

export default function App() {
  // zustand
  const { storeTokenAction } = tokenStore((state) => state, shallow);

  const [fontsLoaded] = useFonts({
    Poppins: require("./assets/Fonts/Poppins-Regular.otf"),
    Poppins500: require("./assets/Fonts/Poppins-Medium.otf"),
    Poppins600: require("./assets/Fonts/Poppins-SemiBold.otf"),
    Poppins700: require("./assets/Fonts/Poppins-Bold.otf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    getToken();
  }, []);

  const getToken = async (): Promise<any> => {
    const storageToken = await AsyncStorage.getItem("token");
    storeTokenAction(storageToken ?? "");
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <RootSiblingParent>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </RootSiblingParent>
      </View>
    </SafeAreaProvider>
  );
}
