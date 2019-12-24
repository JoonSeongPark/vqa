import React from "react";
import { Text, Platform } from "react-native";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import OpeningScreen from "../screens/OpeningScreen";
import HomeScreen from "../screens/HomeScreen";
import ResultScreen from "../screens/ResultScreen";

import {fromRight} from 'react-navigation-transitions'

import Colors from "../constants/Colors";

const VqaNaviator = createStackNavigator(
  {
    Opening: {
      screen: OpeningScreen
    },
    Home: {
      screen: HomeScreen
    },
    Result: {
      screen: ResultScreen
    }
  },
  {
    transitionConfig: () => fromRight(),
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        backgroundColor: Platform.OS === "android" ? Colors.mainColor : "white"
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.mainColor
    }
  }
);

export default createAppContainer(VqaNaviator);
