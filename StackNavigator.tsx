// @ts-nocheck
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Landing
import LandingPage from "./screens/Landing/LandingPage";
import Login from "./screens/Landing/Login";
import Register from "./screens/Landing/Register";

const StackNavigator = () => {
  const Stack = createStackNavigator();

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

  const isNotLoggedIn = () => {
    const screens: IsNotLoginInterface = [
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
      <>
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
      </>
    );
  };

  return <>{isNotLoggedIn()}</>;
};

export default StackNavigator;
