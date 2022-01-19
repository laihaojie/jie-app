import { RouteProps } from "../typings/router";
import Home from "../views/HomeScreen/HomeScreen"
import DetailScreen from "../views/DetailScreen/DetailScreen"


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "src/views/LoginScreen/LoginScreen";
import TestScreen from "src/views/test";



const Stack = createNativeStackNavigator();

export type MainStackParamList = {
  DetailScreen: never;
  LoginScreen: never;
  TestScreen: never;
}

export const routes = <RouteProps[]>[
  { name: "DetailScreen", component: DetailScreen },
  { name: "TestScreen", component: TestScreen },
  // { name: "LoginScreen", component: LoginScreen },

]

export const tabs = <RouteProps[]>[

]