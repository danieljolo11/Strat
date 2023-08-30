// @ts-nocheck
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";

// Landing
import LandingPage from "./screens/Landing/LandingPage";
import Login from "./screens/Landing/Login";
import Register from "./screens/Landing/Register";
import Home from "./screens/Logged/Home";
import { io } from "socket.io-client";

import Ionicons from "react-native-vector-icons/Ionicons";
import SearchUser from "./screens/Logged/SearchUser/SearchUser";
import Chat from "./screens/Logged/Chat/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { getStorageValue } from "./api/global_script";
import { socket } from "./screens/GlobalApi/Socket";

interface loggedInComponent<T> {
  name: string;
  component: T;
  option: {
    headerShown: boolean;
  };
}

const StackNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const Tab = createBottomTabNavigator();

  const [authorized, setAuthorized] = useState<boolean>();

  useEffect(async () => {
    const authorized = await getToken();
    setAuthorized(!!authorized);
  }, []);

  const getToken = async (): Promise<any> => {
    const token = await getStorageValue("token");
    return token;
  };

  const isLoggedIn = () => {
    const TabNavigation = () => {
      const loggedScreen: any = [
        {
          name: "Home",
          component: Home,
          option: {
            tabBarIcon: () => {
              return <Ionicons size={5} name="home" color="#050505" />;
            },
          },
        },
        {
          name: "Search",
          component: SearchUser,
          option: {
            tabBarIcon: () => {
              return <Ionicons size={5} name="search" />;
            },
          },
        },
      ];

      return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          {loggedScreen.map((item: any) => (
            <Tab.Screen {...item} />
          ))}
        </Tab.Navigator>
      );
    };

    const StackNavigation = () => {
      const screens: any[] = [
        {
          name: "home",
          component: TabNavigation,
          option: { headerShown: false },
        },
        {
          name: "chat",
          component: Chat,
          option: { headerShown: false },
        },
      ];

      return (
        <NavigationContainer independent>
          <Stack.Navigator
            initialRouteName="home"
            screenOptions={{
              headerShown: false,
            }}
          >
            {screens.map((item) => (
              <Stack.Screen {...item} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      );
    };

    return <>{StackNavigation()}</>;
  };

  const isNotLoggedIn = (): any => {
    // for translate animation screen to screen
    const forTranslate = ({ current, next, layouts }: TranslateInterface) => ({
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -layouts.screen.width],
                })
              : 1,
          },
        ],
      },
    });

    const screens: IsNotLoginInterface[] = [
      {
        name: "landingpage",
        component: LandingPage,
        option: { headerShown: false },
      },
      {
        name: "login",
        component: Login,
        option: { headerShown: false, cardStyleInterpolator: forTranslate },
      },
      {
        name: "register",
        component: Register,
        option: { headerShown: false, cardStyleInterpolator: forTranslate },
      },
    ];

    return !authorized ? (
      <React.Fragment>
        <Stack.Navigator initialRouteName="landingpage">
          {screens.map(({ name, component, option }: IsNotLoginInterface) => (
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              options={option}
            />
          ))}
        </Stack.Navigator>
      </React.Fragment>
    ) : null;
  };

  return (
    <React.Fragment>
      {/* {isNotLoggedIn()} */}
      {isLoggedIn()}
    </React.Fragment>
  );
};

export default StackNavigator;
