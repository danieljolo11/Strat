import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";

// components
import StackNavigator from "./StackNavigator";

export default function App() {
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
  }, []);

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
