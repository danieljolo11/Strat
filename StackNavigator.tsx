// @ts-nocheck
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";

// Landing
import LandingPage from "./screens/Landing/LandingPage";
import Login from "./screens/Landing/Login";
import Register from "./screens/Landing/Register";
import Home from "./screens/Logged/Home";

import Ionic from "react-native-vector-icons/Ionicons";

const StackNavigator = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

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

  const isLoggedIn = async (): Promise<any> => {
    // const token = await AsyncStorage.getItem("token");
    // console.log("token:", token)

    const screens: StackScreenInterface = [
      {
        name: "home",
        component: Home,
        option: {
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return <Ionic size={size} name="home" />;
          },
          tabBarLabel: () => {
            return null;
          },
        },
      },
      {
        name: "test",
        component: Home,
        option: {
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return <Ionic size={size} name="home" />;
          },
          tabBarLabel: () => {
            return null;
          },
        },
      },
      {
        name: "test2",
        component: Home,
        option: {
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return <Ionic size={size} name="home" />;
          },
          tabBarLabel: () => {
            return null;
          },
        },
      },
      {
        name: "test3",
        component: Home,
        option: {
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return <Ionic size={size} name="home" />;
          },
          tabBarLabel: () => {
            return null;
          },
        },
      },
    ];

    return (
      <>
        <Tab.Navigator initialRouteName="home">
          {screens.map(({ name, component, option }: StackScreenInterface) => (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={option}
            />
          ))}
        </Tab.Navigator>
      </>
    );
  };

  const isNotLoggedIn = () => {
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

    return (
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
    );
  };

  return <React.Fragment>{isNotLoggedIn()}</React.Fragment>;
};

export default StackNavigator;
