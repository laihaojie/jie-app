import { RouteProps } from "../typings/router";
import Home from "../views/HomeScreen/HomeScreen"
import DetailScreen from "../views/DetailScreen/DetailScreen"


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "src/views/LoginScreen/LoginScreen";



const Stack = createNativeStackNavigator();

export type MainStackParamList = {
  DetailScreen: never;
  LoginScreen: never;
}

export const routes = <RouteProps[]>[
  { name: "DetailScreen", component: DetailScreen },
  // { name: "LoginScreen", component: LoginScreen },

]

export const tabs = <RouteProps[]>[

]