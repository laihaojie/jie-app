import { RouteProps } from "../typings/router";
import Home from "../views/HomeScreen/HomeScreen"
import DetailScreen from "../views/DetailScreen/DetailScreen"


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "src/views/LoginScreen/LoginScreen";
import WithdrawalScreen from "src/views/WithdrawalScreen/WithdrawalScreen";
import MessageCenterScreen from "src/views/MessageCenterScreen/MessageCenterScreen";
import BillDetailScreen from "src/views/MessageCenterScreen/BillDetailScreen";
import ProductDetailScreen from "src/views/ProductScreen/ProductDetailScreen";


const Stack = createNativeStackNavigator();

export type MainStackParamList = {
  DetailScreen: never;
  LoginScreen: never;
  WithdrawalScreen: never;
  MessageCenterScreen: never;
  BillDetailScreen: never;
  ProductDetailScreen: never;
}

export const routes = <RouteProps[]>[
  {
    name: "DetailScreen",
    component: DetailScreen
  },
  {
    name: "LoginScreen",
    component: LoginScreen
  },
  {
    name: "WithdrawalScreen",
    component: WithdrawalScreen
  },
  {
    name: "MessageCenterScreen",
    component: MessageCenterScreen
  },
  {
    name: "BillDetailScreen",
    component: BillDetailScreen
  },
  {
    name: "ProductDetailScreen",
    component: ProductDetailScreen
  },
]

export const tabs = <RouteProps[]>[

]