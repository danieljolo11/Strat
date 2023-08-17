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

import Ionicons from "react-native-vector-icons/Ionicons";
import SearchUser from "./screens/Logged/SearchUser/SearchUser";
interface loggedInComponent<T> {
  name: string;
  component: T;
  option: {
    headerShown: boolean;
  };
}

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

  const isLoggedIn = () => {
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
        {loggedScreen.map((item: any) => {
          const { name, component, option } = item;
          return (
            <Tab.Screen name={name} component={component} option={option} />
          );
        })}

        {/* <Tab.Screen
            key={1}
            name={"Home"}
            component={Home}
            option={{
              headerShown: false,
              tabBarIcon: () => {
                return <Ionic size={15} name="home" />;
              },
              tabBarLabel: () => {
                return "Home";
              }
            }}
          /> */}
        {/* {screens.map((results: any, index: number) => {
            const { name, component, option, key } = results;
            return (
              <Tab.Screen
                key={key}
                name={name}
                component={component}
                option={option}
              />
            );
          })} */}
      </Tab.Navigator>
    );
  };

  const getToken = async (): Promise<string> => {
    const token = await AsyncStorage.getItem("token");
    return token;
  };

  const isNotLoggedIn = () => {
    const token = getToken();

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

    return !token ? (
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
      {isNotLoggedIn()}
      {/* {isLoggedIn()} */}
      {isLoggedIn()}
    </React.Fragment>
  );
};

export default StackNavigator;
